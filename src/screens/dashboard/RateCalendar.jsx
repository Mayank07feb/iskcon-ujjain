// screens/dashboard/RateCalendar.jsx
import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyRupeeIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

const sampleRates = {
  '2024-01-15': { 'Deluxe AC': 500, 'Standard Non-AC': 400, 'Dormitory': 200 },
  '2024-01-16': { 'Deluxe AC': 500, 'Standard Non-AC': 400, 'Dormitory': 200 },
  '2024-01-20': { 'Deluxe AC': 600, 'Standard Non-AC': 450, 'Dormitory': 250 },
  '2024-01-25': { 'Deluxe AC': 700, 'Standard Non-AC': 500, 'Dormitory': 300 },
};

const roomTypes = ['Deluxe AC', 'Standard Non-AC', 'Dormitory'];

export default function RateCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingRates, setEditingRates] = useState(null);

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

  const getRatesForDate = (date) => {
    return sampleRates[formatDate(date)] || {
      'Deluxe AC': 500,
      'Standard Non-AC': 400,
      'Dormitory': 200
    };
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

  const isSpecialRate = (date) => {
    const rates = getRatesForDate(date);
    return Object.values(rates).some(rate => rate !== 500 && rate !== 400 && rate !== 200);
  };

  const handleRateChange = (roomType, newRate) => {
    if (!selectedDate) return;
    
    const dateKey = formatDate(selectedDate);
    setEditingRates(prev => ({
      ...prev,
      [roomType]: parseInt(newRate) || 0
    }));
  };

  const saveRates = () => {
    if (!selectedDate || !editingRates) return;
    
    // In a real app, you would save to your backend here
    console.log('Saving rates for', formatDate(selectedDate), editingRates);
    setEditingRates(null);
    alert('Rates updated successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Rate Calendar
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage room rates and pricing for different dates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
            Bulk Update Rates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
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

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendar().map(({ date, isCurrentMonth }, index) => {
                const rates = getRatesForDate(date);
                const hasSpecialRate = isSpecialRate(date);
                const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
                const isToday = formatDate(date) === formatDate(new Date());

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDate(date);
                      setEditingRates(null);
                    }}
                    className={`
                      min-h-24 p-2 border rounded-lg text-left transition-all duration-200
                      ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
                      ${isToday ? 'ring-2 ring-orange-500 ring-inset' : ''}
                      ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                      ${hasSpecialRate ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}
                      hover:shadow-md
                    `}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-sm font-medium ${
                        isToday ? 'text-orange-600' : ''
                      }`}>
                        {date.getDate()}
                      </span>
                      {hasSpecialRate && (
                        <CurrencyRupeeIcon className="w-4 h-4 text-purple-600" />
                      )}
                    </div>
                    
                    {isCurrentMonth && (
                      <div className="space-y-1">
                        {roomTypes.map(roomType => (
                          <div key={roomType} className="flex justify-between text-xs">
                            <span className="text-gray-600 truncate">{roomType.split(' ')[0]}</span>
                            <span className="font-medium">₹{rates[roomType]}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rate Details */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate ? `Rates for ${selectedDate.toDateString()}` : 'Select a Date'}
            </h3>
          </div>
          
          <div className="p-6">
            {selectedDate ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Rate Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isSpecialRate(selectedDate) 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {isSpecialRate(selectedDate) ? 'Special Rate' : 'Standard Rate'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Room Rates:</h4>
                  {roomTypes.map(roomType => {
                    const currentRates = editingRates || getRatesForDate(selectedDate);
                    const isEditing = editingRates !== null;

                    return (
                      <div key={roomType} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{roomType}</span>
                        <div className="flex items-center space-x-2">
                          {isEditing ? (
                            <input
                              type="number"
                              value={currentRates[roomType]}
                              onChange={(e) => handleRateChange(roomType, e.target.value)}
                              className="w-20 px-2 py-1 border rounded text-sm"
                              min="0"
                            />
                          ) : (
                            <span className="text-sm font-semibold">₹{currentRates[roomType]}</span>
                          )}
                          <button
                            onClick={() => {
                              if (isEditing) {
                                // Already editing, do nothing
                              } else {
                                setEditingRates(getRatesForDate(selectedDate));
                              }
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {editingRates && (
                  <div className="flex space-x-2 pt-4">
                    <button
                      onClick={() => setEditingRates(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveRates}
                      className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CurrencyRupeeIcon className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p>Click on a date to view and edit rates</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="font-medium text-gray-900 mb-4">Calendar Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white border border-gray-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Standard Rates</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-50 border border-purple-200 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Special Rates</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 ring-2 ring-orange-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}