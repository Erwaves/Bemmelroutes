const TERRAIN_COLORS = {
  forest: "var(--blaze-green)",
  heath: "var(--blaze-orange)",
  water: "var(--blaze-blue)",
  park: "var(--blaze-clay)",
};

// `routes` is defined in routes.js, loaded before this file.

function distanceBucket(km) {
  if (km < 6) return "short";
  if (km <= 11) return "medium";
  return "long";
}
function timeBucket(min) {
  if (min < 60) return "short";
  if (min <= 120) return "medium";
  return "long";
}
function elevationBucket(m) {
  if (m < 50) return "flat";
  if (m <= 150) return "rolling";
  return "hilly";
}
function formatTime(min) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
function terrainLabel(t) {
  return (
    { forest: "Bos", heath: "Heide", water: "Water", park: "Park" }[t] || t
  );
}

const state = { distance: "all", time: "all", elevation: "all", area: "all" };

// populate area select with the areas found in the route data
const areaSelect = document.getElementById("area-select");
[...new Set(routes.map((r) => r.area))].sort().forEach((area) => {
  const opt = document.createElement("option");
  opt.value = area;
  opt.textContent = area;
  areaSelect.appendChild(opt);
});

// every filter is a <select data-filter="...">, so one handler drives them all
document.querySelectorAll("select[data-filter]").forEach((sel) => {
  sel.addEventListener("change", (e) => {
    state[sel.dataset.filter] = e.target.value;
    render();
  });
});

// Shrink the sticky filter bar once the page is scrolled, so it takes up
// less space while browsing the route list (mainly matters on mobile).
const filterBar = document.querySelector(".filter-bar");
const COMPACT_THRESHOLD = 40;
let compactTicking = false;
function updateCompactState() {
  filterBar.classList.toggle("compact", window.scrollY > COMPACT_THRESHOLD);
  compactTicking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!compactTicking) {
      requestAnimationFrame(updateCompactState);
      compactTicking = true;
    }
  },
  { passive: true },
);

function render() {
  const grid = document.getElementById("route-grid");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("result-count");

  const filtered = routes.filter((r) => {
    if (
      state.distance !== "all" &&
      distanceBucket(r.distanceKm) !== state.distance
    )
      return false;
    if (state.time !== "all" && timeBucket(r.timeMin) !== state.time)
      return false;
    if (
      state.elevation !== "all" &&
      elevationBucket(r.elevationM) !== state.elevation
    )
      return false;
    if (state.area !== "all" && r.area !== state.area) return false;
    return true;
  });

  count.textContent = `${filtered.length} route${filtered.length !== 1 ? "s" : ""}`;
  grid.innerHTML = "";
  empty.style.display = filtered.length ? "none" : "block";

  filtered.forEach((r) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="thumb-wrap">
        <div class="blaze" style="background:${TERRAIN_COLORS[r.terrain]}"></div>
        <img src="${r.imgSeed}" alt="${r.title}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-top">
          <div class="area mono">${r.area} · ${terrainLabel(r.terrain)}</div>
          <h3>${r.title}</h3>
        </div>
        <div class="stats-row mono">
          <div><span class="k">Afstand</span>${r.distanceKm} km</div>
          <div><span class="k">Duur</span>${formatTime(r.timeMin)}</div>
          <div><span class="k">Hoogtemeters</span>${r.elevationM} m</div>
        </div>
        <div class="desc">${r.description}</div>
        <a class="go-btn" href="${r.mapUrl}" target="_blank" rel="noopener">Open route →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

render();
