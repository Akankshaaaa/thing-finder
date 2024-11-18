import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addItem } from '../services/api';

const AddItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    itemName: '',
    location: '',
    additionalInfo: '',
    photo: null
  });

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        itemName: location.state.prefillName || '',
        location: location.state.prefillLocation || '',
        additionalInfo: location.state.prefillInfo || ''
      }));
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addItem({
        ...formData,
        itemId: location.state?.itemId,
        created_at: location.state?.created_at
      }, location.state?.isUpdate);
      navigate('/gallery');
    } catch (error) {
      console.error('Error adding/updating item:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="font-quicksand text-3xl text-center mb-8 text-gray-800">
        {location.state?.isUpdate ? 'Update Item' : 'Add New Item'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Item Name *
          </label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pastel-blue focus:ring-pastel-blue"
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
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pastel-blue focus:ring-pastel-blue"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Additional Info
          </label>
          <textarea
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pastel-blue focus:ring-pastel-blue"
            rows="3"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
          />
        </div>

        <div>
          <label className="font-poppins block text-sm font-medium text-gray-700">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full"
            onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
          />
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
            onClick={handleCancel}
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