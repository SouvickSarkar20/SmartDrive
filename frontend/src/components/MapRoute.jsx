import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points || points.length === 0) return;
    const latlngs = points.map(p => [p.lat, p.lng]);
    map.fitBounds(latlngs, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export default function MapRoute({ pathPoints, source, destination }) {
  const center = source || { lat: 22.5726, lng: 88.3639 }; // default near Kolkata

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "70vh", width: "100%", borderRadius: 12 }}
      scrollWheelZoom
    >
      <TileLayer
        // You may swap to another tileserver with proper attribution if needed
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {source && <Marker position={[source.lat, source.lng]} />}
      {destination && <Marker position={[destination.lat, destination.lng]} />}

      {pathPoints?.length > 0 && (
        <Polyline positions={pathPoints.map(p => [p.lat, p.lng])} />
      )}

      <FitBounds points={pathPoints?.length ? pathPoints : (source && destination ? [source, destination] : [])} />
    </MapContainer>
  );
}
