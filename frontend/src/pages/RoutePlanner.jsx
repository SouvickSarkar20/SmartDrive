import { useEffect, useState } from "react";
import MapRoute from "../components/MapRoute";
import { getShortestPath } from "../services/pathService";

export default function RoutePlanner() {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState({ lat: 22.6000, lng: 88.3800 }); // default near node E
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get user's current location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSource({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        // fallback to a default
        setSource({ lat: 22.5726, lng: 88.3639 });
      }
    );
  }, []);

  async function compute() {
    if (!source || !destination) return;
    try {
      setLoading(true);
      const res = await getShortestPath(source, destination);
      setPath(res.path);
      setDistance(res.distanceMeters);
    } catch (e) {
      alert(e.response?.data?.msg || "Failed to compute path");
    } finally {
      setLoading(false);
    }
  }

  // Allow user to edit destination as lat/lng for now (simple + reliable)
  return (
    <div className="p-6 text-white" style={{ background: "#0b0b0b", minHeight: "100vh" }}>
      <h1 className="text-2xl font-bold mb-4">Route Planner</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gray-900 p-4 rounded-lg shadow-[0_0_20px_2px_rgba(255,255,255,0.15)]">
          <h2 className="font-semibold mb-2">Source (auto-detected)</h2>
          <p className="text-sm text-gray-300 mb-2">
            {source ? `${source.lat.toFixed(5)}, ${source.lng.toFixed(5)}` : "Locating..."}
          </p>

          <h2 className="font-semibold mt-4 mb-2">Destination</h2>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              step="0.00001"
              value={destination.lat}
              onChange={(e) => setDestination((d) => ({ ...d, lat: Number(e.target.value) }))}
              className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Lat"
            />
            <input
              type="number"
              step="0.00001"
              value={destination.lng}
              onChange={(e) => setDestination((d) => ({ ...d, lng: Number(e.target.value) }))}
              className="border border-gray-700 rounded-md p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Lng"
            />
            <button
              onClick={compute}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-black font-semibold p-2 rounded-md transition mt-2 disabled:opacity-50"
            >
              {loading ? "Computing..." : "Compute Shortest Path"}
            </button>

            {distance != null && (
              <p className="mt-3 text-sm text-gray-300">
                Distance: {(distance / 1000).toFixed(2)} km
              </p>
            )}
            <p className="text-xs text-gray-400">
              (Phase-2 demo graph: path is snapped to nearest predefined nodes.)
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <MapRoute pathPoints={path} source={source} destination={destination} />
        </div>
      </div>
    </div>
  );
}
