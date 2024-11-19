import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchItems } from '../services/api';
import Logo from '../components/Logo';
import { DocumentIcon, EyeIcon } from '@heroicons/react/24/outline';
import ImageViewer from '../components/ImageViewer';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const results = await searchItems(searchTerm);
    setSearchResult(results);
  };

  const handleAddNew = () => {
    navigate('/add', { state: { prefillName: searchTerm } });
  };

  const handleUpdate = (item) => {
    navigate('/add', { 
      state: { 
        prefillName: item.itemName,
        prefillLocation: item.location,
        prefillInfo: item.additionalInfo,
        isUpdate: true,
        itemId: item.id
      } 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center min-h-[80vh]">
      <Logo size="xl" />
      <h1 className="font-quicksand text-6xl font-bold text-pastel-blue mb-8 text-center animate-fadeIn mt-6">
        Thing Finder
      </h1>
      
      {/* Subtitle */}
      <p className="font-poppins text-xl text-gray-600 mb-12 text-center">
        Find your belongings with ease ✨
      </p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full max-w-2xl mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-pastel-lavender 
                     focus:outline-none focus:border-pastel-blue focus:ring-2 
                     focus:ring-pastel-blue/50 font-poppins text-lg
                     shadow-sm transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2
                     px-6 py-2 rounded-full bg-pastel-blue text-white
                     hover:bg-opacity-80 transition-colors font-poppins"
          >
            Search
          </button>
        </div>
      </form>

      {/* Updated Search Results */}
      {searchResult && (
        <div className="w-full max-w-2xl animate-fadeIn">
          {searchResult.length === 0 ? (
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                No item found with name "{searchTerm}"
              </p>
              <button
                onClick={handleAddNew}
                className="px-6 py-2 rounded-full bg-pastel-mint text-gray-700
                         hover:bg-opacity-80 transition-colors font-poppins mr-4"
              >
                Add New Item
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {searchResult.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    {/* Image Section */}
                    <div className="w-32 h-32 flex-shrink-0 relative group">
                      {item.photo_url ? (
                        <>
                          <img
                            src={item.photo_url}
                            alt={item.itemName}
                            className="w-full h-full object-cover rounded-lg cursor-pointer"
                            onClick={() => setSelectedImage({ url: item.photo_url, alt: item.itemName })}
                          />
                          <button
                            onClick={() => setSelectedImage({ url: item.photo_url, alt: item.itemName })}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                          >
                            <EyeIcon className="h-6 w-6 text-white" />
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full bg-pastel-yellow/30 rounded-lg flex items-center justify-center">
                          <DocumentIcon className="h-12 w-12 text-pastel-yellow" />
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-grow">
                      <h3 className="font-quicksand font-bold text-lg mb-2">{item.itemName}</h3>
                      <p className="font-poppins text-sm text-gray-600 mb-1">
                        <span className="font-medium">Location:</span> {item.location}
                      </p>
                      {item.additionalInfo && (
                        <p className="font-poppins text-sm text-gray-500 mb-1">
                          <span className="font-medium">Additional Info:</span> {item.additionalInfo}
                        </p>
                      )}
                      <div className="text-xs text-gray-400 font-poppins mt-2">
                        <p>Added: {formatTimestamp(item.created_at)}</p>
                        {item.updated_at && item.updated_at !== item.created_at && (
                          <p>Last Updated: {formatTimestamp(item.updated_at)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleUpdate(item)}
                      className="px-4 py-2 rounded-full bg-pastel-lavender text-gray-700
                               hover:bg-opacity-80 transition-colors font-poppins"
                    >
                      Update Location
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage.url}
          altText={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default Home; 