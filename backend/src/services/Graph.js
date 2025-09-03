// Simple demo graph: intersections with lat/lng + weighted edges (meters)
// In real life, you'd load this from DB or OSM.
export const nodes = {
  A: { id: "A", lat: 22.5726, lng: 88.3639 }, // Kolkata center
  B: { id: "B", lat: 22.5800, lng: 88.3700 },
  C: { id: "C", lat: 22.5850, lng: 88.3650 },
  D: { id: "D", lat: 22.5900, lng: 88.3750 },
  E: { id: "E", lat: 22.6000, lng: 88.3800 },
};

export const edges = {
  A: [{ to: "B" }, { to: "C" }],
  B: [{ to: "A" }, { to: "C" }, { to: "D" }],
  C: [{ to: "A" }, { to: "B" }, { to: "D" }],
  D: [{ to: "B" }, { to: "C" }, { to: "E" }],
  E: [{ to: "D" }],
};
