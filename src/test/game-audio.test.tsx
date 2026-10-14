import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { backgroundTrack, useGameAudio } from "@/hooks/useGameAudio";

describe("Realm BGM continuity", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers();
    localStorage.clear();
  });

  it("preserves playback through level breakthroughs and other events in the same realm", async () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    const audio = {
      src: "", currentTime: 0, paused: true, loop: false, volume: 0,
      preload: "", addEventListener: vi.fn(),
      play: vi.fn(async () => { audio.paused = false; }),
      pause: vi.fn(() => { audio.paused = true; }),
    };
    vi.stubGlobal("Audio", class { constructor() { return audio; } });
    const container = document.createElement("div");
    const root = createRoot(container);
    function Harness({ level, event }: { level: number; event: string | null }) {
      const state = { realm: 0, ascended: false, level, event };
      useGameAudio(backgroundTrack(state));
      return null;
    }
    try {
      await act(async () => root.render(<Harness level={1} event={null} />));
      expect(audio.src).toBe("/1-luyen-khi.mp3");
      expect(audio.loop).toBe(true);
      audio.currentTime = 123;
      audio.play.mockClear();
      audio.pause.mockClear();
      for (const event of ["breakthrough", null, "adventure", "alchemy"]) {
        await act(async () => root.render(<Harness level={2} event={event} />));
        expect(audio.src).toBe("/1-luyen-khi.mp3");
        expect(audio.currentTime).toBe(123);
        expect(audio.pause).not.toHaveBeenCalled();
        expect(audio.play).not.toHaveBeenCalled();
      }
    } finally {
      await act(async () => root.unmount());
    }
  });

  it("selects the next realm's track only on a realm change", () => {
    expect(backgroundTrack({ realm: 1, ascended: false })).toBe("/2-truc-co.mp3");
    expect(backgroundTrack({ realm: 7, ascended: false })).toBe("/9-dai-thua.mp3");
    expect(backgroundTrack({ realm: 8, ascended: false })).toBe("/8-do-kiep.mp3");
  });

  it("switches to the Ascension Terrace track on ascension", () => {
    expect(backgroundTrack({ realm: 8, ascended: true })).toBe("/10-dang-tien-dai.mp3");
  });
});