// screens/dashboard/RoomsManagement.jsx
import React, { useState } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

// Sample initial data with images
const initialRooms = [
  {
    id: 1,
    name: "Deluxe AC 101",
    type: "Deluxe AC",
    roomNumber: "101",
    floor: "1",
    price: 5000,
    capacity: 2,
    amenities: ["AC", "TV", "WiFi", "Hot Water"],
    status: "available",
    description: "Spacious deluxe room with city view",
    images: [
      {
        id: "img1",
        url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop"
      },
      {
        id: "img2", 
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 2,
    name: "Standard Non-AC 201",
    type: "Standard Non-AC",
    roomNumber: "201",
    floor: "2",
    price: 3000,
    capacity: 2,
    amenities: ["TV", "WiFi", "Hot Water"],
    status: "occupied",
    description: "Comfortable standard room",
    images: [
      {
        id: "img3",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop"
      }
    ]
  },
  {
    id: 3,
    name: "Dormitory Bed 1",
    type: "Dormitory",
    roomNumber: "D-01",
    floor: "1",
    price: 1000,
    capacity: 4,
    amenities: ["WiFi", "Locker"],
    status: "maintenance",
    description: "Shared dormitory with individual lockers",
    images: []
  }
];

const roomTypes = ["Deluxe AC", "Standard Non-AC", "Dormitory"];
const roomStatuses = [
  { value: "available", label: "Available", color: "green" },
  { value: "occupied", label: "Occupied", color: "red" },
  { value: "maintenance", label: "Maintenance", color: "yellow" },
  { value: "cleaning", label: "Cleaning", color: "blue" }
];
const amenitiesList = ["AC", "TV", "WiFi", "Hot Water", "Minibar", "Balcony", "Sea View", "Locker", "Breakfast"];

export default function RoomsManagement() {
  const [rooms, setRooms] = useState(initialRooms);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Deluxe AC",
    roomNumber: "",
    floor: "",
    price: "",
    capacity: "",
    amenities: [],
    status: "available",
    description: "",
    images: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [uploadingImages, setUploadingImages] = useState(false);
  const [showImageModal, setShowImageModal] = useState({ open: false, room: null });

  // Filter rooms based on search and filters
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || room.type === filterType;
    const matchesStatus = filterStatus === "all" || room.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle image upload (simulated - in real app, you'd upload to a server)
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploadingImages(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newImages = files.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        name: file.name
      }));

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
      setUploadingImages(false);
    }, 1000);
  };

  // Remove image from form
  const removeImageFromForm = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  // Remove image from room
  const removeImageFromRoom = (roomId, imageId) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId 
        ? { ...room, images: room.images.filter(img => img.id !== imageId) }
        : room
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingRoom) {
      // Update existing room
      setRooms(prev => prev.map(room => 
        room.id === editingRoom.id 
          ? { ...formData, id: editingRoom.id, price: parseInt(formData.price), capacity: parseInt(formData.capacity) }
          : room
      ));
    } else {
      // Add new room
      const newRoom = {
        ...formData,
        id: Math.max(...rooms.map(r => r.id)) + 1,
        price: parseInt(formData.price),
        capacity: parseInt(formData.capacity)
      };
      setRooms(prev => [...prev, newRoom]);
    }
    
    resetForm();
    setShowAddForm(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Deluxe AC",
      roomNumber: "",
      floor: "",
      price: "",
      capacity: "",
      amenities: [],
      status: "available",
      description: "",
      images: []
    });
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setFormData({
      ...room,
      price: room.price.toString(),
      capacity: room.capacity.toString()
    });
    setEditingRoom(room);
    setShowAddForm(true);
  };

  const handleDelete = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
    }
  };

  const getStatusColor = (status) => {
    const statusObj = roomStatuses.find(s => s.value === status);
    switch (statusObj?.color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      case 'blue': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircleIcon className="w-4 h-4" />;
      case 'occupied': return <XCircleIcon className="w-4 h-4" />;
      default: return <EyeIcon className="w-4 h-4" />;
    }
  };

  // Image Modal Component
  const ImageModal = () => {
    if (!showImageModal.open || !showImageModal.room) return null;

    const { room } = showImageModal;
    const [selectedImage, setSelectedImage] = useState(room.images[0]?.url || '');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">{room.name} - Images</h3>
            <button
              onClick={() => setShowImageModal({ open: false, room: null })}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="flex space-x-4">
              {/* Thumbnails */}
              <div className="w-1/4 space-y-2 max-h-96 overflow-y-auto">
                {room.images.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative cursor-pointer border-2 rounded-lg ${
                      selectedImage === image.url ? 'border-orange-500' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={`${room.name} ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm("Are you sure you want to delete this image?")) {
                          removeImageFromRoom(room.id, image.id);
                          if (room.images.length === 1) {
                            setShowImageModal({ open: false, room: null });
                          } else if (selectedImage === image.url) {
                            setSelectedImage(room.images[0]?.url || '');
                          }
                        }
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="w-3/4">
                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected room"
                      className="w-full h-96 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {room.images.length === 0 && (
              <div className="text-center py-12">
                <PhotoIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No images available for this room</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Rooms Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all rooms, availability, and pricing
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add New Room
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'available').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'occupied').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">
                {rooms.filter(r => r.status === 'maintenance').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Rooms
            </label>
            <input
              type="text"
              placeholder="Search by name or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              {roomStatuses.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
                setFilterStatus("all");
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Room Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Deluxe AC 101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Number *
                    </label>
                    <input
                      type="text"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 101"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Room Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {roomTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Floor
                    </label>
                    <input
                      type="text"
                      name="floor"
                      value={formData.floor}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Night (₹) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 5000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacity *
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      value={formData.capacity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {roomStatuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Images
                  </label>
                  <div className="space-y-4">
                    {/* Image Upload Button */}
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <PhotoIcon className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max. 5MB)</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImages}
                        />
                      </label>
                    </div>

                    {/* Uploading Indicator */}
                    {uploadingImages && (
                      <div className="flex items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                        <span className="ml-2 text-sm text-gray-600">Uploading images...</span>
                      </div>
                    )}

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          {formData.images.length} image(s) selected
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((image) => (
                            <div key={image.id} className="relative group">
                              <img
                                src={image.url}
                                alt="Room preview"
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImageFromForm(image.id)}
                                className="absolute -top-0 -right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                title="Remove image"
                              >
                                <XMarkIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {amenitiesList.map(amenity => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Room description and features..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    {editingRoom ? 'Update Room' : 'Add Room'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            All Rooms ({filteredRooms.length})
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Images
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amenities
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {room.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          #{room.roomNumber} • Floor {room.floor}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{room.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ₹{room.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">per night</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                        {getStatusIcon(room.status)}
                        <span className="ml-1">
                          {roomStatuses.find(s => s.value === room.status)?.label}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {room.images.slice(0, 3).map((image, index) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt={`Room ${room.name} ${index + 1}`}
                              className="w-12 h-12 object-cover rounded border cursor-pointer"
                              onClick={() => setShowImageModal({ open: true, room })}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm("Are you sure you want to delete this image?")) {
                                  removeImageFromRoom(room.id, image.id);
                                }
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              title="Remove image"
                            >
                              <XMarkIcon className="w-2 h-2" />
                            </button>
                          </div>
                        ))}
                        {room.images.length > 3 && (
                          <div 
                            className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-500 cursor-pointer"
                            onClick={() => setShowImageModal({ open: true, room })}
                          >
                            +{room.images.length - 3}
                          </div>
                        )}
                        {room.images.length === 0 && (
                          <div className="w-12 h-12 bg-gray-100 rounded border flex items-center justify-center">
                            <PhotoIcon className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.slice(0, 3).map(amenity => (
                          <span
                            key={amenity}
                            className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 3 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{room.amenities.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(room)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Edit Room"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(room.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Room"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <PhotoIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No rooms found</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal />
    </div>
  );
}