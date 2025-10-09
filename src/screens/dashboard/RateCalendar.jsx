import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyRupeeIcon,
  PencilIcon,
  XMarkIcon
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
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const prevMonthDays = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevMonthDays - i);
      calendar.push({ date, isCurrentMonth: false });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      calendar.push({ date, isCurrentMonth: true });
    }

    const totalCells = 42;
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
    
    setEditingRates(prev => ({
      ...prev,
      [roomType]: parseInt(newRate) || 0
    }));
  };

  const saveRates = () => {
    if (!selectedDate || !editingRates) return;
    
    console.log('Saving rates for', formatDate(selectedDate), editingRates);
    setEditingRates(null);
    alert('Rates updated successfully!');
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingRates(null);
    setShowMobileDetails(true);
  };

  const handleMonthYearChange = (year, month) => {
    setCurrentDate(new Date(year, month, 1));
    setShowDatePicker(false);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
    setShowDatePicker(false);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);
  const monthOptions = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-7 text-gray-900">
            Rate Calendar
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Manage room rates and pricing
          </p>
        </div>
        <div className="sm:mt-0">
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-500 touch-manipulation"
          >
            <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
            Bulk Update Rates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation"
                aria-label="Previous month"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
              </button>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation"
                aria-label="Next month"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Date Picker Dropdown */}
            {showDatePicker && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Month
                    </label>
                    <select
                      value={currentDate.getMonth()}
                      onChange={(e) => handleMonthYearChange(currentDate.getFullYear(), parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      {monthOptions.map((month, index) => (
                        <option key={index} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Year
                    </label>
                    <select
                      value={currentDate.getFullYear()}
                      onChange={(e) => handleMonthYearChange(parseInt(e.target.value), currentDate.getMonth())}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleTodayClick}
                    className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setShowDatePicker(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {generateCalendar().map(({ date, isCurrentMonth }, index) => {
                const rates = getRatesForDate(date);
                const hasSpecialRate = isSpecialRate(date);
                const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
                const isToday = formatDate(date) === formatDate(new Date());

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`
                      min-h-16 sm:min-h-20 md:min-h-24 p-1 sm:p-2 border rounded sm:rounded-lg text-left transition-all duration-200 touch-manipulation
                      ${!isCurrentMonth ? 'text-gray-400 bg-gray-50' : 'text-gray-900'}
                      ${isToday ? 'ring-1 sm:ring-2 ring-orange-500 ring-inset' : ''}
                      ${isSelected ? 'ring-1 sm:ring-2 ring-blue-500 bg-blue-50' : ''}
                      ${hasSpecialRate ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}
                      hover:shadow-md active:scale-95
                    `}
                  >
                    <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                      <span className={`text-xs sm:text-sm font-medium ${
                        isToday ? 'text-orange-600' : ''
                      }`}>
                        {date.getDate()}
                      </span>
                      {hasSpecialRate && (
                        <CurrencyRupeeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                      )}
                    </div>
                    
                    {isCurrentMonth && (
                      <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                        {roomTypes.map(roomType => (
                          <div key={roomType} className="flex justify-between text-[10px] sm:text-xs">
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

        {/* Rate Details - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg shadow">
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
                              if (!isEditing) {
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
                <p className="text-sm">Click on a date to view and edit rates</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Sheet for Rate Details */}
        {showMobileDetails && selectedDate && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedDate.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    isSpecialRate(selectedDate) 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {isSpecialRate(selectedDate) ? 'Special Rate' : 'Standard Rate'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowMobileDetails(false);
                    setEditingRates(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 space-y-4">
                <h4 className="font-medium text-gray-900">Room Rates:</h4>
                <div className="space-y-3">
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
                              if (!isEditing) {
                                setEditingRates(getRatesForDate(selectedDate));
                              }
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 touch-manipulation"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {editingRates && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <button
                      onClick={() => setEditingRates(null)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium touch-manipulation"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        saveRates();
                        setShowMobileDetails(false);
                      }}
                      className="flex-1 px-4 py-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium touch-manipulation"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h4 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Calendar Legend</h4>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border border-gray-200 rounded mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Standard Rates</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-purple-50 border border-purple-200 rounded mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Special Rates</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 ring-2 ring-orange-500 rounded mr-2"></div>
            <span className="text-xs sm:text-sm text-gray-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}