import React from "react";

export default function Footer({ onNavigate, onNotice }) {
  return (
    <footer>
      <div className="footerBrand">STREAMFLIX</div>
      <div className="footerLinks">
        <button onClick={() => onNavigate("Help")}>Help Center</button>
        <button onClick={() => onNavigate("Settings")}>Settings</button>
        <button onClick={() => onNotice("This is a student project demo")}>
          About
        </button>
      </div>
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </footer>
  );
}
