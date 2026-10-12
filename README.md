# StreamFlix React Project

A component-organized streaming UI demo powered by live movie and TV metadata from TMDB. There is no sample-data fallback: if the API token is missing or TMDB cannot be reached, the app displays an explicit error and a retry action.

## Requirements
- Node.js 18 or newer
- A TMDB API Read Access Token

## Setup
1. Copy `.env.example` to `.env`.
2. Set `VITE_TMDB_TOKEN` to your TMDB API Read Access Token.
3. Install dependencies and start Vite:

```bash
npm install
npm start
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Project structure

```text
public/
  favicon.svg
src/
  api.js
  App.jsx
  main.jsx
  styles.css
  components/
    DetailModal.jsx
    Footer.jsx
    Header.jsx
    Hero.jsx
    MovieRow.jsx
    PosterCard.jsx
  pages/
    InfoPage.jsx
    PlayerPage.jsx
    SearchPage.jsx
```

## API attribution
This product uses the TMDB API but is not endorsed or certified by TMDB. Full movie playback is not included; the player is a UI demo.
