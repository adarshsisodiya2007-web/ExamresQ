import { BackupTierConfig, ControlledResumeRecord, DisasterFallbackRecord } from '../types';

export const backupTiersData: BackupTierConfig[] = [
  {
    id: 'tier-1',
    name: 'Workstation Encrypted Sandbox',
    layer: 'Tier 1',
    storageTech: 'In-Memory State + Encrypted IndexedDB (WebCrypto AES-256-GCM)',
    syncLatency: '< 1 ms (Local Client Loopback)',
    redundancyLevel: 'Single Workstation Isolated',
    capacityUsed: '4.2 MB / 50 MB Cache Allocated',
    status: 'operational',
    encryption: 'Hardware AES-256 + WebCrypto SubtleCrypto',
    immutable: false,
    description: 'Autonomous zero-dependency client sandbox. If browser is refreshed or network drops, responses stay persisted and cryptographically hashed in candidate machine memory.'
  },
  {
    id: 'tier-2',
    name: 'Assessment Centre Edge Gateway',
    layer: 'Tier 2',
    storageTech: 'Local On-Premises Edge Appliance (Dual UPS + SQLite WAL Engine)',
    syncLatency: '4 - 8 ms (LAN Gigabit Ring)',
    redundancyLevel: 'RAID 10 Mirror + Hot Standby Node',
    capacityUsed: '1.8 GB / 64 GB Storage Pool',
    status: 'operational',
    encryption: 'TLS 1.3 mTLS + Hardware TPM 2.0 Sealed',
    immutable: false,
    description: 'On-premises hardware appliance running within test center. Buffers all lab workstations during broadband ISP failure, keeping examination operational offline without interruption.'
  },
  {
    id: 'tier-3',
    name: 'Regional Cloud Active-Active Mirror',
    layer: 'Tier 3',
    storageTech: 'Distributed Multi-Region Cluster (PostgreSQL Raft Replication)',
    syncLatency: '18 - 24 ms (Dedicated Fiber Uplink)',
    redundancyLevel: '3 Geo-Redundant Availability Zones',
    capacityUsed: '14.2 GB / 500 GB Provisioned',
    status: 'operational',
    encryption: 'AES-256 Envelope Encryption + AWS KMS / GCP Cloud KMS',
    immutable: true,
    description: 'High-availability central examination cluster with continuous real-time streaming replication. Instant zero-downtime automated failover across primary and secondary cloud zones.'
  },
  {
    id: 'tier-4',
    name: 'Cryptographic Cold Storage Vault',
    layer: 'Tier 4',
    storageTech: 'WORM (Write-Once-Read-Many) Object Vault + Merkle Tree Archive',
    syncLatency: 'Batch Sealed (Every 5 minutes)',
    redundancyLevel: 'Air-Gapped Immutable Optical & S3 Glacier Lock',
    capacityUsed: '84.6 GB (Sealed Ledger)',
    status: 'operational',
    encryption: 'Quantum-Resistant Dilithium Signatures + SHA-256 Merkle Seals',
    immutable: true,
    description: 'Legally binding and tamper-evident audit vault. Once answers are written, neither proctors nor system administrators can alter or erase a single candidate response.'
  }
];

export const sampleControlledResumeQueue: ControlledResumeRecord[] = [
  {
    candidateId: 'ET-2026-ENG-4418',
    candidateName: 'Adarsh Singh',
    rollNumber: 'ET-2026-4418',
    lastQuestionIndex: 14,
    lastSavedOption: 'Option A (Checked & Sealed)',
    interruptionDurationSeconds: 142,
    compensatoryTimeSeconds: 202, // 142s + 60s buffer
    proctorToken: 'PRC-AUTH-882194',
    proctorName: 'Dr. V. K. Raman (Chief Invigilator)',
    integrityVerified: true,
    status: 'pending'
  },
  {
    candidateId: 'ET-2026-MED-1092',
    candidateName: 'Priya Sharma',
    rollNumber: 'ET-2026-1092',
    lastQuestionIndex: 28,
    lastSavedOption: 'Option C',
    interruptionDurationSeconds: 65,
    compensatoryTimeSeconds: 125, // 65s + 60s buffer
    proctorToken: 'PRC-AUTH-771029',
    proctorName: 'Prof. Ananya Sen',
    integrityVerified: true,
    status: 'authorized'
  },
  {
    candidateId: 'ET-2026-CS-9931',
    candidateName: 'Rohit Verma',
    rollNumber: 'ET-2026-9931',
    lastQuestionIndex: 39,
    lastSavedOption: 'Option B',
    interruptionDurationSeconds: 310,
    compensatoryTimeSeconds: 370,
    proctorToken: 'PRC-AUTH-441092',
    proctorName: 'Dr. V. K. Raman (Chief Invigilator)',
    integrityVerified: true,
    status: 'resumed'
  }
];

export const sampleDisasterFallbackRecords: DisasterFallbackRecord[] = [
  {
    salvageId: 'SLV-2026-DL-001',
    candidateName: 'Kunal Deshmukh',
    rollNumber: 'ET-2026-ME-3012',
    affectedSubject: 'Engineering Mathematics III (Paper ENG-304)',
    reason: 'Catastrophic hardware bus fault on client motherboard + lab electrical breaker trip.',
    encryptedBlobHash: '0x9e88d447a11c8b32994f10a8b7c3d2e14589fc22a912bb87265aef41c1987ba4',
    rescheduledSlot: 'Within 48 Hours: Oct 02, 2026 - 10:00 AM (Slot 1, Lab 4B)',
    academicGuaranteeCertificateId: 'CERT-ZERO-PENALTY-ET-88291',
    notifiedAt: '2026-09-30 01:42 AM IST',
    status: 'certified'
  },
  {
    salvageId: 'SLV-2026-PB-002',
    candidateName: 'Meera Nambiar',
    rollNumber: 'ET-2026-EC-7714',
    affectedSubject: 'Digital Signal Processing (Paper ECE-402)',
    reason: 'Total building utility blackout exceeding Edge UPS battery endurance (35 minutes).',
    encryptedBlobHash: '0x33b8a14ff0189ce4599a0912cb84ef7110ad8231bc8947321eafbc7892113204',
    rescheduledSlot: 'Within 48 Hours: Oct 02, 2026 - 02:30 PM (Slot 2, Lab 1A)',
    academicGuaranteeCertificateId: 'CERT-ZERO-PENALTY-ET-88292',
    notifiedAt: '2026-09-30 01:50 AM IST',
    status: 'rebooked'
  }
];

export const periodicSaveHeartbeatHistory = [
  {
    packetSeq: '#HB-99841',
    timestamp: 'Just now (0.4s ago)',
    question: 'Q14: Linear Transformation & Matrix Eigenvalues',
    chosenOption: 'Option A',
    sha256Seal: '0x7f9a842b109e4d5881a4b9c1042ef3a9',
    encryptedBytes: '312 B',
    storageTarget: 'Local RAM + IndexedDB + Edge LAN + Cloud Mirror',
    verification: 'TAMPER_SEAL_VALID'
  },
  {
    packetSeq: '#HB-99840',
    timestamp: '4.8s ago',
    question: 'Q14: Linear Transformation & Matrix Eigenvalues',
    chosenOption: 'Option A',
    sha256Seal: '0x7f9a842b109e4d5881a4b9c1042ef3a9',
    encryptedBytes: '312 B',
    storageTarget: 'Local RAM + IndexedDB + Edge LAN + Cloud Mirror',
    verification: 'TAMPER_SEAL_VALID'
  },
  {
    packetSeq: '#HB-99839',
    timestamp: '9.8s ago',
    question: 'Q01: Laplace Transform Calculation',
    chosenOption: 'Option A',
    sha256Seal: '0x3e18a992bc104fa28912ef3841097cb1',
    encryptedBytes: '288 B',
    storageTarget: 'Local RAM + IndexedDB + Edge LAN + Cloud Mirror',
    verification: 'TAMPER_SEAL_VALID'
  },
  {
    packetSeq: '#HB-99838',
    timestamp: '14.8s ago',
    question: 'Q01: Laplace Transform Calculation',
    chosenOption: 'Option A',
    sha256Seal: '0x3e18a992bc104fa28912ef3841097cb1',
    encryptedBytes: '288 B',
    storageTarget: 'Local RAM + IndexedDB + Edge LAN + Cloud Mirror',
    verification: 'TAMPER_SEAL_VALID'
  }
];
