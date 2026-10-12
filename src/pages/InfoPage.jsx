import React from "react";
import { ArrowLeft, CircleHelp, Info, Settings } from "lucide-react";

export default function InfoPage({ page, apiStatus, onBack, onClearList }) {
  return (
    <main className="simplePage">
      <button className="backButton" onClick={onBack}>
        <ArrowLeft size={17} /> Back to Home
      </button>
      <p className="kicker">NETFLIX</p>
      <h1>{page}</h1>
      {page === "Settings" ? (
        <>
          <div className="settingsCard">
            <Settings />
            <div>
              <h3>Playback & appearance</h3>
              <p>
                This project demo uses a dark streaming layout. Your My List is
                saved in this browser.
              </p>
            </div>
          </div>
          <div className="settingsCard">
            <Info />
            <div>
              <h3>Movie data</h3>
              <p>
                {apiStatus === "ready"
                  ? "Live movie and TV data is provided by TMDB."
                  : `TMDB connection status: ${apiStatus}.`}
              </p>
            </div>
          </div>
          <button className="subtleButton" onClick={onClearList}>
            Clear My List
          </button>
        </>
      ) : (
        <div className="settingsCard">
          <CircleHelp />
          <div>
            <h3>About this demo</h3>
            <p>
              Browse titles, search, open details, save to My List, and navigate
              between pages. The Play button opens a demo player; it does not
              stream full movies.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
