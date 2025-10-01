import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `${params.slug} | Transport Marketplace`,
    description: `Zlecenia w kategorii ${params.slug}`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kategoria: {params.slug}</h1>
      <p className="text-gray-600">Lista zleceń w tej kategorii.</p>
    </div>
  );
}
