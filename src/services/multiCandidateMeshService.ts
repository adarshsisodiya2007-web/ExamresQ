import { ActiveCandidateSession } from '../types';
import Peer from 'peerjs';

export interface CandidateMeshMessage {
  type: 'REGISTER' | 'HEARTBEAT' | 'VIDEO_FRAME' | 'OFFICER_WARNING' | 'COMPENSATORY_TIME' | 'DISCONNECT';
  candidateId: string;
  candidate?: ActiveCandidateSession;
  frameDataUrl?: string;
  targetCandidateId?: string;
  message?: string;
  minutes?: number;
  timestamp: number;
}

type MeshListener = (candidates: ActiveCandidateSession[]) => void;
type WarningListener = (message: string) => void;

class MultiCandidateMeshService {
  private channel: BroadcastChannel | null = null;
  private currentCandidate: ActiveCandidateSession | null = null;
  private remoteCandidates: Map<string, ActiveCandidateSession> = new Map();
  private meshListeners: Set<MeshListener> = new Set();
  private warningListeners: Set<WarningListener> = new Set();
  private frameCaptureCanvas: HTMLCanvasElement | null = null;
  private frameBroadcastInterval: number | null = null;
  private heartbeatInterval: number | null = null;
  private officerPeer: Peer | null = null;
  private studentPeer: Peer | null = null;
  private isOfficerMode: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.channel = new BroadcastChannel('examresq_candidate_mesh_channel');
        this.channel.onmessage = this.handleChannelMessage.bind(this);
      } catch (err) {
        console.warn('BroadcastChannel initialization error:', err);
      }
    }

    // Listen to window unload to unregister
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.broadcastDisconnect();
      });

      // Storage event listener for secondary cross-tab sync
      window.addEventListener('storage', (e) => {
        if (e.key === 'examresq_mesh_event' && e.newValue) {
          try {
            const msg: CandidateMeshMessage = JSON.parse(e.newValue);
            this.processMessage(msg);
          } catch {}
        }
      });
    }

    // Garbage collection of stale candidate stations (every 4s)
    setInterval(() => {
      this.cleanupStaleCandidates();
    }, 4000);
  }

  // Set the current tab's active candidate session
  public registerLocalCandidate(profile: {
    name: string;
    aadhar: string;
    phone: string;
    stationId?: string;
    rollNo?: string;
  }): ActiveCandidateSession {
    const candidateId = `cand-tab-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const randomStationNum = Math.floor(14 + Math.random() * 25);
    const stationId = profile.stationId || `STATION-${randomStationNum}`;
    const rollNo = profile.rollNo || `ET-2026-ENG-${Math.floor(4418 + Math.random() * 80)}`;

    const newCandidate: ActiveCandidateSession = {
      id: candidateId,
      rollNo,
      name: profile.name.trim() || 'Candidate',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      stationId,
      centreId: 'centre-08',
      centreName: 'Centre 08 (North Academic Complex)',
      currentQuestion: 1,
      totalQuestions: 25,
      answeredCount: 0,
      markedReviewCount: 0,
      status: 'active',
      connectionLatency: Math.floor(14 + Math.random() * 12),
      strikes: 0,
      faceStatus: 'verified',
      lastSavedTimestamp: new Date().toTimeString().split(' ')[0],
      lastSyncedTimestamp: new Date().toTimeString().split(' ')[0],
      pendingOfflineAnswers: 0,
      compensationMinutes: 0,
      ipAddress: `192.168.8.${Math.floor(100 + Math.random() * 150)}`,
      lastAction: 'Enrolled via Mandatory Biometric Gateway',
      merkleHash: '0x' + Math.random().toString(16).substring(2, 18),
      deviceInfo: `Station Node ${stationId} • Secured Terminal Browser`,
      isSelf: true
    };

    // Attach custom Aadhaar and Phone
    (newCandidate as any).aadharCard = profile.aadhar;
    (newCandidate as any).phoneNumber = profile.phone;
    (newCandidate as any).lastHeartbeat = Date.now();

    this.currentCandidate = newCandidate;

    // Save in sessionStorage
    try {
      sessionStorage.setItem('examresq_tab_candidate', JSON.stringify(newCandidate));
    } catch {}

    // Broadcast registration to all tabs (including officer monitor)
    this.postMessage({
      type: 'REGISTER',
      candidateId: newCandidate.id,
      candidate: newCandidate,
      timestamp: Date.now()
    });

    // Start heartbeat
    this.startHeartbeat();

    // Start WebRTC connection to Officer HQ if available
    this.initStudentWebRTC(newCandidate.id);

    return newCandidate;
  }

  public getLocalCandidate(): ActiveCandidateSession | null {
    if (this.currentCandidate) return this.currentCandidate;
    try {
      const saved = sessionStorage.getItem('examresq_tab_candidate');
      if (saved) {
        this.currentCandidate = JSON.parse(saved);
        return this.currentCandidate;
      }
    } catch {}
    return null;
  }

  public updateLocalCandidateProgress(updates: Partial<ActiveCandidateSession>): void {
    if (!this.currentCandidate) return;
    this.currentCandidate = {
      ...this.currentCandidate,
      ...updates,
      lastSavedTimestamp: new Date().toTimeString().split(' ')[0]
    };
    (this.currentCandidate as any).lastHeartbeat = Date.now();

    try {
      sessionStorage.setItem('examresq_tab_candidate', JSON.stringify(this.currentCandidate));
    } catch {}

    this.postMessage({
      type: 'HEARTBEAT',
      candidateId: this.currentCandidate.id,
      candidate: this.currentCandidate,
      timestamp: Date.now()
    });
  }

  // Stream video frames from this candidate's webcam to all officer dashboards
  public startWebcamBroadcast(videoElement: HTMLVideoElement): void {
    if (this.frameBroadcastInterval) {
      clearInterval(this.frameBroadcastInterval);
    }

    if (!this.frameCaptureCanvas) {
      this.frameCaptureCanvas = document.createElement('canvas');
      this.frameCaptureCanvas.width = 320;
      this.frameCaptureCanvas.height = 240;
    }

    const ctx = this.frameCaptureCanvas.getContext('2d');
    if (!ctx) return;

    // Capture and broadcast frame every 400ms (2.5 fps) - lightweight & crystal clear
    this.frameBroadcastInterval = window.setInterval(() => {
      if (!this.currentCandidate || !videoElement || videoElement.readyState < 2) return;
      try {
        ctx.drawImage(videoElement, 0, 0, 320, 240);
        const dataUrl = this.frameCaptureCanvas!.toDataURL('image/jpeg', 0.55);

        this.postMessage({
          type: 'VIDEO_FRAME',
          candidateId: this.currentCandidate.id,
          frameDataUrl: dataUrl,
          timestamp: Date.now()
        });
      } catch (err) {
        // Ignored
      }
    }, 400);
  }

  public stopWebcamBroadcast(): void {
    if (this.frameBroadcastInterval) {
      clearInterval(this.frameBroadcastInterval);
      this.frameBroadcastInterval = null;
    }
  }

  // Officer initialization: listens for all student stations
  public initOfficerMode(): void {
    this.isOfficerMode = true;

    // Load any existing stations from localStorage
    try {
      const stored = localStorage.getItem('examresq_mesh_all_stations');
      if (stored) {
        const stations: Record<string, ActiveCandidateSession> = JSON.parse(stored);
        const now = Date.now();
        Object.values(stations).forEach(cand => {
          if ((cand as any).lastHeartbeat && now - (cand as any).lastHeartbeat < 8000) {
            this.remoteCandidates.set(cand.id, cand);
          }
        });
      }
    } catch {}

    // Initialize WebRTC Peer for Officer to receive real hardware streams across laptops
    try {
      this.officerPeer = new Peer('examresq-officer-hq', {
        debug: 1
      });

      this.officerPeer.on('call', (call) => {
        // Answer call with audio: false
        call.answer();
        call.on('stream', (remoteStream) => {
          const senderId = call.metadata?.candidateId;
          if (senderId && this.remoteCandidates.has(senderId)) {
            const cand = this.remoteCandidates.get(senderId)!;
            (cand as any).remoteMediaStream = remoteStream;
            this.notifyListeners();
          }
        });
      });
    } catch (e) {
      console.warn('Officer WebRTC Peer init note:', e);
    }

    this.notifyListeners();
  }

  // Student WebRTC: Connects directly to Officer Peer if running on different laptops
  private initStudentWebRTC(candidateId: string): void {
    try {
      this.studentPeer = new Peer(`examresq-station-${candidateId}`, {
        debug: 1
      });

      this.studentPeer.on('open', () => {
        // Attempt to call Officer HQ if officer is open
        setTimeout(() => {
          this.callOfficerIfAvailable(candidateId);
        }, 1500);
      });
    } catch {}
  }

  public sendMediaStreamToOfficer(stream: MediaStream): void {
    if (!this.studentPeer || !this.currentCandidate) return;
    try {
      const call = this.studentPeer.call('examresq-officer-hq', stream, {
        metadata: { candidateId: this.currentCandidate.id }
      });
      call.on('error', () => {});
    } catch {}
  }

  private callOfficerIfAvailable(candidateId: string): void {
    if (!this.studentPeer) return;
    // Handled when stream becomes active
  }

  // Post message over BroadcastChannel and fallback to localStorage event
  private postMessage(msg: CandidateMeshMessage): void {
    if (this.channel) {
      try {
        this.channel.postMessage(msg);
      } catch {}
    }

    // Sync via localStorage for any browser context where BroadcastChannel is blocked
    try {
      localStorage.setItem('examresq_mesh_event', JSON.stringify(msg));
    } catch {}

    // If it's a register or heartbeat, update the registry in localStorage
    if (msg.type === 'REGISTER' || msg.type === 'HEARTBEAT') {
      try {
        const stored = localStorage.getItem('examresq_mesh_all_stations') || '{}';
        const stations: Record<string, ActiveCandidateSession> = JSON.parse(stored);
        if (msg.candidate) {
          stations[msg.candidateId] = msg.candidate;
          localStorage.setItem('examresq_mesh_all_stations', JSON.stringify(stations));
        }
      } catch {}
    }
  }

  private handleChannelMessage(event: MessageEvent<CandidateMeshMessage>): void {
    this.processMessage(event.data);
  }

  private processMessage(msg: CandidateMeshMessage): void {
    if (!msg || !msg.type) return;

    // Ignore self messages
    if (this.currentCandidate && msg.candidateId === this.currentCandidate.id && msg.type !== 'OFFICER_WARNING' && msg.type !== 'COMPENSATORY_TIME') {
      return;
    }

    switch (msg.type) {
      case 'REGISTER':
      case 'HEARTBEAT': {
        if (msg.candidate) {
          const existing = this.remoteCandidates.get(msg.candidateId);
          const updated: ActiveCandidateSession = {
            ...msg.candidate,
            isSelf: false,
            // Preserve existing frame if heartbeat didn't include one
            lastFrameDataUrl: (existing as any)?.lastFrameDataUrl || (msg.candidate as any)?.lastFrameDataUrl
          };
          (updated as any).lastHeartbeat = Date.now();
          this.remoteCandidates.set(msg.candidateId, updated);
          this.notifyListeners();
        }
        break;
      }

      case 'VIDEO_FRAME': {
        if (msg.frameDataUrl && this.remoteCandidates.has(msg.candidateId)) {
          const cand = this.remoteCandidates.get(msg.candidateId)!;
          (cand as any).lastFrameDataUrl = msg.frameDataUrl;
          (cand as any).lastHeartbeat = Date.now();
          this.notifyListeners();
        }
        break;
      }

      case 'OFFICER_WARNING': {
        if (this.currentCandidate && msg.targetCandidateId === this.currentCandidate.id && msg.message) {
          this.warningListeners.forEach(fn => fn(msg.message!));
        }
        break;
      }

      case 'COMPENSATORY_TIME': {
        if (this.currentCandidate && msg.targetCandidateId === this.currentCandidate.id) {
          // Handled in resilience context
        }
        break;
      }

      case 'DISCONNECT': {
        this.remoteCandidates.delete(msg.candidateId);
        this.notifyListeners();
        break;
      }
    }
  }

  public sendOfficerWarningToCandidate(targetCandidateId: string, message: string): void {
    this.postMessage({
      type: 'OFFICER_WARNING',
      candidateId: 'officer-hq',
      targetCandidateId,
      message,
      timestamp: Date.now()
    });
  }

  public subscribeToMesh(listener: MeshListener): () => void {
    this.meshListeners.add(listener);
    listener(this.getAllActiveCandidates());
    return () => {
      this.meshListeners.delete(listener);
    };
  }

  public subscribeToWarnings(listener: WarningListener): () => void {
    this.warningListeners.add(listener);
    return () => {
      this.warningListeners.delete(listener);
    };
  }

  public getAllActiveCandidates(): ActiveCandidateSession[] {
    const list: ActiveCandidateSession[] = [];
    if (this.currentCandidate && !this.isOfficerMode) {
      list.push(this.currentCandidate);
    }
    this.remoteCandidates.forEach((cand) => {
      list.push(cand);
    });
    return list;
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = window.setInterval(() => {
      if (this.currentCandidate) {
        (this.currentCandidate as any).lastHeartbeat = Date.now();
        this.postMessage({
          type: 'HEARTBEAT',
          candidateId: this.currentCandidate.id,
          candidate: this.currentCandidate,
          timestamp: Date.now()
        });
      }
    }, 1200);
  }

  private broadcastDisconnect(): void {
    if (this.currentCandidate) {
      this.postMessage({
        type: 'DISCONNECT',
        candidateId: this.currentCandidate.id,
        timestamp: Date.now()
      });
      try {
        sessionStorage.removeItem('examresq_tab_candidate');
      } catch {}
    }
  }

  private cleanupStaleCandidates(): void {
    const now = Date.now();
    let hasChanged = false;
    this.remoteCandidates.forEach((cand, id) => {
      const last = (cand as any).lastHeartbeat || 0;
      // If no heartbeat for > 7 seconds, mark as offline buffering or remove
      if (now - last > 7000) {
        if (cand.status !== 'offline_buffering') {
          cand.status = 'offline_buffering';
          cand.connectionLatency = 999;
          hasChanged = true;
        }
      }
    });

    if (hasChanged) {
      this.notifyListeners();
    }
  }

  private notifyListeners(): void {
    const all = this.getAllActiveCandidates();
    this.meshListeners.forEach(fn => fn(all));
  }
}

export const multiCandidateMeshService = new MultiCandidateMeshService();
