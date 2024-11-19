import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addItem } from '../services/api';
import { XCircleIcon } from '@heroicons/react/24/outline';

const AddItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    itemName: '',
    location: '',
    additionalInfo: '',
    photo: null,
    photo_url: null,
    created_at: null,
    updated_at: null
  });

  const [removePhoto, setRemovePhoto] = useState(false);

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        itemName: location.state.prefillName || '',
        location: location.state.prefillLocation || '',
        additionalInfo: location.state.prefillInfo || '',
        photo_url: location.state.photo_url || null,
        created_at: location.state.created_at || null,
        updated_at: location.state.updated_at || null
      }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date().toISOString();
      const submitData = {
        ...formData,
        itemId: location.state?.itemId,
        created_at: location.state?.created_at || timestamp,
        updated_at: timestamp
      };

      if (removePhoto) {
        submitData.photo = null;
        submitData.photo_url = null;
      } else if (!formData.photo && formData.photo_url && !removePhoto) {
        submitData.photo_url = formData.photo_url;
      }

      await addItem(submitData, location.state?.isUpdate);
      navigate('/gallery');
    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  };

  // Format timestamp for display
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="font-quicksand text-3xl text-center mb-8 text-gray-800">
        {location.state?.isUpdate ? 'Update Item' : 'Add New Item'}
      </h1>

      {location.state?.isUpdate && (
        <div className="mb-6 text-sm text-gray-500 font-poppins">
          <p>Created: {formatTimestamp(formData.created_at)}</p>
          {formData.updated_at && formData.updated_at !== formData.created_at && (
            <p>Last Updated: {formatTimestamp(formData.updated_at)}</p>
          )}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Item Name *
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-pastel-blue focus:ring-pastel-blue"
            value={formData.itemName}
            onChange={(e) => setFormData({...formData, itemName: e.target.value})}
          />
        </div>

        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Location *
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-pastel-blue focus:ring-pastel-blue"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm 
                     focus:border-pastel-blue focus:ring-pastel-blue"
            rows="3"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Photo
          </label>
          
          {formData.photo_url && !removePhoto ? (
            <div className="relative inline-block">
              <img
                src={formData.photo_url}
                alt="Current item"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 space-x-2">
                <button
                  type="button"
                  onClick={() => setRemovePhoto(true)}
                  className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <XCircleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setFormData(prev => ({
                      ...prev,
                      photo: e.target.files[0],
                      photo_url: URL.createObjectURL(e.target.files[0])
                    }));
                    setRemovePhoto(false);
                  }
                }}
                className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-full file:border-0
                          file:text-sm file:font-semibold
                          file:bg-pastel-blue file:text-white
                          hover:file:bg-pastel-blue/80
                          cursor-pointer"
              />
              <p className="mt-1 text-sm text-gray-500">
                Upload a photo of your item (optional)
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-full 
                     shadow-sm text-white bg-pastel-blue hover:bg-opacity-80 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-pastel-blue font-poppins"
          >
            {location.state?.isUpdate ? 'Update Item' : 'Add Item'}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-2 px-4 border border-transparent rounded-full 
                     shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-gray-500 font-poppins"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem; 