import React from "react";
import { Search } from "lucide-react";
import PosterCard from "../components/PosterCard.jsx";

export default function SearchPage({ query, results, loading, error, onOpen }) {
  return (
    <main className="searchPage">
      <div className="pageHeading">
        <div>
          <p className="kicker">DISCOVER</p>
          <h1>Search results for “{query}”</h1>
        </div>
      </div>
      {error ? (
        <div className="errorState">
          <h2>Search failed</h2>
          <p>{error}</p>
        </div>
      ) : loading ? (
        <div className="emptyState">
          <p>Searching TMDB…</p>
        </div>
      ) : results.length ? (
        <div className="posterGrid">
          {results.map((m) => (
            <PosterCard key={`${m.type}-${m.id}`} movie={m} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <div className="emptyState">
          <Search size={30} />
          <h2>No titles found</h2>
          <p>Try another title or genre.</p>
        </div>
      )}
    </main>
  );
}
