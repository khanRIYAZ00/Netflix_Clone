import React from "react";
import { Info, Play, Volume2, VolumeX } from "lucide-react";

export default function Hero({
  movie,
  onPlay,
  onDetails,
  muted,
  onToggleMuted,
}) {
  if (!movie) return null;
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
    >
      <div className="heroShade" />
      <div className="heroContent">
        <p className="kicker">TRENDING THIS WEEK</p>
        <h1>{movie.title}</h1>
        <div className="heroMeta">
          <span>{movie.year || "—"}</span>
          <span className="ratingTag">13+</span>
          <span>★ {movie.rating}</span>
          <span>HD</span>
        </div>
        <p className="heroDescription">{movie.overview}</p>
        <div className="heroButtons">
          <button className="primaryButton" onClick={() => onPlay(movie)}>
            <Play fill="currentColor" size={19} /> Play
          </button>
          <button className="secondaryButton" onClick={() => onDetails(movie)}>
            <Info size={19} /> More Info
          </button>
        </div>
      </div>
      <button
        className="soundButton"
        aria-label="Toggle sound"
        onClick={onToggleMuted}
      >
        {muted ? <VolumeX /> : <Volume2 />}
      </button>
    </section>
  );
}
