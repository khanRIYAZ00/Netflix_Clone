import React from "react";
import { ArrowLeft, Play } from "lucide-react";

export default function PlayerPage({ movie, playing, setPlaying, onBack }) {
  return (
    <main className="playerPage">
      <button className="backButton" onClick={onBack}>
        <ArrowLeft size={17} /> Back to browsing
      </button>
      <div
        className="playerFrame"
        style={{
          backgroundImage: `linear-gradient(#0007,#000b),url(${movie?.backdrop || ""})`,
        }}
      >
        <button
          className="playerPlay"
          aria-label={playing ? "Pause demo playback" : "Start demo playback"}
          onClick={() => setPlaying((v) => !v)}
        >
          <Play fill="currentColor" size={28} />
        </button>
        <h2>
          {playing ? "Demo playback started" : movie?.title || "Preview player"}
        </h2>
        <p>
          {playing
            ? "This is a UI demonstration; no full movie stream is attached."
            : "Press play to preview the player interface."}
        </p>
      </div>
    </main>
  );
}
