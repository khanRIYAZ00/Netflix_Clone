import React from "react";
import { Play } from "lucide-react";

export default function PosterCard({ movie, onOpen }) {
  return (
    <button
      className="posterCard"
      onClick={() => onOpen(movie)}
      aria-label={`View ${movie.title} details`}
    >
      <img src={movie.poster} alt={movie.title} loading="lazy" />
      <div className="posterHover">
        <span className="posterPlay">
          <Play size={16} fill="currentColor" />
        </span>
        <strong>{movie.title}</strong>
        <small>
          {movie.year || "—"} · ★ {movie.rating}
        </small>
        <span className="cardHint">View details</span>
      </div>
    </button>
  );
}
