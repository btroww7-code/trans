import Head from 'next/head';

export default function ProfilePage({ params }) {
  // ...existing code...
  const structuredData = {
    "@context": "https://schema.org",
    "@type": profile.type === 'COMPANY' ? 'Organization' : 'Person',
    "name": profile.company_name || profile.user?.email,
    "image": profile.avatar_url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": profile.rating_avg,
      "reviewCount": profile.rating_count
    }
  };

  return (
    <>
      <Head>
        <title>{profile.company_name || profile.user?.email} | Transport Marketplace</title>
        <meta name="description" content={`Profil użytkownika ${profile.company_name || profile.user?.email}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      {/* ...existing JSX... */}
    </>
  );
}