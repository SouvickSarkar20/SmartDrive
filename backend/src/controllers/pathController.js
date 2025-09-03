import { dijkstraShortestPath } from "../services/Dijkstra";


export const computePath = async (req, res) => {
  try {
    const { source, destination } = req.body; // { lat, lng }, { lat, lng }
    if (
      !source || !destination ||
      typeof source.lat !== "number" || typeof source.lng !== "number" ||
      typeof destination.lat !== "number" || typeof destination.lng !== "number"
    ) {
      return res.status(400).json({ msg: "Invalid source/destination" });
    }

    const result = dijkstraShortestPath(source, destination);
    if (!result || !result.path?.length) {
      return res.status(404).json({ msg: "No path found" });
    }

    res.json(result);
  } catch (err) {
    console.error("Path error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
