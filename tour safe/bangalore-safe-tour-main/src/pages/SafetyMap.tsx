import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dangerZones } from "@/data/dangerZones";
import { AlertTriangle, Shield, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { TouristPlace } from "@/data/touristPlaces";

export default function SafetyMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const locationState = useLocation().state;
  const selectedPlace = locationState?.place as TouristPlace | null;

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    // Use selected place coordinates or default to Bangalore center
    const centerLat = selectedPlace?.lat ?? 12.9716;
    const centerLng = selectedPlace?.lng ?? 77.5946;
    const zoom = selectedPlace ? 15 : 13;

    const map = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: zoom,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add marker for selected place
    if (selectedPlace) {
      const placeIcon = L.divIcon({
        html: `<div style="background:hsl(47,96%,56%);width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      L.marker([selectedPlace.lat, selectedPlace.lng], { icon: placeIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'DM Sans',sans-serif;max-width:260px">
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;margin:0 0 4px;color:#1a1a2e">${selectedPlace.name}</h3>
            <span style="display:inline-block;background:#fff3cd;color:#997404;font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;margin-bottom:8px">${selectedPlace.category}</span>
            <p style="font-size:12px;color:#555;margin:0 0 8px;line-height:1.5">${selectedPlace.description}</p>
            <p style="font-size:11px;color:#666;margin:0"><strong>Time required:</strong> ${selectedPlace.avgTime}</p>
          </div>`,
          { maxWidth: 280 }
        )
        .openPopup();
    }

    dangerZones.forEach((zone) => {
      // Red circle
      L.circle([zone.lat, zone.lng], {
        radius: zone.radius,
        color: "hsl(0, 72%, 51%)",
        fillColor: "hsl(0, 72%, 51%)",
        fillOpacity: 0.2,
        weight: 2,
      }).addTo(map);

      // Marker with popup
      const icon = L.divIcon({
        html: `<div style="background:hsl(0,72%,51%);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>`,
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([zone.lat, zone.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:'DM Sans',sans-serif;max-width:260px">
            <h3 style="font-family:'Outfit',sans-serif;font-weight:700;font-size:14px;margin:0 0 4px;color:#1a1a2e">${zone.name}</h3>
            <span style="display:inline-block;background:#fee2e2;color:#dc2626;font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px;margin-bottom:8px">${zone.threat}</span>
            <p style="font-size:12px;color:#555;margin:0 0 8px;line-height:1.5">${zone.description}</p>
            <ul style="padding-left:16px;margin:0;font-size:11px;color:#666;line-height:1.7">
              ${zone.tips.map((t) => `<li>${t}</li>`).join("")}
            </ul>
          </div>`,
          { maxWidth: 280 }
        );
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [selectedPlace]);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Header bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-card px-4 py-3"
      >
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            {selectedPlace ? (
              <>
                <MapPin className="h-5 w-5 text-accent" />
                <h1 className="font-heading text-lg font-bold text-foreground">
                  {selectedPlace.name}
                </h1>
              </>
            ) : (
              <>
                <AlertTriangle className="h-5 w-5 text-danger" />
                <h1 className="font-heading text-lg font-bold text-foreground">
                  Bangalore Safety Map
                </h1>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-danger inline-block" />
              Scam / Danger Zone
            </span>
            {selectedPlace && (
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-accent inline-block" />
                Tourist Place
              </span>
            )}
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-accent" />
              Tap markers for details
            </span>
          </div>
        </div>
      </motion.div>

      {/* Map */}
      <div ref={mapRef} className="flex-1" />
    </div>
  );
}
