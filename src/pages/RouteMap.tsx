import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Demo data for student routes
const demoRoutes = {
  "STU001": [
    { time: "08:30 AM", location: "Main Gate", coordinates: [77.5946, 12.9716] },
    { time: "08:45 AM", location: "Library", coordinates: [77.5948, 12.9718] },
    { time: "10:15 AM", location: "CS Building", coordinates: [77.5950, 12.9720] },
    { time: "12:30 PM", location: "Cafeteria", coordinates: [77.5952, 12.9722] },
  ],
  "STU002": [
    { time: "09:00 AM", location: "Side Gate", coordinates: [77.5947, 12.9717] },
    { time: "09:20 AM", location: "Admin Block", coordinates: [77.5949, 12.9719] },
    { time: "11:00 AM", location: "Lab Complex", coordinates: [77.5951, 12.9721] },
    { time: "01:00 PM", location: "Sports Complex", coordinates: [77.5953, 12.9723] },
  ],
};

const RouteMap = () => {
  const location = useLocation();
  const [mapboxToken, setMapboxToken] = useState("");
  const studentId = new URLSearchParams(location.search).get("id") || "STU001";
  const studentRoutes = demoRoutes[studentId as keyof typeof demoRoutes] || [];

  const initializeMap = () => {
    if (!mapboxToken) return;
    
    mapboxgl.accessToken = mapboxToken;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: studentRoutes[0]?.coordinates || [77.5946, 12.9716],
      zoom: 16
    });

    // Add markers for each location
    studentRoutes.forEach((route) => {
      const marker = new mapboxgl.Marker()
        .setLngLat(route.coordinates)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3 class="font-bold">${route.location}</h3>
          <p>${route.time}</p>
        `))
        .addTo(map);
    });

    // Draw route line
    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: studentRoutes.map(r => r.coordinates)
          }
        }
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4
        }
      });
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Route Map</h1>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox public token"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Get your token from <a href="https://www.mapbox.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Mapbox</a>
              </p>
            </div>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={initializeMap}
            >
              Initialize Map
            </button>
          </div>
        </Card>

        <Card className="p-6">
          <div id="map" className="w-full h-[500px] rounded-lg"></div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Route Timeline</h2>
          <div className="space-y-4">
            {studentRoutes.map((route, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{route.location}</p>
                  <p className="text-sm text-muted-foreground">{route.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RouteMap;