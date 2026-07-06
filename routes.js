// Route data for Trailmarks.
// Add a new route by adding one object to this array — no other file needs to change.
// terrain must be one of: "forest", "heath", "water", "park" (controls the blaze color).
// elevationM is total elevation gain in meters for the route.
const routes = [
  {
    title: "Birkhoven & Bokkeduinen Loop",
    area: "Amersfoort",
    terrain: "forest",
    distanceKm: 6.5,
    timeMin: 85,
    elevationM: 40,
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
    elevationM: 180,
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
    elevationM: 70,
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
    elevationM: 15,
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
    elevationM: 10,
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
    elevationM: 20,
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
    elevationM: 90,
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
    elevationM: 220,
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
    elevationM: 5,
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
    elevationM: 8,
    description:
      "A compact loop tracing the old medieval canal ring through the historic city centre. All pavement, ideal for an evening walk after dinner.",
    mapUrl: "https://maps.app.goo.gl/k6rXgoeEcpQfcaN69",
    imgSeed: "amersfoortcity",
  },
];
