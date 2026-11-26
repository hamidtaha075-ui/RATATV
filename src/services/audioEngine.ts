import Hls from 'hls.js';

export type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

export interface AudioEngineCallbacks {
  onStatus: (s: PlaybackStatus) => void;
  onError: (msg: string) => void;
  onEnded: () => void;
}

export class AudioEngine {
  private video: HTMLVideoElement;
  private hls: Hls | null = null;
  private callbacks: AudioEngineCallbacks;
  private currentUrl: string | null = null;
  private retryCount = 0;
  private maxRetries = 3;
  private retryTimer: number | null = null;

  constructor(callbacks: AudioEngineCallbacks) {
    this.callbacks = callbacks;
    this.video = document.createElement('video');
    this.video.autoplay = true;
    this.video.playsInline = true;
    this.video.crossOrigin = 'anonymous';
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.video.style.background = '#000';
    this.video.addEventListener('playing', () => this.callbacks.onStatus('playing'));
    this.video.addEventListener('pause', () => { if (!this.video.ended) this.callbacks.onStatus('paused'); });
    this.video.addEventListener('waiting', () => this.callbacks.onStatus('loading'));
    this.video.addEventListener('error', () => this.handleError('Stream error'));
    this.video.addEventListener('ended', () => this.callbacks.onEnded());

    const container = document.createElement('div');
    container.id = 'ratatv-video-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.zIndex = '1000';
    container.style.background = '#000';
    container.style.display = 'none';
    container.appendChild(this.video);
    this.video.style.width = '100%';
    this.video.style.height = '100%';
    this.video.style.objectFit = 'contain';
    document.body.appendChild(container);
  }

  get element(): HTMLVideoElement { return this.video; }

  setVolume(v: number): void { this.video.volume = Math.max(0, Math.min(1, v)); }
  setMuted(m: boolean): void { this.video.muted = m; }

  async loadAndPlay(url: string): Promise<void> {
    const c = document.getElementById('ratatv-video-container');
    if (c) c.style.display = 'block';
    if (!url) { this.callbacks.onError('No stream URL'); this.callbacks.onStatus('error'); return; }
    this.stopInternal();
    this.currentUrl = url;
    this.retryCount = 0;
    this.callbacks.onStatus('loading');
    await this.tryPlay(url);
  }

  private async tryPlay(url: string): Promise<void> {
    try {
      if (url.toLowerCase().includes('.m3u8') && Hls.isSupported()) {
        this.hls = new Hls({ enableWorker: true });
        this.hls.loadSource(url);
        this.hls.attachMedia(this.video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.video.play().catch(() => this.handleError('Autoplay blocked'));
        });
        this.hls.on(Hls.Events.ERROR, (_e, data) => { if (data.fatal) this.handleError('HLS error'); });
      } else {
        this.video.src = url;
        this.video.load();
        await this.video.play();
      }
    } catch (e) {
      this.handleError((e as Error)?.message || 'Play failed');
    }
  }

  private handleError(msg: string): void {
    this.callbacks.onStatus('error');
    this.callbacks.onError(msg);
    if (this.retryCount < this.maxRetries && this.currentUrl) {
      this.retryCount += 1;
      const delay = 1000 * this.retryCount;
      if (this.retryTimer) window.clearTimeout(this.retryTimer);
      this.retryTimer = window.setTimeout(() => {
        if (this.currentUrl) { this.callbacks.onStatus('loading'); this.tryPlay(this.currentUrl).catch(() => {}); }
      }, delay);
    }
  }

  pause(): void { this.video.pause(); this.callbacks.onStatus('paused'); }
  resume(): void { this.video.play().catch(() => this.handleError('Resume failed')); }
  stop(): void { this.stopInternal(); this.currentUrl = null; const c = document.getElementById('ratatv-video-container'); if (c) c.style.display = 'none'; this.callbacks.onStatus('idle'); }
  private stopInternal(): void {
    if (this.retryTimer) { window.clearTimeout(this.retryTimer); this.retryTimer = null; }
    if (this.hls) { try { this.hls.destroy(); } catch {} this.hls = null; }
    try { this.video.pause(); this.video.removeAttribute('src'); this.video.load(); } catch {}
  }
  destroy(): void { this.stopInternal(); }
}
