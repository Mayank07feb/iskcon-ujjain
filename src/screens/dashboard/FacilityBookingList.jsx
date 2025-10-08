// pages/FacilityBookingList.jsx
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PrinterIcon,
  BanknotesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const bookings = [
  {
    id: 1,
    usageStartDate: "09-10-2025",
    facilityGroup: "OKRoom",
    facilityCode: "206",
    paymentId: "pay_ROgABRS",
    orderId: "order_ROgBgt",
    practitioner: "Ramakamb",
    phone: "Ta9102780599",
    usageEndDate: "11-10-2025",
    receiver: "12",
    receiverMedia: "Email=tsoafda",
    status: "BOOKED",
    issuedBy: "Guest House A",
    cost: "3500",
    comments: "",
    bookingFrom: "09-10-2025 12:00",
    bookingTill: "08-10-2025 11:00",
    bookingDate: "09-10-2025",
  },
  {
    id: 2,
    usageStartDate: "09-10-2025",
    facilityGroup: "OKRoom",
    facilityCode: "102",
    paymentId: "pay_ROgBh7v",
    orderId: "order_ROgHth",
    practitioner: "Deepak Bgbpr",
    phone: "9910206279",
    usageEndDate: "10-10-2025",
    receiver: "12",
    receiverMedia: "Email=deepak",
    status: "BOOKED",
    issuedBy: "Guest House A",
    cost: "999",
    comments: "Require for two",
    bookingFrom: "09-10-2025 12:00",
    bookingTill: "08-10-2025 10:00",
    bookingDate: "09-10-2025",
  },
  {
    id: 3,
    usageStartDate: "09-10-2025",
    facilityGroup: "OKRoom",
    facilityCode: "211",
    paymentId: "ONLINE",
    orderId: "order_ROgRpq",
    practitioner: "Deepak Bgbpr",
    phone: "9910206279",
    usageEndDate: "10-10-2025",
    receiver: "12",
    receiverMedia: "Email=deepak",
    status: "CANCELLED",
    issuedBy: "Guest House A",
    cost: "",
    comments: "Require for two",
    bookingFrom: "09-10-2025 12:00",
    bookingTill: "08-10-2025 10:00",
    bookingDate: "09-10-2025",
  },
  {
    id: 4,
    usageStartDate: "09-10-2025",
    facilityGroup: "OKRoom",
    facilityCode: "210",
    paymentId: "ONLINE",
    orderId: "order_ROgRfn",
    practitioner: "Deepak Bgbpr",
    phone: "9910206279",
    usageEndDate: "12-10-2025",
    receiver: "12",
    receiverMedia: "Email=deepak",
    status: "CANCELLED",
    issuedBy: "Guest House A",
    cost: "",
    comments: "Require for two",
    bookingFrom: "09-10-2025 12:00",
    bookingTill: "08-10-2025 10:00",
    bookingDate: "09-10-2025",
  },
  {
    id: 5,
    usageStartDate: "09-10-2025",
    facilityGroup: "OKRoom",
    facilityCode: "208",
    paymentId: "ONLINE",
    orderId: "order_ROgNtn",
    practitioner: "Vaka Rajapati",
    phone: "9356554111",
    usageEndDate: "10-10-2025",
    receiver: "12",
    receiverMedia: "Email=rajapati",
    status: "CANCELLED",
    issuedBy: "Guest House A",
    cost: "",
    comments: "",
    bookingFrom: "09-10-2025 12:00",
    bookingTill: "08-10-2025 09:00",
    bookingDate: "09-10-2025",
  },
];

export default function FacilityBookingList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(
    (b) =>
      b.practitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.facilityCode.includes(searchTerm) ||
      b.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Facility Booking List
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view all facility bookings
            </p>
          </div>
          <button className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            New Booking
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by practitioner, facility code, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 ring-1 ring-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-600 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select className="rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm">
                <option>All Status</option>
                <option>BOOKED</option>
                <option>CANCELLED</option>
              </select>
              <select className="rounded-md border-0 py-2 pl-3 pr-10 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm">
                <option>All Facilities</option>
                <option>OKRoom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table for Desktop */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
                <tr>
                  <th className="px-6 py-3 text-left">Start Date</th>
                  <th className="px-6 py-3 text-left">Facility</th>
                  <th className="px-6 py-3 text-left">Practitioner</th>
                  <th className="px-6 py-3 text-left">Contact</th>
                  <th className="px-6 py-3 text-left">End Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Cost</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {currentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {b.usageStartDate}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.facilityGroup}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        Room {b.facilityCode}
                      </div>
                      <div className="text-xs text-gray-500">{b.orderId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {b.practitioner}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.receiverMedia}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {b.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {b.usageEndDate}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {b.cost ? `₹${b.cost}` : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button className="text-orange-600 hover:text-orange-900">
                          <PrinterIcon className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <BanknotesIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <XCircleIcon className="w-4 h-4" />
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
            {currentBookings.map((b) => (
              <div key={b.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {b.practitioner}
                    </h3>
                    <p className="text-xs text-gray-500">{b.receiverMedia}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>Booking ID: {b.orderId}</p>
                  <p>
                    Facility: {b.facilityGroup} - {b.facilityCode}
                  </p>
                  <p>
                    {b.usageStartDate} → {b.usageEndDate}
                  </p>
                  <p>Cost: {b.cost ? `₹${b.cost}` : "-"}</p>
                  <p>Phone: {b.phone}</p>
                </div>
                <div className="mt-3 flex space-x-3">
                  <button className="text-orange-600 hover:text-orange-900">
                    <PrinterIcon className="w-5 h-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900">
                    <BanknotesIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 text-sm">
            <p className="text-gray-700 mb-2 sm:mb-0">
              Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, filteredBookings.length)}
              </span>{" "}
              of <span className="font-medium">{filteredBookings.length}</span>{" "}
              results
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-l-md hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-r-md hover:bg-gray-50 disabled:opacity-50"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Notes */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <DocumentTextIcon className="h-5 w-5 text-yellow-400 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">
                Action Notes
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                <strong>Return</strong> = Shift | <strong>Cancel</strong> = X |{" "}
                <strong>Print</strong> = Printer | <strong>Print Bill</strong> =
                Document | <strong>Pay</strong> = Banknotes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
