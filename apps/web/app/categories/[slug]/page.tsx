import Head from 'next/head';

export default function CategoryPage({ params }) {
  // ...fetch category data...
  const canonicalUrl = `https://yourdomain.com/categories/${params.slug}`;
  return (
    <>
      <Head>
        <title>{category.name_pl} | Transport Marketplace</title>
        <meta name="description" content={`Zlecenia w kategorii ${category.name_pl}`} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {/* ...category listings... */}
    </>
  );
}
