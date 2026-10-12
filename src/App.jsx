import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { loadCatalog, searchCatalog } from "./api.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MovieRow from "./components/MovieRow.jsx";
import DetailModal from "./components/DetailModal.jsx";
import Footer from "./components/Footer.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import InfoPage from "./pages/InfoPage.jsx";
import PlayerPage from "./pages/PlayerPage.jsx";

const emptyCatalog = {
  Trending: [],
  Movies: [],
  "TV Shows": [],
  "Top Rated": [],
  "New Releases": [],
};

function readSavedList() {
  try {
    return JSON.parse(localStorage.getItem("streamflix-list") || "[]");
  } catch {
    return [];
  }
}

export default function App() {
  const [catalog, setCatalog] = useState(emptyCatalog);
  const [page, setPage] = useState("Home");
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [list, setList] = useState(readSavedList);
  const [menuOpen, setMenuOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [notice, setNotice] = useState("");
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [apiStatus, setApiStatus] = useState("loading");

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    setApiError("");
    setApiStatus("loading");
    try {
      const data = await loadCatalog();
      setCatalog(data);
      setApiStatus("ready");
    } catch (error) {
      setApiError(error?.message || "Unable to load movie data from TMDB.");
      setApiStatus("error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError("");
      setSearchLoading(false);
      return undefined;
    }
    let active = true;
    setSearchLoading(true);
    setSearchError("");
    const timer = setTimeout(async () => {
      try {
        const results = await searchCatalog(query.trim());
        if (active) setSearchResults(results);
      } catch (error) {
        if (active) {
          setSearchResults([]);
          setSearchError(error?.message || "TMDB search request failed.");
        }
      } finally {
        if (active) setSearchLoading(false);
      }
    }, 350);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const allTitles = useMemo(
    () =>
      Object.values(catalog)
        .flat()
        .filter(
          (movie, index, all) =>
            all.findIndex(
              (item) =>
                String(item.id) === String(movie.id) &&
                item.type === movie.type,
            ) === index,
        ),
    [catalog],
  );
  const featured =
    catalog.Trending?.find((movie) => movie.backdrop) ||
    catalog.Trending?.[0] ||
    null;
  const isSaved = (movie) =>
    list.some(
      (item) =>
        String(item.id) === String(movie.id) && item.type === movie.type,
    );

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const toggleList = (movie) => {
    const exists = isSaved(movie);
    const next = exists
      ? list.filter(
          (item) =>
            !(String(item.id) === String(movie.id) && item.type === movie.type),
        )
      : [...list, movie];
    setList(next);
    localStorage.setItem("streamflix-list", JSON.stringify(next));
    showNotice(exists ? "Removed from My List" : "Added to My List");
  };

  const go = (name) => {
    setPage(name);
    setQuery("");
    setSelected(null);
    setPlaying(false);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const playMovie = (movie) => {
    setSelected(movie);
    setPage("Player");
    setPlaying(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let pageRows = [];
  if (page === "Home")
    pageRows = [
      ["Trending Now", catalog.Trending],
      ["Popular Movies", catalog.Movies],
      ["Popular TV Shows", catalog["TV Shows"]],
      ["Top Rated", catalog["Top Rated"]],
    ];
  if (page === "Movies")
    pageRows = [
      ["Popular Movies", catalog.Movies],
      ["Top Rated Movies", catalog["Top Rated"]],
      ["New Releases", catalog["New Releases"]],
    ];
  if (page === "TV Shows")
    pageRows = [
      ["Popular TV Shows", catalog["TV Shows"]],
      ["Trending Now", catalog.Trending],
    ];
  if (page === "New & Popular")
    pageRows = [
      ["Trending This Week", catalog.Trending],
      ["New Releases", catalog["New Releases"]],
      ["Top Rated", catalog["Top Rated"]],
    ];
  if (page === "My List") pageRows = [["My List", list]];

  const showSearch = query.trim().length > 0;

  return (
    <div className="appShell">
      <Header
        page={page}
        onNavigate={go}
        query={query}
        setQuery={setQuery}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNotice={showNotice}
      />

      {showSearch ? (
        <SearchPage
          query={query}
          results={searchResults}
          loading={searchLoading}
          error={searchError}
          onOpen={setSelected}
        />
      ) : loading ? (
        <main className="apiState">
          <div className="loadingSpinner" />
          <h1>Loading StreamFlix</h1>
          <p>Fetching movie and TV information from TMDB…</p>
        </main>
      ) : apiError ? (
        <main className="apiState errorState">
          <AlertTriangle size={42} />
          <p className="kicker">CATALOG UNAVAILABLE</p>
          <h1>Unable to load titles</h1>
          <p>{apiError}</p>
          <p>
            Check your TMDB API Read Access Token in the <code>.env</code> file
            and verify your internet connection.
          </p>
          <button className="primaryButton" onClick={fetchCatalog}>
            <RefreshCw size={17} /> Retry connection
          </button>
        </main>
      ) : page === "Settings" || page === "Help" ? (
        <InfoPage
          page={page}
          apiStatus={apiStatus}
          onBack={() => go("Home")}
          onClearList={() => {
            localStorage.removeItem("streamflix-list");
            setList([]);
            showNotice("My List cleared");
          }}
        />
      ) : page === "Player" ? (
        <PlayerPage
          movie={selected || featured}
          playing={playing}
          setPlaying={setPlaying}
          onBack={() => go("Home")}
        />
      ) : (
        <>
          {page === "Home" && (
            <Hero
              movie={featured}
              onPlay={playMovie}
              onDetails={setSelected}
              muted={muted}
              onToggleMuted={() => setMuted((value) => !value)}
            />
          )}
          <main
            className={
              page === "Home" ? "catalog homeCatalog" : "catalog innerCatalog"
            }
          >
            {page !== "Home" && (
              <div className="pageHeading">
                <div>
                  <p className="kicker">BROWSE STREAMFLIX</p>
                  <h1>{page}</h1>
                </div>
                {page === "My List" && (
                  <span className="mutedText">
                    {list.length} saved {list.length === 1 ? "title" : "titles"}
                  </span>
                )}
              </div>
            )}
            {pageRows.map(([title, data]) => (
              <MovieRow
                key={title}
                title={title}
                data={data || []}
                onOpen={setSelected}
              />
            ))}
            {page === "My List" && !list.length && (
              <div className="emptyState">
                <h2>Your list is empty</h2>
                <p>Add titles using the + button in a title’s details.</p>
                <button className="primaryButton" onClick={() => go("Movies")}>
                  Browse Movies
                </button>
              </div>
            )}
            {pageRows.every(([, data]) => !data?.length) &&
              page !== "My List" && (
                <div className="emptyState">
                  <h2>No titles available</h2>
                  <p>TMDB returned no titles for this section.</p>
                </div>
              )}
          </main>
        </>
      )}

      <Footer onNavigate={go} onNotice={showNotice} />
      {selected && page !== "Player" && (
        <DetailModal
          movie={selected}
          isSaved={isSaved(selected)}
          onClose={() => setSelected(null)}
          onPlay={playMovie}
          onToggleList={toggleList}
        />
      )}
      {notice && (
        <div className="toast" role="status">
          {notice}
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
