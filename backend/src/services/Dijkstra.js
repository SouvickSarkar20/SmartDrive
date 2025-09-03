
import { haversineMeters } from "../utils/Distance.js";
import { edges, nodes } from "./Graph.js";

// Precompute edge weights by haversine
function buildWeightedAdj() {
  const adj = {};
  for (const u of Object.keys(edges)) {
    adj[u] = edges[u].map(({ to }) => ({
      to,
      w: haversineMeters(nodes[u], nodes[to]),
    }));
  }
  return adj;
}

class MinPQ {
  constructor() { this.a = []; }
  push(item) { this.a.push(item); this.a.sort((x,y)=>x.dist-y.dist); }
  pop() { return this.a.shift(); }
  get length() { return this.a.length; }
}

function nearestNodeTo({ lat, lng }) {
  // Snap arbitrary coordinate to the nearest graph node
  let best = null, bestD = Infinity;
  for (const n of Object.values(nodes)) {
    const d = haversineMeters(n, { lat, lng });
    if (d < bestD) { bestD = d; best = n; }
  }
  return best;
}

export function dijkstraShortestPath(sourceCoord, destCoord) {
  const src = nearestNodeTo(sourceCoord);
  const dst = nearestNodeTo(destCoord);
  const adj = buildWeightedAdj();

  const dist = {};
  const prev = {};
  for (const k of Object.keys(nodes)) { dist[k] = Infinity; prev[k] = null; }
  dist[src.id] = 0;

  const pq = new MinPQ();
  pq.push({ node: src.id, dist: 0 });

  while (pq.length) {
    const { node: u, dist: d } = pq.pop();
    if (d > dist[u]) continue;
    if (u === dst.id) break;

    for (const { to: v, w } of adj[u] || []) {
      const nd = d + w;
      if (nd < dist[v]) {
        dist[v] = nd;
        prev[v] = u;
        pq.push({ node: v, dist: nd });
      }
    }
  }

  // Reconstruct path of node IDs
  const pathIds = [];
  let cur = dst.id;
  if (prev[cur] !== null || cur === src.id) {
    while (cur) {
      pathIds.unshift(cur);
      cur = prev[cur];
      if (cur === null) break;
    }
  }

  return {
    src: { nodeId: src.id, ...src },
    dst: { nodeId: dst.id, ...dst },
    distanceMeters: dist[dst.id],
    path: pathIds.map((id) => ({ id, lat: nodes[id].lat, lng: nodes[id].lng })),
  };
}
