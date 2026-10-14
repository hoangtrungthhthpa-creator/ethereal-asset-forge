import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_KEY = "tien-lo-audio-enabled";
// Nhạc nền theo cảnh giới (chỉ số REALMS) và Đăng Tiên Đài.
// BASE_URL là "/" trên web và "./" trong bản itch.io để chạy được trong iframe.
const BASE = import.meta.env.BASE_URL || "/";
const asset = (name: string) => `${BASE}${name}`;
const REALM_TRACKS = [
  "1-luyen-khi.mp3", "2-truc-co.mp3", "3-kim-dan.mp3", "4-nguyen-anh.mp3",
  "5-hoa-than.mp3", "6-luyen-hu.mp3", "7-hop-the.mp3", "9-dai-thua.mp3", "8-do-kiep.mp3",
].map(asset);
export const ASCENSION_TRACK = asset("10-dang-tien-dai.mp3");
/** So khớp src tuyệt đối của thẻ audio với đường dẫn bài (kể cả dạng "./"). */
const sameTrack = (src: string, track: string) => src.endsWith(track.replace(/^\.?\//, "/"));
export function realmTrack(realm: number): string {
  return REALM_TRACKS[Math.max(0, Math.min(REALM_TRACKS.length - 1, realm))] ?? REALM_TRACKS[0]!;
}

export function backgroundTrack(state: { realm: number; ascended: boolean }): string {
  return state.ascended ? ASCENSION_TRACK : realmTrack(state.realm);
}

type SoundEffect = "breakthrough" | "alchemy" | "resource";

function playTone(
  context: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  volume: number,
  type: OscillatorType = "sine",
) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

export function useGameAudio(track: string = realmTrack(0)) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const bgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(AUDIO_KEY) !== "false");
    } catch {
      /* Trình duyệt chặn bộ nhớ cục bộ. */
    }
    setReady(true);
  }, []);

  const getContext = useCallback(() => {
    if (!contextRef.current) contextRef.current = new AudioContext();
    return contextRef.current;
  }, []);

  const getBgm = useCallback(() => {
    if (!bgmRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.2;
      audio.preload = "auto";
      audio.addEventListener("error", (event) => {
        // Thiếu file nhạc không được làm gián đoạn game.
        event.preventDefault();
      });
      bgmRef.current = audio;
    }
    return bgmRef.current;
  }, []);

  const trackRef = useRef(track);
  trackRef.current = track;

  const startMusic = useCallback(() => {
    const bgm = getBgm();
    if (!sameTrack(bgm.src, trackRef.current)) bgm.src = trackRef.current;
    void bgm.play().catch(() => {
      /* Trình duyệt chưa cho phát âm thanh, chờ thao tác tiếp theo. */
    });
  }, [getBgm]);

  const stopMusic = useCallback(() => {
    bgmRef.current?.pause();
  }, []);

  useEffect(() => {
    if (!ready || !enabled) {
      stopMusic();
      return;
    }
    const unlock = () => startMusic();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    startMusic();
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      stopMusic();
    };
  }, [enabled, ready, startMusic, stopMusic]);

  // Đổi bài khi cảnh giới / màn hình thay đổi, có fade nhẹ.
  useEffect(() => {
    const bgm = bgmRef.current;
    if (!bgm || sameTrack(bgm.src, track)) return;
    if (!enabled || bgm.paused) { bgm.src = track; return; }
    let v = bgm.volume;
    const id = window.setInterval(() => {
      v -= 0.04;
      if (v > 0) { bgm.volume = v; return; }
      window.clearInterval(id);
      bgm.src = track;
      bgm.volume = 0.2;
      void bgm.play().catch(() => {});
    }, 50);
    return () => { window.clearInterval(id); bgm.volume = 0.2; };
  }, [track, enabled]);

  // Mute everything while a platform ad plays, then restore.
  const adPausedRef = useRef(false);
  useEffect(() => {
    const onPause = () => {
      adPausedRef.current = true;
      bgmRef.current?.pause();
      void contextRef.current?.suspend().catch(() => {});
    };
    const onResume = () => {
      adPausedRef.current = false;
      void contextRef.current?.resume().catch(() => {});
      if (enabled) startMusic();
    };
    window.addEventListener("game-ad-pause", onPause);
    window.addEventListener("game-ad-resume", onResume);
    return () => {
      window.removeEventListener("game-ad-pause", onPause);
      window.removeEventListener("game-ad-resume", onResume);
    };
  }, [enabled, startMusic]);

  useEffect(() => {
    return () => {
      bgmRef.current?.pause();
      void contextRef.current?.close();
    };
  }, []);

  const toggle = useCallback(() => {
    setEnabled((current) => {
      const next = !current;
      try {
        localStorage.setItem(AUDIO_KEY, String(next));
      } catch {
        /* Trình duyệt chặn bộ nhớ cục bộ. */
      }
      if (next) startMusic();
      else stopMusic();
      return next;
    });
  }, [startMusic, stopMusic]);

  const playSfx = useCallback((effect: SoundEffect) => {
    if (!enabled) return;
    const context = getContext();
    if (context.state !== "running") return;
    const start = context.currentTime + 0.01;

    if (effect === "breakthrough") {
      [523.25, 659.25, 783.99, 1046.5].forEach((note, index) =>
        playTone(context, note, start + index * 0.09, 0.75, 0.06, "sine"),
      );
    } else if (effect === "alchemy") {
      playTone(context, 174.61, start, 0.3, 0.05, "triangle");
      playTone(context, 698.46, start + 0.16, 0.7, 0.055, "sine");
      playTone(context, 880, start + 0.25, 0.55, 0.035, "sine");
    } else {
      playTone(context, 659.25, start, 0.25, 0.045, "sine");
      playTone(context, 987.77, start + 0.1, 0.35, 0.04, "sine");
    }
  }, [enabled, getContext]);

  return { enabled, ready, toggle, playSfx };
}
