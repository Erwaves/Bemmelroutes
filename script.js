const TERRAIN_COLORS = {
  forest: "var(--blaze-green)",
  heath: "var(--blaze-orange)",
  water: "var(--blaze-blue)",
  park: "var(--blaze-clay)",
};

function distanceBucket(km) {
  if (km < 6) return "short";
  if (km <= 11) return "medium";
  return "long";
}
function timeBucket(min) {
  if (min < 90) return "short";
  if (min <= 180) return "medium";
  return "long";
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
    { forest: "Forest", heath: "Heath", water: "Waterside", park: "Parkland" }[
      t
    ] || t
  );
}

const state = { distance: "all", time: "all", area: "all" };

// populate area select
const areaSelect = document.getElementById("area-select");
[...new Set(routes.map((r) => r.area))].sort().forEach((area) => {
  const opt = document.createElement("option");
  opt.value = area;
  opt.textContent = area;
  areaSelect.appendChild(opt);
});
areaSelect.addEventListener("change", (e) => {
  state.area = e.target.value;
  render();
});

document.querySelectorAll(".filter-group[data-filter]").forEach((group) => {
  const key = group.dataset.filter;
  group.querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      group
        .querySelectorAll(".chip")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state[key] = btn.dataset.value;
      render();
    });
  });
});

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
        <img src="https://picsum.photos/seed/${r.imgSeed}/600/400" alt="${r.title}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-top">
          <div class="area mono">${r.area} · ${terrainLabel(r.terrain)}</div>
          <h3>${r.title}</h3>
        </div>
        <div class="stats-row mono">
          <div><span class="k">Distance</span>${r.distanceKm} km</div>
          <div><span class="k">Time</span>${formatTime(r.timeMin)}</div>
        </div>
        <div class="desc">${r.description}</div>
        <a class="go-btn" href="${r.mapUrl}" target="_blank" rel="noopener">Open route →</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

render();
