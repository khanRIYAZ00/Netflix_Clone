import React from "react";
import { Check, Play, Plus, X } from "lucide-react";

export default function DetailModal({
  movie,
  isSaved,
  onClose,
  onPlay,
  onToggleList,
}) {
  if (!movie) return null;
  return (
    <div className="modalBackdrop" onClick={onClose}>
      <section
        className="detailModal"
        role="dialog"
        aria-modal="true"
        aria-label={`${movie.title} details`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="closeButton"
          aria-label="Close details"
          onClick={onClose}
        >
          <X />
        </button>
        {movie.backdrop && (
          <img
            className="detailBackdrop"
            src={movie.backdrop}
            alt={`${movie.title} backdrop`}
          />
        )}
        <div className="detailBody">
          <p className="kicker">{movie.type === "tv" ? "SERIES" : "MOVIE"}</p>
          <h2>{movie.title}</h2>
          <div className="heroMeta">
            <span>{movie.year || "—"}</span>
            <span className="ratingTag">13+</span>
            <span>★ {movie.rating}</span>
            <span>HD</span>
          </div>
          <p>{movie.overview}</p>
          <div className="detailActions">
            <button className="primaryButton" onClick={() => onPlay(movie)}>
              <Play fill="currentColor" size={18} /> Play
            </button>
            <button
              className="roundAction"
              aria-label={isSaved ? "Remove from My List" : "Add to My List"}
              onClick={() => onToggleList(movie)}
            >
              {isSaved ? <Check /> : <Plus />}
            </button>
            <span className="mutedText">
              {isSaved ? "In My List" : "Add to My List"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
