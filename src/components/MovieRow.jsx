import React from "react";
import PosterCard from "./PosterCard.jsx";

export default function MovieRow({ title, data, onOpen }) {
  if (!data?.length) return null;
  return (
    <section className="movieRow">
      <div className="rowHeading">
        <h2>{title}</h2>
        <span>
          Explore <b>›</b>
        </span>
      </div>
      <div className="rowScroller">
        {data.map((movie) => (
          <PosterCard
            key={`${movie.type}-${movie.id}`}
            movie={movie}
            onOpen={onOpen}
          />
        ))}
      </div>
    </section>
  );
}
