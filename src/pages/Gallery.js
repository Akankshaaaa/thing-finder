import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAllItems, deleteItem, clearAllItems } from '../services/api';
import { TrashIcon, PencilIcon, DocumentIcon, EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ImageViewer from '../components/ImageViewer';

const Gallery = () => {
  const [sortBy, setSortBy] = useState('newest');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: items, isLoading } = useQuery('items', getAllItems);

  const handleDelete = async (e, itemId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this item?')) {
      await deleteItem(itemId);
      queryClient.invalidateQueries('items');
    }
  };

  const handleUpdate = (e, item) => {
    e.stopPropagation();
    navigate('/add', {
      state: {
        prefillName: item.itemName,
        prefillLocation: item.location,
        prefillInfo: item.additionalInfo,
        isUpdate: true,
        itemId: item.id,
        created_at: item.created_at,
        photo_url: item.photo_url
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

  const handleTileClick = (item) => {
    setSelectedItem(item);
  };

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

  const handleReset = () => {
    if (window.confirm('Are you sure you want to remove all items? This cannot be undone.')) {
      clearAllItems();
      queryClient.invalidateQueries('items');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-quicksand text-3xl text-gray-800">My Items</h1>
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="font-poppins rounded-full px-4 py-2 bg-pastel-lavender"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
          <button
            onClick={handleReset}
            className="font-poppins px-4 py-2 rounded-full bg-pastel-pink hover:bg-opacity-80 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {getSortedItems().map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleTileClick(item)}
            >
              <div className="w-full h-48 relative">
                {item.photo_url ? (
                  <img
                    src={item.photo_url}
                    alt={item.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-pastel-yellow/30 flex items-center justify-center">
                    <DocumentIcon className="h-16 w-16 text-pastel-yellow" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-quicksand font-bold text-lg truncate">
                  {item.itemName}
                </h3>
                <p className="font-poppins text-sm text-gray-600 truncate">
                  {item.location}
                </p>
                <p className="font-poppins text-xs text-gray-400 mt-1">
                  Added: {formatTimestamp(item.created_at)}
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={(e) => handleUpdate(e, item)}
                    className="p-2 rounded-full bg-pastel-lavender hover:bg-opacity-80 transition-colors"
                  >
                    <PencilIcon className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
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

      {/* Detailed Item View Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center p-4"
             onClick={() => setSelectedItem(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-quicksand text-2xl font-bold">{selectedItem.itemName}</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-500 font-poppins">
                <p>Added: {formatTimestamp(selectedItem.created_at)}</p>
                {selectedItem.updated_at && selectedItem.updated_at !== selectedItem.created_at && (
                  <p>Last Updated: {formatTimestamp(selectedItem.updated_at)}</p>
                )}
              </div>

              {selectedItem.photo_url && (
                <div className="relative mb-4 group">
                  <img
                    src={selectedItem.photo_url}
                    alt={selectedItem.itemName}
                    className="w-full h-64 object-cover rounded-lg cursor-pointer"
                    onClick={() => setShowImageViewer(true)}
                  />
                  <button
                    onClick={() => setShowImageViewer(true)}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"
                  >
                    <EyeIcon className="h-8 w-8 text-white" />
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-poppins font-medium text-gray-700">Location</h3>
                  <p className="text-gray-600">{selectedItem.location}</p>
                </div>

                {selectedItem.additionalInfo && (
                  <div>
                    <h3 className="font-poppins font-medium text-gray-700">Additional Information</h3>
                    <p className="text-gray-600">{selectedItem.additionalInfo}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <button
                    onClick={(e) => handleUpdate(e, selectedItem)}
                    className="px-4 py-2 rounded-full bg-pastel-lavender hover:bg-opacity-80 transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Viewer */}
      {showImageViewer && selectedItem?.photo_url && (
        <ImageViewer
          imageUrl={selectedItem.photo_url}
          altText={selectedItem.itemName}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </div>
  );
};

export default Gallery; 