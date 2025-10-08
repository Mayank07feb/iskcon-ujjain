// screens/dashboard/BookingCalendar.jsx
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const sampleBookings = {
  '2025-10-08': [
    { id: 1, guestName: 'Rajesh Kumar', room: 'Deluxe AC', checkIn: '2025-10-08', checkOut: '2025-10-10', status: 'confirmed', guests: 2 },
    { id: 2, guestName: 'Priya Sharma', room: 'Standard Non-AC', checkIn: '2025-10-08', checkOut: '2025-10-09', status: 'confirmed', guests: 1 }
  ],
  '2025-10-15': [
    { id: 3, guestName: 'Amit Patel', room: 'Dormitory', checkIn: '2025-10-15', checkOut: '2025-10-18', status: 'confirmed', guests: 1 },
    { id: 4, guestName: 'Sneha Reddy', room: 'Deluxe AC', checkIn: '2025-10-15', checkOut: '2025-10-17', status: 'confirmed', guests: 2 },
    { id: 5, guestName: 'Rahul Verma', room: 'Standard Non-AC', checkIn: '2025-10-15', checkOut: '2025-10-16', status: 'pending', guests: 2 }
  ],
  '2025-10-20': [
    { id: 6, guestName: 'Anita Desai', room: 'Deluxe AC', checkIn: '2025-10-20', checkOut: '2025-10-22', status: 'confirmed', guests: 3 }
  ],
  '2025-10-23': [
    { id: 7, guestName: 'Vikram Singh', room: 'Standard Non-AC', checkIn: '2025-10-23', checkOut: '2025-10-25', status: 'confirmed', guests: 2 }
  ],
  '2025-10-24': [
    { id: 7, guestName: 'Vikram Singh', room: 'Standard Non-AC', checkIn: '2025-10-23', checkOut: '2025-10-25', status: 'confirmed', guests: 2 }
  ],
  '2025-10-30': [
    { id: 8, guestName: 'Meera Patel', room: 'Deluxe AC', checkIn: '2025-10-30', checkOut: '2025-11-02', status: 'confirmed', guests: 2 },
    { id: 9, guestName: 'Karan Malhotra', room: 'Dormitory', checkIn: '2025-10-30', checkOut: '2025-10-31', status: 'pending', guests: 1 }
  ]
};

const roomTypes = ['Deluxe AC', 'Standard Non-AC', 'Dormitory'];
const roomCapacity = {
  'Deluxe AC': 2,
  'Standard Non-AC': 2,
  'Dormitory': 4
};

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getBookingsForDate = (date) => {
    return sampleBookings[formatDate(date)] || [];
  };

  const getDateStatus = (date) => {
    const bookings = getBookingsForDate(date);
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    
    // Calculate occupancy
    const roomOccupancy = {};
    roomTypes.forEach(room => roomOccupancy[room] = 0);
    
    confirmedBookings.forEach(booking => {
      roomOccupancy[booking.room] += booking.guests || 1;
    });

    // Check if any room is fully booked
    const fullyBookedRooms = roomTypes.filter(room => 
      roomOccupancy[room] >= roomCapacity[room]
    );

    if (fullyBookedRooms.length === roomTypes.length) return 'fully-booked';
    if (bookings.length > 0) return 'partially-booked';
    return 'available';
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const calendar = [];

    // Previous month days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthDays = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i);
      calendar.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      calendar.push({ date, isCurrentMonth: true });
    }

    // Next month days
    const totalCells = 42; // 6 weeks
    const nextMonthDays = totalCells - calendar.length;
    for (let day = 1; day <= nextMonthDays; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
      calendar.push({ date, isCurrentMonth: false });
    }

    return calendar;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'fully-booked': return 'bg-red-50 border-red-200 text-red-900';
      case 'partially-booked': return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'available': return 'bg-green-50 border-green-200 text-green-900';
      default: return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'fully-booked': return 'bg-red-100 text-red-800';
      case 'partially-booked': return 'bg-yellow-100 text-yellow-800';
      case 'available': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'fully-booked': return 'Fully Booked';
      case 'partially-booked': return 'Partially Booked';
      case 'available': return 'Available';
      default: return 'Available';
    }
  };

  const getBookingStats = (date) => {
    const bookings = getBookingsForDate(date);
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    return { total: bookings.length, confirmed, pending };
  };

  // Get all bookings for the current month
  const getAllMonthBookings = () => {
    const bookings = [];
    const daysInMonth = getDaysInMonth(currentDate);
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateBookings = getBookingsForDate(date);
      dateBookings.forEach(booking => {
        bookings.push({
          ...booking,
          displayDate: date
        });
      });
    }
    
    return bookings.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Booking Calendar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View all bookings and availability at a glance
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setView('calendar')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'calendar' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              view === 'list' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - Compact Version */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Compact Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {generateCalendar().map(({ date, isCurrentMonth }, index) => {
                  const bookings = getBookingsForDate(date);
                  const status = getDateStatus(date);
                  const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
                  const isToday = formatDate(date) === formatDate(new Date());
                  const stats = getBookingStats(date);

                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`
                        min-h-20 p-2 border rounded-lg text-center transition-all duration-200
                        ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : ''}
                        ${isToday ? 'ring-2 ring-orange-500 ring-inset' : ''}
                        ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                        ${isCurrentMonth ? getStatusColor(status) : 'bg-gray-50'}
                        hover:shadow-md flex flex-col items-center justify-between
                      `}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className={`text-sm font-medium ${
                          isToday ? 'text-orange-600' : ''
                        }`}>
                          {date.getDate()}
                        </span>
                        {stats.total > 0 && (
                          <span className="text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                            {stats.total}
                          </span>
                        )}
                      </div>
                      
                      {isCurrentMonth && stats.total > 0 && (
                        <div className="space-y-1 w-full">
                          <div className="flex justify-between text-xs">
                            <span className="text-green-600">✓{stats.confirmed}</span>
                            {stats.pending > 0 && (
                              <span className="text-yellow-600">⏰{stats.pending}</span>
                            )}
                          </div>
                          <div className="text-xs font-medium truncate">
                            {bookings[0]?.room.split(' ')[0]}
                            {stats.total > 1 && ` +${stats.total - 1}`}
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Month Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })} Summary
                  </span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-2"></div>
                      <span className="text-xs text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
                      <span className="text-xs text-gray-600">Partially Booked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-100 border border-red-300 rounded mr-2"></div>
                      <span className="text-xs text-gray-600">Fully Booked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details Panel */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate ? `Bookings for ${selectedDate.toDateString()}` : 'Select a Date'}
              </h3>
            </div>
            
            <div className="p-6">
              {selectedDate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Date Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(getDateStatus(selectedDate))}`}>
                      {getStatusText(getDateStatus(selectedDate))}
                    </span>
                  </div>

                  {getBookingsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Bookings:</h4>
                        <span className="text-sm text-gray-500">
                          {getBookingsForDate(selectedDate).length} booking(s)
                        </span>
                      </div>
                      {getBookingsForDate(selectedDate).map(booking => (
                        <div key={booking.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-gray-900">{booking.guestName}</p>
                              <p className="text-sm text-gray-600">{booking.room}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status === 'confirmed' ? (
                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                              ) : (
                                <ClockIcon className="w-3 h-3 mr-1" />
                              )}
                              {booking.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>Check-in: {booking.checkIn}</div>
                            <div>Check-out: {booking.checkOut}</div>
                            <div>Guests: {booking.guests}</div>
                          </div>
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 flex items-center">
                            <EyeIcon className="w-3 h-3 mr-1" />
                            View Details
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <UserGroupIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm">No bookings for this date</p>
                      <p className="text-xs text-gray-400 mt-1">All rooms are available</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">Click on a date to view bookings</p>
                  <p className="text-xs text-gray-400 mt-1">Color coding shows availability status</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              All Bookings - {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {getAllMonthBookings().length > 0 ? (
                getAllMonthBookings().map(booking => (
                  <div key={`${booking.id}-${booking.checkIn}`} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm font-medium text-gray-500 w-24">
                            {booking.displayDate.toDateString()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.guestName}</p>
                            <p className="text-sm text-gray-600">{booking.room} • {booking.guests} guests</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 flex space-x-4">
                      <span>Check-in: {booking.checkIn}</span>
                      <span>Check-out: {booking.checkOut}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <UserGroupIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-lg">No bookings for this month</p>
                  <p className="text-sm text-gray-400 mt-1">All dates are available for booking</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupancy</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <EyeIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}