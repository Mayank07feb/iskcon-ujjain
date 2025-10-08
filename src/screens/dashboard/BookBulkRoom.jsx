// screens/dashboard/BookBulkRoom.jsx
import React, { useState } from "react";
import {
  UserGroupIcon,
  CalendarIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";

const roomTypes = [
  { id: 1, name: "Deluxe AC Room", price: 500, capacity: 2, available: 8 },
  { id: 2, name: "Standard Non-AC Room", price: 400, capacity: 2, available: 12 },
  { id: 3, name: "Dormitory", price: 200, capacity: 8, available: 3 }
];

export default function BookBulkRoom() {
  const [formData, setFormData] = useState({
    groupName: "",
    contactPerson: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    totalGuests: "",
    purpose: "",
    specialRequirements: ""
  });

  const [selectedRooms, setSelectedRooms] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomSelection = (roomId, count) => {
    setSelectedRooms(prev => ({
      ...prev,
      [roomId]: count
    }));
  };

  const calculateTotalRooms = () => {
    return Object.values(selectedRooms).reduce((sum, count) => sum + count, 0);
  };

  const calculateTotalGuests = () => {
    return Object.entries(selectedRooms).reduce((sum, [roomId, count]) => {
      const room = roomTypes.find(r => r.id === parseInt(roomId));
      return sum + (count * room.capacity);
    }, 0);
  };

  const calculateTotalAmount = () => {
    const nights = formData.checkIn && formData.checkOut ? 
      Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) : 0;
    
    return Object.entries(selectedRooms).reduce((sum, [roomId, count]) => {
      const room = roomTypes.find(r => r.id === parseInt(roomId));
      return sum + (count * room.price * nights);
    }, 0);
  };

  const isStep1Valid = () => {
    return formData.groupName && formData.contactPerson && formData.email && 
           formData.phone && formData.checkIn && formData.checkOut && 
           formData.totalGuests && formData.purpose;
  };

  const isStep2Valid = () => {
    return calculateTotalRooms() > 0 && calculateTotalGuests() >= parseInt(formData.totalGuests || 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1 && isStep1Valid()) {
      setStep(2);
    } else if (step === 2 && isStep2Valid()) {
      // Handle bulk booking submission
      console.log("Bulk booking submitted:", { formData, selectedRooms });
      setStep(3);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Book Bulk Rooms
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Reserve multiple rooms for groups, pilgrimages, or events
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= stepNumber ? 'bg-orange-600 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                {step > stepNumber ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-orange-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Group Details</span>
          <span>Room Selection</span>
          <span>Confirmation</span>
        </div>
      </div>

      {/* Step 1: Group Details */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Group Information</h2>
            <p className="text-sm text-gray-600">Provide details about your group</p>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group/Organization Name *
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Number of Guests *
                </label>
                <input
                  type="number"
                  name="totalGuests"
                  value={formData.totalGuests}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Visit *
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select Purpose</option>
                  <option value="pilgrimage">Pilgrimage</option>
                  <option value="spiritual_gathering">Spiritual Gathering</option>
                  <option value="wedding">Wedding</option>
                  <option value="conference">Conference</option>
                  <option value="family_function">Family Function</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Any special requirements, dietary restrictions, or additional notes..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={!isStep1Valid()}
                className={`px-6 py-2 rounded-md font-medium ${
                  isStep1Valid()
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Room Selection
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 2: Room Selection */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Room Selection</h2>
            <p className="text-sm text-gray-600">
              Select rooms for your group of {formData.totalGuests} guests
            </p>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {roomTypes.map((room) => (
                <div key={room.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                      <p className="text-sm text-gray-600">Capacity: {room.capacity} guests per room</p>
                      <p className="text-sm text-gray-600">Available: {room.available} rooms</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-orange-600">₹{room.price}/night</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Number of rooms:</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => handleRoomSelection(room.id, Math.max(0, (selectedRooms[room.id] || 0) - 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {selectedRooms[room.id] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRoomSelection(room.id, Math.min(room.available, (selectedRooms[room.id] || 0) + 1))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Booking Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Total Rooms</p>
                  <p className="font-semibold">{calculateTotalRooms()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Guests</p>
                  <p className="font-semibold">{calculateTotalGuests()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nights</p>
                  <p className="font-semibold">
                    {formData.checkIn && formData.checkOut ? 
                      Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24)) : 0
                    }
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-orange-600">₹{calculateTotalAmount()}</p>
                </div>
              </div>

              {calculateTotalGuests() < parseInt(formData.totalGuests) && (
                <p className="text-red-600 text-sm mt-2">
                  Selected rooms accommodate {calculateTotalGuests()} guests, but you specified {formData.totalGuests} guests.
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isStep2Valid()}
                className={`px-6 py-2 rounded-md font-medium ${
                  isStep2Valid()
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Confirm Bulk Booking
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow text-center py-12">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bulk Booking Request Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your request for {calculateTotalRooms()} rooms has been received. We'll contact you at {formData.email} within 24 hours to confirm availability and complete the booking.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setStep(1);
                setFormData({
                  groupName: "",
                  contactPerson: "",
                  email: "",
                  phone: "",
                  checkIn: "",
                  checkOut: "",
                  totalGuests: "",
                  purpose: "",
                  specialRequirements: ""
                });
                setSelectedRooms({});
              }}
              className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
            >
              New Bulk Booking
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              View Booking Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}