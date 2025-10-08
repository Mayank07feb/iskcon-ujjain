// pages/BookingsPage.jsx
import { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const bookings = [
  {
    id: "BK001",
    guestName: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    roomType: "Deluxe AC",
    checkIn: "2024-01-15",
    checkOut: "2024-01-17",
    guests: 2,
    totalAmount: "₹3,000",
    status: "confirmed",
    bookingDate: "2024-01-10",
  },
  {
    id: "BK002",
    guestName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    roomType: "Standard Non-AC",
    checkIn: "2024-01-16",
    checkOut: "2024-01-18",
    guests: 2,
    totalAmount: "₹2,000",
    status: "pending",
    bookingDate: "2024-01-11",
  },
  {
    id: "BK003",
    guestName: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543212",
    roomType: "Dormitory",
    checkIn: "2024-01-14",
    checkOut: "2024-01-16",
    guests: 1,
    totalAmount: "₹1,500",
    status: "confirmed",
    bookingDate: "2024-01-09",
  },
  {
    id: "BK004",
    guestName: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 9876543213",
    roomType: "Deluxe AC",
    checkIn: "2024-01-17",
    checkOut: "2024-01-19",
    guests: 2,
    totalAmount: "₹3,000",
    status: "cancelled",
    bookingDate: "2024-01-12",
  },
];

const statusStyles = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all guest bookings and reservations
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button
            type="button"
            className="flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table for large screens / Cards for small */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Guest</th>
                <th className="px-6 py-3 text-left">Room Type</th>
                <th className="px-6 py-3 text-left">Dates</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.id}</div>
                    <div className="text-gray-500">{booking.bookingDate}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{booking.guestName}</div>
                    <div className="text-gray-500">{booking.email}</div>
                    <div className="text-gray-500">{booking.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{booking.roomType}</div>
                    <div className="text-gray-500">{booking.guests} guests</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>Check-in: {booking.checkIn}</div>
                    <div className="text-gray-500">Check-out: {booking.checkOut}</div>
                  </td>
                  <td className="px-6 py-4">{booking.totalAmount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-gray-200">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {booking.guestName}
                  </h3>
                  <p className="text-xs text-gray-500">{booking.email}</p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${statusStyles[booking.status]}`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <p>Booking ID: {booking.id}</p>
                <p>Room: {booking.roomType}</p>
                <p>
                  {booking.checkIn} → {booking.checkOut}
                </p>
                <p>Total: {booking.totalAmount}</p>
              </div>

              <div className="mt-3 flex space-x-3">
                <button className="text-blue-600 hover:text-blue-900">
                  <EyeIcon className="w-5 h-5" />
                </button>
                <button className="text-orange-600 hover:text-orange-900">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 text-sm">
        <p className="text-gray-700 mb-2 sm:mb-0">
          Showing <span className="font-medium">1</span>–<span className="font-medium">4</span> of{" "}
          <span className="font-medium">4</span> results
        </p>
        <div className="flex space-x-1 overflow-x-auto">
          <button className="px-3 py-1 border rounded-l-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border hover:bg-gray-50">1</button>
          <button className="px-3 py-1 border rounded-r-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
