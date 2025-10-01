import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function ListingMap({ from, to }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!from || !to) return;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [(from.lng + to.lng) / 2, (from.lat + to.lat) / 2],
      zoom: 6,
    });
    new mapboxgl.Marker({ color: 'green' }).setLngLat([from.lng, from.lat]).addTo(map);
    new mapboxgl.Marker({ color: 'red' }).setLngLat([to.lng, to.lat]).addTo(map);
    // Draw route line
    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [from.lng, from.lat],
              [to.lng, to.lat],
            ],
          },
        },
      });
      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#3b82f6', 'line-width': 4 },
      });
    });
    return () => map.remove();
  }, [from, to]);

  return <div ref={mapRef} style={{ width: '100%', height: 300 }} />;
}
