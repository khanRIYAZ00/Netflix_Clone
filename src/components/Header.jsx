import React from "react";
import {
  Bell,
  ChevronDown,
  Clapperboard,
  Home,
  ListVideo,
  Menu,
  Search,
  Tv,
  X,
} from "lucide-react";

const navItems = [
  { name: "Home", icon: Home },
  { name: "TV Shows", icon: Tv },
  { name: "Movies", icon: Clapperboard },
  { name: "New & Popular", icon: Bell },
  { name: "My List", icon: ListVideo },
];

export default function Header({
  page,
  onNavigate,
  query,
  setQuery,
  menuOpen,
  setMenuOpen,
  onNotice,
}) {
  const searching = query.trim().length > 0;
  return (
    <header className="topbar">
      <div className="brandSide">
        <button
          className="iconButton mobileMenu"
          aria-label="Open menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Menu />
        </button>
        <button className="wordmark" onClick={() => onNavigate("Home")}>
          STREAM<span>FLIX</span>
        </button>
        <nav className={menuOpen ? "navLinks navOpen" : "navLinks"}>
          {navItems.map((item) => (
            <button
              key={item.name}
              className={
                page === item.name && !searching ? "navItem active" : "navItem"
              }
              onClick={() => onNavigate(item.name)}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="topActions">
        <div className={searching ? "searchBox searchExpanded" : "searchBox"}>
          <button
            className="iconButton"
            aria-label="Search"
            onClick={() => document.getElementById("title-search")?.focus()}
          >
            <Search size={20} />
          </button>
          <input
            id="title-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titles, people, genres"
          />
          {searching && (
            <button
              className="iconButton clearSearch"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          className="iconButton notification"
          aria-label="Notifications"
          onClick={() => onNotice("You’re all caught up")}
        >
          <Bell size={20} />
        </button>
        <button
          className="profileButton"
          aria-label="Profile"
          onClick={() => onNotice("Profile settings are a demo feature")}
        >
          R
        </button>
        <button
          className="iconButton"
          aria-label="Profile menu"
          onClick={() => onNotice("Profile settings are a demo feature")}
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}
