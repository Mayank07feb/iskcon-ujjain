import React, { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyRupeeIcon,
  PencilIcon,
  XMarkIcon,
  TrashIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const API_URL = "http://localhost:5000/api/room-rates";
const ROOM_TYPES = ['Deluxe AC', 'Standard Non-AC', 'Dormitory'];

export default function RateCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [editingRates, setEditingRates] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ratesData, setRatesData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (d) => {
    const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const parseDate = (str) => {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const transformApiData = (arr) => {
    const data = {};
    arr.forEach(r => {
      if (!r?.rate_date) return;
      const key = formatDate(parseDate(r.rate_date));
      if (!data[key]) data[key] = { _ids: {} };
      const type = { DELUXE_AC: 'Deluxe AC', STANDARD_NON_AC: 'Standard Non-AC', DORMITORY: 'Dormitory' }[r.type];
      if (type) {
        data[key][type] = parseFloat(r.price);
        data[key]._ids[type] = r.id;
      }
    });
    return data;
  };

  const fetchRate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/room-rates`);
      if (!res.ok) throw new Error('Fetch failed');
      const { success, ratesMap } = await res.json();
      if (success && ratesMap) {
        setRatesData(ratesMap);
        // Auto-navigate to first date with data
        const dates = Object.keys(ratesMap);
        if (dates.length > 0) {
          const date = parseDate(dates[0]);
          setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
          setSelectedDate(date);
        }
      }
    } catch (err) {
      setError("Failed to fetch rate data");
    } finally {
      setLoading(false);
    }
  };

  const apiCall = async (method, endpoint, body) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body && { body: JSON.stringify(body) })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const result = await res.json();
    if (!result.success) throw new Error(result.message);
    return result;
  };

  const saveRates = async () => {
    if (!selectedDate || !editingRates) return;
    try {
      setLoading(true);
      const currentRates = getRatesForDate(selectedDate);
      const dateStr = formatDate(selectedDate);
      
      // Map room types to rate_type_id (from your database)
      const typeToId = {
        'Deluxe AC': 10,        // DELUXE_AC
        'Standard Non-AC': 11,  // STANDARD_NON_AC
        'Dormitory': 12         // DORMITORY
      };
      
      // Update or create each room type separately
      const promises = ROOM_TYPES.map(async (roomType) => {
        const rateId = currentRates._ids[roomType];
        const payload = {
          rate_type_id: typeToId[roomType],
          rate_date: dateStr,
          price: editingRates[roomType] || 0
        };
        
        if (rateId) {
          // Update existing rate
          return apiCall('PUT', `/room-rates/${rateId}`, payload);
        } else {
          // Create new rate
          return apiCall('POST', '/room-rates', payload);
        }
      });
      
      await Promise.all(promises);
      await fetchRate();
      setEditingRates(null);
      alert('Rates updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      alert('Failed to update rates: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteRates = async () => {
    if (!selectedDate || !confirm('Delete all rates for this date?')) return;
    try {
      setLoading(true);
      const currentRates = getRatesForDate(selectedDate);
      
      // Delete all room types for this date
      const deletePromises = ROOM_TYPES.map(async (roomType) => {
        const rateId = currentRates._ids[roomType];
        if (rateId) {
          return apiCall('DELETE', `/room-rates/${rateId}`);
        }
      });
      
      await Promise.all(deletePromises.filter(p => p));
      await fetchRate();
      setSelectedDate(null);
      setEditingRates(null);
      alert('Rates deleted successfully!');
    } catch (err) {
      alert('Failed to delete rates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRate(); }, []);

  const getRatesForDate = (d) => {
    const key = formatDate(d);
    const dayRates = ratesData[key];
    const rates = { _ids: {} };
    
    if (dayRates) {
      ROOM_TYPES.forEach(t => {
        const typeKey = { 'Deluxe AC': 'DELUXE_AC', 'Standard Non-AC': 'STANDARD_NON_AC', 'Dormitory': 'DORMITORY' }[t];
        if (dayRates[typeKey]) {
          rates[t] = dayRates[typeKey].price || 0;
          rates._ids[t] = dayRates[typeKey].id || null;
        } else {
          rates[t] = 0;
        }
      });
    } else {
      ROOM_TYPES.forEach(t => { rates[t] = 0; });
    }
    
    return rates;
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const cal = [];
    const prevDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    
    for (let i = firstDay - 1; i >= 0; i--) 
      cal.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, prevDays - i), isCurrentMonth: false });
    for (let d = 1; d <= daysInMonth; d++) 
      cal.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth(), d), isCurrentMonth: true });
    for (let d = 1; d <= 42 - cal.length; d++) 
      cal.push({ date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, d), isCurrentMonth: false });
    return cal;
  };

  const hasApiData = (d) => {
    const key = formatDate(d);
    const dayRates = ratesData[key];
    if (!dayRates) return false;
    return Object.keys(dayRates).some(k => k !== '_ids' && dayRates[k]?.id);
  };

  const isSpecialRate = (d) => Object.values(getRatesForDate(d)).some(r => r > 0);

  const handleDateClick = (d) => {
    setSelectedDate(d);
    setEditingRates(null);
  };

  const currentYear = new Date().getFullYear();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Rate Calendar</h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">Manage room rates and pricing</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button onClick={fetchRate} disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50">
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
          <button className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <CurrencyRupeeIcon className="w-4 h-4 mr-2" />Bulk Update Rates
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 text-sm">{error}</div>
            <button onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <button onClick={() => setCurrentDate(p => new Date(p.getFullYear(), p.getMonth() - 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeftIcon className="w-5 h-5" /></button>
              <button onClick={() => setShowDatePicker(!showDatePicker)} className="px-3 py-2 hover:bg-gray-100 rounded-lg">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
              </button>
              <button onClick={() => setCurrentDate(p => new Date(p.getFullYear(), p.getMonth() + 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRightIcon className="w-5 h-5" /></button>
            </div>

            {showDatePicker && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Month</label>
                    <select value={currentDate.getMonth()} onChange={(e) => { setCurrentDate(new Date(currentDate.getFullYear(), +e.target.value, 1)); setShowDatePicker(false); }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm">
                      {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">Year</label>
                    <select value={currentDate.getFullYear()} onChange={(e) => { setCurrentDate(new Date(+e.target.value, currentDate.getMonth(), 1)); setShowDatePicker(false); }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm">
                      {Array.from({ length: 11 }, (_, i) => currentYear - 5 + i).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button onClick={() => { const t = new Date(); setCurrentDate(t); setSelectedDate(t); setShowDatePicker(false); }}
                    className="px-4 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg">Today</button>
                  <button onClick={() => setShowDatePicker(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 bg-gray-100 rounded-lg">Close</button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading rates...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-2 sm:mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                    <div key={d} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-1 sm:py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                  {generateCalendar().map(({ date, isCurrentMonth }, i) => {
                    const rates = getRatesForDate(date);
                    const hasData = hasApiData(date);
                    const isSelected = selectedDate && formatDate(date) === formatDate(selectedDate);
                    const isToday = formatDate(date) === formatDate(new Date());
                    return (
                      <button key={i} onClick={() => handleDateClick(date)} disabled={loading}
                        className={`min-h-16 sm:min-h-20 md:min-h-24 p-1 sm:p-2 border-2 rounded sm:rounded-lg text-left transition-all
                          ${!isCurrentMonth ? 'text-gray-400 bg-gray-50 border-gray-100' : 'text-gray-900'}
                          ${isToday ? 'ring-2 ring-orange-500 ring-inset' : ''}
                          ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                          ${isSpecialRate(date) ? 'bg-purple-50 border-purple-300' : 'bg-white'}
                          ${hasData ? 'border-green-500 bg-green-50' : ''}
                          hover:shadow-md active:scale-95 disabled:opacity-50`}>
                        <div className="flex justify-between items-start mb-0.5 sm:mb-1">
                          <span className={`text-xs sm:text-sm font-medium ${isToday ? 'text-orange-600' : hasData ? 'text-green-700 font-bold' : ''}`}>
                            {date.getDate()}{hasData && " ★"}
                          </span>
                          <div className="flex items-center gap-1">
                            {hasData && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                            {isSpecialRate(date) && <CurrencyRupeeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />}
                          </div>
                        </div>
                        {isCurrentMonth && (
                          <div className="space-y-0.5 sm:space-y-1 hidden sm:block">
                            {ROOM_TYPES.map(t => (
                              <div key={t} className="flex justify-between text-[10px] sm:text-xs">
                                <span className="text-gray-600 truncate">{t.split(' ')[0]}</span>
                                <span className={`font-medium ${hasData ? 'text-green-600 font-bold' : ''}`}>₹{rates[t] || 0}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:block bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate ? `Rates for ${selectedDate.toDateString()}` : 'Select a Date'}
              </h3>
              {selectedDate && hasApiData(selectedDate) && !editingRates && (
                <button onClick={deleteRates} disabled={loading}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50">
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            {selectedDate && hasApiData(selectedDate) && (
              <div className="mt-1 text-sm text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>Real API Data Loaded
              </div>
            )}
          </div>
          
          <div className="p-6">
            {selectedDate ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Data Source:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${hasApiData(selectedDate) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {hasApiData(selectedDate) ? 'Real API Data' : 'No Data'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Rate Type:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${isSpecialRate(selectedDate) ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {isSpecialRate(selectedDate) ? 'Special Rate' : 'Standard Rate'}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">Room Rates:</h4>
                    {!editingRates && (
                      <button onClick={() => setEditingRates(getRatesForDate(selectedDate))}
                        className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                        {hasApiData(selectedDate) ? <><PencilIcon className="w-4 h-4" />Edit</> : <><PlusIcon className="w-4 h-4" />Create Rates</>}
                      </button>
                    )}
                  </div>
                  {ROOM_TYPES.map(t => {
                    const rates = editingRates || getRatesForDate(selectedDate);
                    const isApiData = hasApiData(selectedDate);
                    return (
                      <div key={t} className={`flex items-center justify-between p-3 border rounded-lg ${isApiData ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                        <span className="text-sm font-medium text-gray-700">{t}</span>
                        <div className="flex items-center space-x-2">
                          {editingRates ? (
                            <input type="number" value={rates[t] || 0} onChange={(e) => setEditingRates(p => ({ ...p, [t]: +e.target.value || 0 }))}
                              className="w-20 px-2 py-1 border rounded text-sm" min="0" />
                          ) : (
                            <span className={`text-sm font-semibold ${isApiData ? 'text-green-600' : 'text-gray-600'}`}>₹{rates[t] || 0}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {editingRates && (
                  <div className="flex space-x-2 pt-4">
                    <button onClick={() => setEditingRates(null)} className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button onClick={saveRates} disabled={loading} className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50">
                      {loading ? "Saving..." : (hasApiData(selectedDate) ? "Save Changes" : "Create Rates")}
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
      </div>
    </div>
  );
}