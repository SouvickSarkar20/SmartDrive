import API from "../api/axios";

/**
 * source, destination: { lat: number, lng: number }
 * returns: { path: [{lat,lng,id}], distanceMeters: number, src, dst }
 */
export async function getShortestPath(source, destination) {
  const res = await API.post("/path", { source, destination });
  return res.data;
}
