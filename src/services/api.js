// Temporary implementation using localStorage
const STORAGE_KEY = 'thing_finder_items';

const getStoredItems = () => {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
};

const saveItems = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addItem = async (itemData, isUpdate = false) => {
  try {
    const items = getStoredItems();
    const newItem = {
      id: isUpdate ? itemData.itemId : Date.now().toString(),
      itemName: itemData.itemName,
      location: itemData.location,
      additionalInfo: itemData.additionalInfo,
      photo_url: itemData.photo ? URL.createObjectURL(itemData.photo) : null,
      created_at: isUpdate ? itemData.created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    if (isUpdate) {
      const index = items.findIndex(item => item.id === itemData.itemId);
      if (index !== -1) {
        items[index] = newItem;
      }
    } else {
      items.push(newItem);
    }
    
    saveItems(items);
    return newItem.id;
  } catch (error) {
    console.error('Error adding/updating item:', error);
    throw error;
  }
};

export const deleteItem = async (itemId) => {
  try {
    const items = getStoredItems();
    const filteredItems = items.filter(item => item.id !== itemId);
    saveItems(filteredItems);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const searchItems = async (searchTerm) => {
  try {
    const items = getStoredItems();
    return items.filter(item => 
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching items:', error);
    throw error;
  }
};

export const getAllItems = async () => {
  try {
    return getStoredItems();
  } catch (error) {
    console.error('Error getting items:', error);
    throw error;
  }
}; 