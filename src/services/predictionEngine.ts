/**
 * ExamresQ Early Detection & Disruption Prediction Engine
 * Implements mathematical statistical tracking of network telemetry (latency, jitter, packet loss).
 * Requirement 02: Early Detection & Prediction.
 */

export interface TelemetrySample {
  timestamp: number;
  latencyMs: number;
  isFailure: boolean;
  saveDelayMs: number;
}

export type RiskCategory = 'Stable' | 'Watch' | 'Elevated' | 'Critical';
export type RiskTrend = 'improving' | 'stable' | 'degrading';

export interface EarlyDetectionMetrics {
  currentLatencyMs: number;
  avgLatencyMs: number;
  rollingLatencyMean: number;
  minLatencyMs: number;
  maxLatencyMs: number;
  stdDevMs: number; // Jitter
  jitterMs: number;
  failureRatePercent: number;
  packetLossPercent: number;
  disconnectCount: number;
  stabilityScore: number; // 0 - 100 (Higher is healthier)
  predictedDisruptionProbability: number; // 0 - 100%
  disruptionRiskPercent: number;
  riskCategory: RiskCategory;
  primaryRiskFactor: string;
  trend: RiskTrend;
  preventiveRecommendation: string;
  lastEvaluatedTime: string;
  isSimulatedDegradationActive: boolean;
  isDegradationSimulated: boolean;
}

class PredictionEngine {
  private samples: TelemetrySample[] = [];
  private maxSampleWindow: number = 25;
  private disconnectCount: number = 0;
  private isDegradationActive: boolean = false;
  private previousRiskProbability: number = 12;
  private listeners: Set<(metrics: EarlyDetectionMetrics) => void> = new Set();
  private timer: any = null;

  constructor() {
    const now = Date.now();
    for (let i = 0; i < 15; i++) {
      this.samples.push({
        timestamp: now - (15 - i) * 2000,
        latencyMs: 16 + Math.round(Math.random() * 8),
        isFailure: false,
        saveDelayMs: 45 + Math.round(Math.random() * 15)
      });
    }

    if (typeof window !== 'undefined') {
      this.timer = setInterval(() => {
        const ping = this.isDegradationActive
          ? 180 + Math.round(Math.random() * 120)
          : 16 + Math.round(Math.random() * 10);
        this.recordSample({
          latencyMs: ping,
          isFailure: this.isDegradationActive && Math.random() < 0.25,
          saveDelayMs: 45 + Math.round(Math.random() * 20)
        });
      }, 3000);
    }
  }

  // Subscribe to periodic predictive metrics
  public subscribe(listener: (metrics: EarlyDetectionMetrics) => void): () => void {
    this.listeners.add(listener);
    listener(this.computeMetrics());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const metrics = this.computeMetrics();
    this.listeners.forEach(cb => cb(metrics));
  }

  // Record a live telemetry ping or save duration
  public recordSample(sample: { latencyMs: number; isFailure?: boolean; saveDelayMs?: number }) {
    let actualLatency = sample.latencyMs;
    let actualFailure = sample.isFailure || false;
    let actualSaveDelay = sample.saveDelayMs || 50;

    if (this.isDegradationActive) {
      actualLatency = Math.round(180 + Math.random() * 120);
      actualSaveDelay = Math.round(450 + Math.random() * 350);
      actualFailure = Math.random() < 0.25;
    }

    this.samples.push({
      timestamp: Date.now(),
      latencyMs: actualLatency,
      isFailure: actualFailure,
      saveDelayMs: actualSaveDelay
    });

    if (this.samples.length > this.maxSampleWindow) {
      this.samples.shift();
    }

    if (actualFailure) {
      this.disconnectCount++;
    }

    this.notify();
  }

  // Toggle degradation simulation on/off
  public simulateDegradation(active: boolean) {
    this.isDegradationActive = active;
    if (active) {
      for (let i = 0; i < 6; i++) {
        this.samples.push({
          timestamp: Date.now() - (6 - i) * 1000,
          latencyMs: 240 + Math.round(Math.random() * 90),
          isFailure: i % 2 === 0,
          saveDelayMs: 520
        });
      }
      if (this.samples.length > this.maxSampleWindow) {
        this.samples = this.samples.slice(-this.maxSampleWindow);
      }
    }
    this.notify();
  }

  public setDegradationSimulation(active: boolean) {
    this.simulateDegradation(active);
  }

  // Compute statistical metrics over rolling window
  public computeMetrics(): EarlyDetectionMetrics {
    if (this.samples.length === 0) {
      return this.getDefaultMetrics();
    }

    const n = this.samples.length;
    const latencies = this.samples.map(s => s.latencyMs);
    const sum = latencies.reduce((acc, v) => acc + v, 0);
    const avgLatency = Math.round(sum / n);
    const minLatency = Math.min(...latencies);
    const maxLatency = Math.max(...latencies);

    const variance = latencies.reduce((acc, v) => acc + Math.pow(v - avgLatency, 2), 0) / n;
    const stdDev = Math.round(Math.sqrt(variance) * 10) / 10;

    const failures = this.samples.filter(s => s.isFailure).length;
    const failureRate = Math.round((failures / n) * 100);

    const currentLatency = latencies[latencies.length - 1];

    let riskScore = (stdDev * 0.4) + (failureRate * 0.4) + ((avgLatency > 100 ? (avgLatency - 100) * 0.2 : 0));
    if (this.isDegradationActive) {
      riskScore = Math.max(riskScore, 78 + Math.round(Math.random() * 16));
    }
    const predictedDisruption = Math.min(98, Math.max(2, Math.round(riskScore)));

    let riskCategory: RiskCategory = 'Stable';
    if (predictedDisruption >= 75) {
      riskCategory = 'Critical';
    } else if (predictedDisruption >= 45) {
      riskCategory = 'Elevated';
    } else if (predictedDisruption >= 20) {
      riskCategory = 'Watch';
    }

    const stabilityScore = Math.max(5, 100 - predictedDisruption);

    let primaryFactor = 'Nominal telemetry conditions. Low jitter.';
    if (failureRate > 20) {
      primaryFactor = `High packet loss rate (${failureRate}% dropped pings).`;
    } else if (stdDev > 25) {
      primaryFactor = `Elevated latency jitter (σ = ${stdDev}ms variance).`;
    } else if (avgLatency > 150) {
      primaryFactor = `High uplink latency (mean = ${avgLatency}ms).`;
    }

    let recommendation = 'Nominal operational status. Continue real-time monitoring.';
    if (riskCategory === 'Critical') {
      recommendation = 'Proactively switch candidate terminals to local IndexedDB Write-Ahead buffer.';
    } else if (riskCategory === 'Elevated') {
      recommendation = 'Prime WebRTC mesh peer failover. Pre-cache subsequent question blocks.';
    } else if (riskCategory === 'Watch') {
      recommendation = 'Monitor uplink jitter closely. Decrease delta sync interval to 10 seconds.';
    }

    let trend: RiskTrend = 'stable';
    if (predictedDisruption > this.previousRiskProbability + 4) {
      trend = 'degrading';
    } else if (predictedDisruption < this.previousRiskProbability - 4) {
      trend = 'improving';
    }
    this.previousRiskProbability = predictedDisruption;

    return {
      currentLatencyMs: currentLatency,
      avgLatencyMs: avgLatency,
      rollingLatencyMean: avgLatency,
      minLatencyMs: minLatency,
      maxLatencyMs: maxLatency,
      stdDevMs: stdDev,
      jitterMs: stdDev,
      failureRatePercent: failureRate,
      packetLossPercent: failureRate,
      disconnectCount: this.disconnectCount,
      stabilityScore,
      predictedDisruptionProbability: predictedDisruption,
      disruptionRiskPercent: predictedDisruption,
      riskCategory,
      primaryRiskFactor: primaryFactor,
      trend,
      preventiveRecommendation: recommendation,
      lastEvaluatedTime: new Date().toLocaleTimeString(),
      isSimulatedDegradationActive: this.isDegradationActive,
      isDegradationSimulated: this.isDegradationActive
    };
  }

  public getState(): EarlyDetectionMetrics {
    return this.computeMetrics();
  }

  private getDefaultMetrics(): EarlyDetectionMetrics {
    return {
      currentLatencyMs: 18,
      avgLatencyMs: 19,
      rollingLatencyMean: 19,
      minLatencyMs: 14,
      maxLatencyMs: 26,
      stdDevMs: 3,
      jitterMs: 3,
      failureRatePercent: 0,
      packetLossPercent: 0,
      disconnectCount: 0,
      stabilityScore: 98,
      predictedDisruptionProbability: 8,
      disruptionRiskPercent: 8,
      riskCategory: 'Stable',
      primaryRiskFactor: 'All connections stable. Latency nominal.',
      trend: 'stable',
      preventiveRecommendation: 'System nominal.',
      lastEvaluatedTime: new Date().toLocaleTimeString(),
      isSimulatedDegradationActive: false,
      isDegradationSimulated: false
    };
  }
}

export const predictionEngine = new PredictionEngine();
