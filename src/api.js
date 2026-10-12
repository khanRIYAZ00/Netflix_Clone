const BASE = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.VITE_TMDB_TOKEN?.trim();
const IMAGE = 'https://image.tmdb.org/t/p/';
export const imageUrl = (path, size = 'w500') => path ? `${IMAGE}${size}${path}` : '';
export const normalize = (item, type) => ({
  id: item.id,
  type: type || item.media_type || 'movie',
  title: item.title || item.name || 'Untitled',
  year: (item.release_date || item.first_air_date || '').slice(0, 4),
  rating: Number(item.vote_average || 0).toFixed(1),
  poster: imageUrl(item.poster_path),
  backdrop: imageUrl(item.backdrop_path, 'original'),
  overview: item.overview || 'No description is available for this title.'
});
async function request(path) {
  if (!TOKEN) throw new Error('TMDB token not configured');
  const response = await fetch(`${BASE}${path}`, { headers: { Authorization: `Bearer ${TOKEN}`, accept: 'application/json' } });
  if (!response.ok) throw new Error(`TMDB API returned ${response.status}`);
  return response.json();
}
export async function loadCatalog() {
  const endpoints = [
    ['Trending', '/trending/all/week?language=en-US'],
    ['Movies', '/movie/popular?language=en-US&page=1'],
    ['TV Shows', '/tv/popular?language=en-US&page=1'],
    ['Top Rated', '/movie/top_rated?language=en-US&page=1'],
    ['New Releases', '/movie/now_playing?language=en-US&page=1']
  ];
  const values = await Promise.all(endpoints.map(async ([label, path]) => {
    const data = await request(path);
    return [label, (data.results || []).map(x => normalize(x, label === 'TV Shows' ? 'tv' : undefined)).filter(x => x.poster)];
  }));
  return Object.fromEntries(values);
}
export async function searchCatalog(query) {
  const data = await request(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  return (data.results || []).filter(x => x.media_type !== 'person').map(x => normalize(x)).filter(x => x.poster);
}
