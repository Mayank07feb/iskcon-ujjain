import React, { useState } from "react";
import {
  UserGroupIcon,
  CalendarIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const roomTypes = [
  { id: 1, name: "Deluxe AC Room", price: 500, capacity: 2, available: 8 },
  {
    id: 2,
    name: "Standard Non-AC Room",
    price: 400,
    capacity: 2,
    available: 12,
  },
  { id: 3, name: "Dormitory", price: 200, capacity: 8, available: 3 },
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
    specialRequirements: "",
  });

  const [selectedRooms, setSelectedRooms] = useState({});
  const [step, setStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomSelection = (roomId, count) => {
    setSelectedRooms((prev) => ({
      ...prev,
      [roomId]: count,
    }));
  };

  const calculateTotalRooms = () => {
    return Object.values(selectedRooms).reduce((sum, count) => sum + count, 0);
  };

  const calculateTotalGuests = () => {
    return Object.entries(selectedRooms).reduce((sum, [roomId, count]) => {
      const room = roomTypes.find((r) => r.id === parseInt(roomId));
      return sum + count * room.capacity;
    }, 0);
  };

  const calculateTotalAmount = () => {
    const nights =
      formData.checkIn && formData.checkOut
        ? Math.ceil(
            (new Date(formData.checkOut) - new Date(formData.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        : 0;

    return Object.entries(selectedRooms).reduce((sum, [roomId, count]) => {
      const room = roomTypes.find((r) => r.id === parseInt(roomId));
      return sum + count * room.price * nights;
    }, 0);
  };

  const isStep1Valid = () => {
    return (
      formData.groupName &&
      formData.contactPerson &&
      formData.email &&
      formData.phone &&
      formData.checkIn &&
      formData.checkOut &&
      formData.totalGuests &&
      formData.purpose
    );
  };

  const isStep2Valid = () => {
    return (
      calculateTotalRooms() > 0 &&
      calculateTotalGuests() >= parseInt(formData.totalGuests || 0)
    );
  };

  const handleContinue = () => {
    if (step === 1 && isStep1Valid()) {
      setStep(2);
    } else if (step === 2 && isStep2Valid()) {
      console.log("Bulk booking submitted:", { formData, selectedRooms });
      setStep(3);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-7 text-gray-900">
            Book Bulk Rooms
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Reserve multiple rooms for groups, pilgrimages, or events
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          {[1, 2, 3].map((stepNumber, index) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-colors ${
                    step >= stepNumber
                      ? "bg-orange-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <span className="text-sm sm:text-base font-medium">
                      {stepNumber}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-xs sm:text-sm text-gray-600 mt-2 text-center">
                  {stepNumber === 1 && "Group Details"}
                  {stepNumber === 2 && "Room Selection"}
                  {stepNumber === 3 && "Confirmation"}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`flex-1 h-1 mx-2 sm:mx-4 transition-colors ${
                    step > stepNumber ? "bg-orange-600" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between text-[10px] sm:hidden text-gray-600">
          <span>Details</span>
          <span>Rooms</span>
          <span>Confirm</span>
        </div>
      </div>

      {/* Step 1: Group Details */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Group Information
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Provide details about your group
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div className="md:col-span-2 sm:col-span-1">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Group/Organization Name *
                </label>
                <input
                  type="text"
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Contact Person *
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Check-in Date *
                </label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Check-out Date *
                </label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  min={formData.checkIn}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Total Number of Guests *
                </label>
                <input
                  type="number"
                  name="totalGuests"
                  value={formData.totalGuests}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Purpose of Visit *
                </label>
                <select
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select Purpose</option>
                  <option value="pilgrimage">Pilgrimage</option>
                  <option value="spiritual_gathering">
                    Spiritual Gathering
                  </option>
                  <option value="wedding">Wedding</option>
                  <option value="conference">Conference</option>
                  <option value="family_function">Family Function</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Any special requirements, dietary restrictions, or additional notes..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleContinue}
                disabled={!isStep1Valid()}
                className={`w-full sm:w-auto px-6 py-2.5 sm:py-2 rounded-md font-medium text-sm transition-colors touch-manipulation ${
                  isStep1Valid()
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue to Room Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Room Selection */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              Room Selection
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Select rooms for your group of {formData.totalGuests} guests
            </p>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4 sm:space-y-6">
              {roomTypes.map((room) => (
                <div key={room.id} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {room.name}
                      </h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                        <p className="text-xs sm:text-sm text-gray-600">
                          Capacity: {room.capacity} guests
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Available: {room.available} rooms
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-base sm:text-lg font-semibold text-orange-600">
                        ₹{room.price}/night
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-700">
                      Number of rooms:
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleRoomSelection(
                            room.id,
                            Math.max(0, (selectedRooms[room.id] || 0) - 1)
                          )
                        }
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 touch-manipulation text-lg font-medium"
                      >
                        -
                      </button>
                      <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">
                        {selectedRooms[room.id] || 0}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleRoomSelection(
                            room.id,
                            Math.min(
                              room.available,
                              (selectedRooms[room.id] || 0) + 1
                            )
                          )
                        }
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100 touch-manipulation text-lg font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                Booking Summary
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Total Rooms</p>
                  <p className="font-semibold text-base sm:text-lg">
                    {calculateTotalRooms()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total Guests</p>
                  <p className="font-semibold text-base sm:text-lg">
                    {calculateTotalGuests()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Nights</p>
                  <p className="font-semibold text-base sm:text-lg">
                    {formData.checkIn && formData.checkOut
                      ? Math.ceil(
                          (new Date(formData.checkOut) -
                            new Date(formData.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 0}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total Amount</p>
                  <p className="font-semibold text-orange-600 text-base sm:text-lg">
                    ₹{calculateTotalAmount()}
                  </p>
                </div>
              </div>

              {calculateTotalGuests() < parseInt(formData.totalGuests) && (
                <p className="text-red-600 text-xs sm:text-sm mt-3 p-2 bg-red-50 rounded">
                  Selected rooms accommodate {calculateTotalGuests()} guests,
                  but you specified {formData.totalGuests} guests.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm touch-manipulation"
              >
                Back
              </button>
              <button
                onClick={handleContinue}
                disabled={!isStep2Valid()}
                className={`w-full sm:w-auto px-6 py-2.5 sm:py-2 rounded-md font-medium text-sm transition-colors touch-manipulation ${
                  isStep2Valid()
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Confirm Bulk Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow text-center py-8 sm:py-12 px-4">
          <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Bulk Booking Request Submitted!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
            Your request for {calculateTotalRooms()} rooms has been received.
            We'll contact you at {formData.email} within 24 hours to confirm
            availability and complete the booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
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
                  specialRequirements: "",
                });
                setSelectedRooms({});
              }}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium text-sm touch-manipulation"
            >
              New Bulk Booking
            </button>
            <button className="w-full sm:w-auto px-6 py-2.5 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm touch-manipulation">
              View Booking Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
