import React, { useRef, useEffect } from 'react';

export default function AddressAutocomplete({ value, onSelect }) {
  const inputRef = useRef(null);

  useEffect(() => {
    import('@mapbox/mapbox-gl-geocoder').then(MapboxGeocoder => {
      const geocoder = new MapboxGeocoder.default({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        placeholder: 'Wpisz adres...',
        types: 'address,place',
      });
      geocoder.addTo(inputRef.current);
      geocoder.on('result', e => {
        const feature = e.result;
        onSelect({
          formatted: feature.place_name,
          lat: feature.center[1],
          lng: feature.center[0],
        });
      });
    });
  }, [onSelect]);

  return <div ref={inputRef} />;
}
