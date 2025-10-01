import React, { useEffect, useState } from 'react';
import ListingCard from '../../components/ListingCard';
import SearchBar from '../../components/SearchBar';

export default function ListingsPage({ searchParams }) {
  const [listings, setListings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/search/listings?${new URLSearchParams({ ...searchParams, page })}`)
      .then(res => res.json())
      .then(data => {
        setListings(data.data);
        setTotal(data.total);
      });
  }, [searchParams, page]);

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar />
        <span className="text-gray-500">{total} wyników znalezionych</span>
      </div>
      <div>
        {listings.map(listing => (
          <ListingCard key={listing.id} listing={listing} highlight={searchParams.q} />
        ))}
        <div className="flex justify-center mt-6">
          {/* Pagination */}
          {Array.from({ length: Math.ceil(total / 40) }, (_, i) => (
            <button
              key={i + 1}
              className={`mx-1 px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
