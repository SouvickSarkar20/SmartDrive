import { useState, useEffect } from "react";
import API from "../api/axios";


export default function Dashboard() {
  const [location, setLocation] = useState("");
  const [deliveries, setDeliveries] = useState([]);

  async function fetchDeliveries() {
    try {
      const res = await API.get("/delivery");
      setDeliveries(res.data);
    } catch (err) {
      console.error("Error fetching deliveries", err);
    }
  }

  async function addDelivery(e) {
    e.preventDefault();
    try {
      await API.post("/delivery", { location });
      setLocation("");
      fetchDeliveries();
    } catch (err) {
      console.error("Error adding delivery", err);
    }
  }

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <form onSubmit={addDelivery} className="flex gap-2 mt-4">
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location" className="border p-2"/>
        <button className="bg-green-500 text-white p-2">Add</button>
      </form>
      <ul className="mt-4">
        {deliveries.map(d => (
          <li key={d._id} className="border p-2 my-2">{d.location}</li>
        ))}
      </ul>
    </div>
  );
}
