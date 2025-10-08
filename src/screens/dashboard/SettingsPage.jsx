// screens/dashboard/SettingsPage.jsx
import React, { useState } from "react";
import {
  BuildingStorefrontIcon,
  CurrencyRupeeIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

const settingsSections = [
  {
    id: 'general',
    name: 'General Settings',
    icon: BuildingStorefrontIcon,
    description: 'Basic guest house information and settings'
  },
  {
    id: 'pricing',
    name: 'Pricing & Rooms',
    icon: CurrencyRupeeIcon,
    description: 'Room rates and pricing configuration'
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: BellIcon,
    description: 'Email and notification preferences'
  },
  {
    id: 'security',
    name: 'Security',
    icon: ShieldCheckIcon,
    description: 'Security and access control settings'
  },
  {
    id: 'profile',
    name: 'Profile',
    icon: UserIcon,
    description: 'Your account profile settings'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: GlobeAltIcon,
    description: 'Third-party integrations and API settings'
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    guestHouseName: 'ISKCON Ujjain Guest House',
    email: 'info@iskconujjain.com',
    phone: '+91 9424940422',
    address: '33-37, Hare Krishna Land, Bharatpuri, Ujjain, Madhya Pradesh, 456010',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    currency: 'INR',
    language: 'en',
    notifications: {
      email: true,
      sms: true,
      bookingConfirmation: true,
      bookingReminder: true
    }
  });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">General Information</h3>
              <p className="mt-1 text-sm text-gray-500">Basic information about your guest house.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="guestHouseName" className="block text-sm font-medium text-gray-700">
                  Guest House Name
                </label>
                <input
                  type="text"
                  id="guestHouseName"
                  value={settings.guestHouseName}
                  onChange={(e) => setSettings(prev => ({...prev, guestHouseName: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={settings.email}
                  onChange={(e) => setSettings(prev => ({...prev, email: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => setSettings(prev => ({...prev, phone: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700">
                  Check-in Time
                </label>
                <input
                  type="time"
                  id="checkInTime"
                  value={settings.checkInTime}
                  onChange={(e) => setSettings(prev => ({...prev, checkInTime: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700">
                  Check-out Time
                </label>
                <input
                  type="time"
                  id="checkOutTime"
                  value={settings.checkOutTime}
                  onChange={(e) => setSettings(prev => ({...prev, checkOutTime: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={settings.address}
                  onChange={(e) => setSettings(prev => ({...prev, address: e.target.value}))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-500">Configure how you receive notifications.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.email}
                  onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.sms}
                  onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Booking Confirmations</p>
                  <p className="text-sm text-gray-500">Send booking confirmation emails</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.bookingConfirmation}
                  onChange={(e) => handleInputChange('notifications', 'bookingConfirmation', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Booking Reminders</p>
                  <p className="text-sm text-gray-500">Send booking reminder notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications.bookingReminder}
                  onChange={(e) => handleInputChange('notifications', 'bookingReminder', e.target.checked)}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              {settingsSections.find(s => s.id === activeSection)?.icon && 
                React.createElement(settingsSections.find(s => s.id === activeSection).icon)
              }
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {settingsSections.find(s => s.id === activeSection)?.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This section is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your guest house configuration and preferences
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="lg:grid lg:grid-cols-12">
          {/* Settings sidebar */}
          <aside className="lg:col-span-4 border-r border-gray-200">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-6 py-4 flex items-center text-sm font-medium ${
                    activeSection === section.id
                      ? 'bg-orange-50 border-r-2 border-orange-600 text-orange-700'
                      : 'border-r-2 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <section.icon className={`mr-3 h-5 w-5 ${
                    activeSection === section.id ? 'text-orange-500' : 'text-gray-400'
                  }`} />
                  <div className="text-left">
                    <p className="font-medium">{section.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{section.description}</p>
                  </div>
                </button>
              ))}
            </nav>
          </aside>

          {/* Settings content */}
          <div className="lg:col-span-8">
            <div className="p-6">
              {renderSectionContent()}
              
              {/* Save button */}
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}