'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

// Dynamic imports for heavy components
const DynamicMap = dynamic(() => import('../../../components/ListingMap'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-200 animate-pulse rounded"></div>,
});
const DynamicImageGallery = dynamic(() => import('../../../components/ImageGallery'), {
  ssr: false,
  loading: () => <div className="h-24 bg-gray-200 animate-pulse rounded"></div>,
});
const DynamicChat = dynamic(() => import('../../../components/ChatWindow'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-200 animate-pulse rounded"></div>,
});

export default function ListingDetailPage({ params }) {
  const [listing, setListing] = useState(null);
  const [offers, setOffers] = useState([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/listings/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setListing(data);
        // Pobierz oferty jeśli owner
        if (data.isOwner) {
          fetch(`/api/offers?listing_id=${data.id}`)
            .then(res => res.json())
            .then(setOffers);
        }
      });
  }, [params.slug]);

  if (!listing) return <div className="animate-pulse h-96 bg-gray-100 rounded" />;

  // Role logic (przykład, dostosuj do swojego auth context)
  const isOwner = listing.isOwner;
  const isCarrier = listing.isCarrier;
  const isClient = listing.isClient && !listing.isOwner;

  // Assume listing is loaded
  const canonicalUrl = `https://yourdomain.com/listings/${params.slug}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: listing.title,
    description: listing.description,
    image: listing.images?.[0]?.previewUrl,
    offers: {
      '@type': 'Offer',
      price: listing.price || '',
      priceCurrency: listing.currency || 'PLN',
      availability: 'https://schema.org/InStock',
    },
    brand: listing.category?.name_pl,
    review: listing.reviews?.map(r => ({
      '@type': 'Review',
      reviewRating: { '@type': 'Rating', ratingValue: r.overall_rating },
      author: { '@type': 'Person', name: r.reviewer?.profile?.company_name || r.reviewer?.email },
      reviewBody: r.comment,
    })),
  };

  return (
    <>
      <Head>
        <title>{listing.title} | Transport Marketplace</title>
        <meta name="description" content={listing.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={listing.title} />
        <meta property="og:description" content={listing.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={listing.images?.[0]?.previewUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={listing.title} />
        <meta name="twitter:description" content={listing.description} />
        <meta name="twitter:image" content={listing.images?.[0]?.previewUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <div>
        {/* Hero section */}
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">{listing.category?.name_pl}</span>
          <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">{listing.status}</span>
          <span className="ml-auto text-gray-500">👁 {listing.views_count}</span>
          <button
            className={`ml-2 text-red-500 ${saved ? 'font-bold' : ''}`}
            onClick={() => setSaved(s => !s)}
          >
            ♥
          </button>
        </div>
        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lewa kolumna */}
          <div>
            <div className="mb-4 whitespace-pre-line">{listing.description}</div>
            <table className="mb-4 w-full text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold">Waga:</td>
                  <td>{listing.weight_kg ? `${listing.weight_kg} kg` : '-'}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Wymiary:</td>
                  <td>
                    {listing.dimensions_json
                      ? `${listing.dimensions_json.length} x ${listing.dimensions_json.width} x ${listing.dimensions_json.height} cm`
                      : '-'}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Ilość:</td>
                  <td>{listing.quantity}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Typ pojazdu:</td>
                  <td>{listing.vehicle_type || '-'}</td>
                </tr>
              </tbody>
            </table>
            <div className="mb-4">
              <span className="font-semibold">Trasa:</span>{' '}
              {listing.from_address_json?.city} → {listing.to_address_json?.city} ({listing.distance_km} km)
            </div>
            <div>
              <span className="font-semibold">Daty:</span>{' '}
              {listing.flexible_dates
                ? 'Elastyczny termin'
                : `${listing.pickup_date_from?.slice(0, 10)} - ${listing.delivery_date_to?.slice(0, 10)}`}
            </div>
          </div>
          {/* Prawa kolumna */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={listing.owner?.profile?.avatar_url || '/avatar.png'}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{listing.owner?.profile?.company_name || listing.owner?.email}</span>
              <span className="text-yellow-500">{listing.owner?.profile?.rating_avg?.toFixed(1)} ★</span>
              {listing.owner?.profile?.verified && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Zweryfikowany</span>
              )}
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <button className="bg-gray-200 px-4 py-2 rounded">Edytuj</button>
                <button className="bg-red-200 px-4 py-2 rounded">Usuń</button>
              </div>
            )}
            {isCarrier && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Złóż ofertę</button>
            )}
            {isClient && (
              <div className="text-gray-500">Tylko przewoźnicy mogą składać oferty</div>
            )}
          </div>
        </div>
        <DynamicImageGallery images={listing.images} />
        <DynamicMap from={listing.from_geo} to={listing.to_geo} />
        {/* Sekcja Oferty (tylko dla owner) */}
        {isOwner && (
          <div className="mt-8">
            <h2 className="font-bold mb-2">Otrzymane oferty</h2>
            <div>
              {offers.length === 0 ? (
                <div className="text-gray-500">Brak ofert</div>
              ) : (
                offers
                  .sort((a, b) => a.price - b.price)
                  .map(offer => (
                    <div key={offer.id} className="border rounded p-4 mb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img
                          src={offer.carrier?.profile?.avatar_url || '/avatar.png'}
                          alt="avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-semibold">{offer.carrier?.profile?.company_name || offer.carrier?.email}</span>
                        <span className="text-yellow-500">{offer.carrier?.profile?.rating_avg?.toFixed(1)} ★</span>
                        {offer.carrier?.profile?.verified && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Zweryfikowany</span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-lg">{offer.price} {offer.currency}</span>
                        <div className="text-xs text-gray-500">{offer.message.slice(0, 40)}...</div>
                        <div className="text-xs text-gray-400">
                          {offer.estimated_pickup_date?.slice(0, 10)} - {offer.estimated_delivery_date?.slice(0, 10)}
                        </div>
                        <button className="ml-2 text-blue-500">Zobacz szczegóły</button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
