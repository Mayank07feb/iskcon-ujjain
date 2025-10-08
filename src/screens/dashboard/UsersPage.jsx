// screens/dashboard/UsersPage.jsx
import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

const users = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    role: 'Admin',
    status: 'Active',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-14'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    role: 'Manager',
    status: 'Active',
    joinDate: '2023-03-20',
    lastLogin: '2024-01-14'
  },
  {
    id: 3,
    name: 'Amit Patel',
    email: 'amit@example.com',
    phone: '+91 9876543212',
    role: 'Receptionist',
    status: 'Inactive',
    joinDate: '2023-06-10',
    lastLogin: '2024-01-10'
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    phone: '+91 9876543213',
    role: 'Receptionist',
    status: 'Active',
    joinDate: '2023-08-05',
    lastLogin: '2024-01-14'
  }
];

const roleStyles = {
  Admin: 'bg-purple-100 text-purple-800',
  Manager: 'bg-blue-100 text-blue-800',
  Receptionist: 'bg-green-100 text-green-800',
};

const statusStyles = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-red-100 text-red-800',
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
            User Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage staff accounts and permissions
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <UserPlusIcon className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-600 sm:text-sm sm:leading-6"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Receptionist">Receptionist</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              {/* User Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=orange&color=white`}
                    alt={user.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="text-gray-400 hover:text-gray-600">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  {user.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  Joined {user.joinDate}
                </div>
              </div>

              {/* Status and Role */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleStyles[user.role]}`}>
                  {user.role}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[user.status]}`}>
                  {user.status}
                </span>
              </div>

              {/* Last Login */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last login: {user.lastLogin}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UserPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}