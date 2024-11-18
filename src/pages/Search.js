import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { searchItems } from '../services/api';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: items, isLoading } = useQuery(['items', searchTerm], () => 
    searchTerm ? searchItems(searchTerm) : []
  );

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border-2 border-pastel-blue focus:outline-none focus:ring-2 focus:ring-pastel-blue font-poppins"
        />
      </div>

      {isLoading ? (
        <div className="text-center">Searching...</div>
      ) : (
        <div className="space-y-4">
          {items?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex items-center space-x-4"
            >
              <div className="w-20 h-20 flex-shrink-0">
                {item.photo_url ? (
                  <img
                    src={item.photo_url}
                    alt={item.itemName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-pastel-yellow rounded-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-quicksand font-bold text-lg">{item.itemName}</h3>
                <p className="font-poppins text-sm text-gray-600">{item.location}</p>
                {item.additionalInfo && (
                  <p className="font-poppins text-sm text-gray-500 mt-1">{item.additionalInfo}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 