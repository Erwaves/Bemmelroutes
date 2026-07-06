const TERRAIN_COLORS = {
  forest: "var(--blaze-green)",
  heath: "var(--blaze-orange)",
  water: "var(--blaze-blue)",
  park: "var(--blaze-clay)",
};

const routes = [
  {
    title: "Birkhoven & Bokkeduinen Loop",
    area: "Amersfoort",
    terrain: "forest",
    distanceKm: 6.5,
    timeMin: 85,
    description:
      "A shaded woodland loop through Amersfoort's own forest park, past the small zoo and a chain of ponds. Easy footing throughout, good for an after-work walk.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "birkhoven",
  },
  {
    title: "Utrechtse Heuvelrug Ridge Walk",
    area: "Utrechtse Heuvelrug",
    terrain: "forest",
    distanceKm: 13.2,
    timeMin: 220,
    description:
      "A long ridge route through glacial hills, dense pine forest, and the odd clearing with a view over the Kromme Rijn valley. Bring proper shoes for the sandy climbs.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "heuvelrug",
  },
  {
    title: "Leusderheide Heathland Circuit",
    area: "Leusden",
    terrain: "heath",
    distanceKm: 8.4,
    timeMin: 130,
    description:
      "Open heather and juniper scrub with grazing sheep and wide horizon views. Exposed to wind and sun, so this one rewards an early start or a golden-hour finish.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "leusderheide",
  },
  {
    title: "Loosdrechtse Plassen Waterside",
    area: "Loosdrecht",
    terrain: "water",
    distanceKm: 9.8,
    timeMin: 150,
    description:
      "Flat polder paths threading between lakes, reed beds, and sailing marinas. Mostly gravel and boardwalk, with several benches for a picnic stop.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "loosdrecht",
  },
  {
    title: "Kasteel de Haar Parkland Route",
    area: "Haarzuilens",
    terrain: "park",
    distanceKm: 5.1,
    timeMin: 75,
    description:
      "A gentle stroll through landscaped grounds and moated gardens around the Netherlands' largest castle. Flat, well-paved, and stroller-friendly.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "dehaar",
  },
  {
    title: "Vechtplassen River Path",
    area: "Vechtplassengebied",
    terrain: "water",
    distanceKm: 11.6,
    timeMin: 175,
    description:
      "Follows the Vecht river past country estates, boathouses, and small ferries. Mostly towpath, flat and easy, with a café roughly at the halfway mark.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "vecht",
  },
  {
    title: "Soesterduinen Dune Trail",
    area: "Soest",
    terrain: "heath",
    distanceKm: 7.2,
    timeMin: 105,
    description:
      "Rolling inland dunes and dry grassland, one of the quieter nature reserves in the area. Sandy underfoot in places, so pace yourself on the climbs.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "soesterduinen",
  },
  {
    title: "Amerongse Berg Forest Climb",
    area: "Amerongen",
    terrain: "forest",
    distanceKm: 14.5,
    timeMin: 235,
    description:
      "The steepest route on this list, climbing through mixed forest to one of the higher points on the Utrechtse Heuvelrug. Long, but the summit clearing is worth it.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "amerongen",
  },
  {
    title: "Naardermeer Reserve Boardwalk",
    area: "Naarden",
    terrain: "water",
    distanceKm: 4.3,
    timeMin: 60,
    description:
      "A short, flat boardwalk loop through the Netherlands' oldest nature reserve — reed marsh, herons, and the occasional spoonbill. Good for a quick reset.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "naardermeer",
  },
  {
    title: "Amersfoort City Wall Walk",
    area: "Amersfoort",
    terrain: "park",
    distanceKm: 3.6,
    timeMin: 50,
    description:
      "A compact loop tracing the old medieval canal ring through the historic city centre. All pavement, ideal for an evening walk after dinner.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "amersfoortcity",
  },
];

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
