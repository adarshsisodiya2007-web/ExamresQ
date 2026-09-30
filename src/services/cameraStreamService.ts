/**
 * ExamresQ Unified Camera & Surveillance Stream Service
 * Enables persistent live video feed from the candidate workstation to the institutional officer monitor.
 */

type StreamListener = (stream: MediaStream | null) => void;

class CameraStreamService {
  private stream: MediaStream | null = null;
  private listeners: Set<StreamListener> = new Set();
  private isRequesting: boolean = false;
  private error: string | null = null;

  public getStream(): MediaStream | null {
    return this.stream && this.stream.active ? this.stream : null;
  }

  public subscribe(listener: StreamListener): () => void {
    this.listeners.add(listener);
    // Send immediate state
    listener(this.getStream());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public async startStream(): Promise<MediaStream | null> {
    if (this.stream && this.stream.active) {
      this.notifyListeners();
      return this.stream;
    }

    if (this.isRequesting) {
      return null;
    }

    this.isRequesting = true;
    this.error = null;

    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          },
          audio: false
        });

        this.stream = stream;
        this.notifyListeners();
        return stream;
      } else {
        this.error = 'Webcam API not supported in this environment.';
        return null;
      }
    } catch (err: any) {
      console.warn('Webcam stream error:', err);
      this.error = err.name === 'NotAllowedError' 
        ? 'Camera permission denied. Allow camera access in browser.' 
        : 'Webcam device unavailable or locked.';
      return null;
    } finally {
      this.isRequesting = false;
    }
  }

  public stopStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
      this.notifyListeners();
    }
  }

  public getLastError(): string | null {
    return this.error;
  }

  private notifyListeners(): void {
    const current = this.getStream();
    this.listeners.forEach(fn => fn(current));
  }
}

export const cameraStreamService = new CameraStreamService();
