import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAllItems, deleteItem } from '../services/api';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const Gallery = () => {
  const [sortBy, setSortBy] = useState('newest');
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: items, isLoading } = useQuery('items', getAllItems);

  const handleDelete = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(itemId);
      queryClient.invalidateQueries('items');
    }
  };

  const handleUpdate = (item) => {
    navigate('/add', {
      state: {
        prefillName: item.itemName,
        prefillLocation: item.location,
        prefillInfo: item.additionalInfo,
        isUpdate: true,
        itemId: item.id,
        created_at: item.created_at
      }
    });
  };

  const getSortedItems = () => {
    if (!items) return [];
    const sortedItems = [...items];
    
    switch (sortBy) {
      case 'newest':
        return sortedItems.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'oldest':
        return sortedItems.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      case 'alphabetical':
        return sortedItems.sort((a, b) => a.itemName.localeCompare(b.itemName));
      default:
        return sortedItems;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-quicksand text-3xl text-gray-800">My Items</h1>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="font-poppins rounded-full px-4 py-2 bg-pastel-lavender"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getSortedItems().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1">
                {item.photo_url ? (
                  <img
                    src={item.photo_url}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pastel-yellow flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-quicksand font-bold text-lg">{item.itemName}</h3>
                <p className="font-poppins text-sm text-gray-600">{item.location}</p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => handleUpdate(item)}
                    className="p-2 rounded-full bg-pastel-lavender hover:bg-opacity-80 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-full bg-pastel-pink hover:bg-opacity-80 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery; 