import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  PrinterIcon,
  BanknotesIcon,
  XCircleIcon,
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  HomeIcon,
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
  const [showModal, setShowModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    practitioner: "",
    phone: "",
    email: "",
    facilityGroup: "OKRoom",
    facilityCode: "",
    usageStartDate: "",
    usageEndDate: "",
    comments: ""
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = () => {
    console.log("New booking:", newBooking);
    setShowModal(false);
    setNewBooking({
      practitioner: "",
      phone: "",
      email: "",
      facilityGroup: "OKRoom",
      facilityCode: "",
      usageStartDate: "",
      usageEndDate: "",
      comments: ""
    });
    alert("Booking created successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Facility Booking List
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Manage and view all facility bookings
            </p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 touch-manipulation"
          >
            <DocumentTextIcon className="w-4 h-4 mr-2" />
            New Booking
          </button>
        </div>

        {/* Search & Filters */}
        <div className="bg-white shadow rounded-lg p-3 sm:p-4 overflow-visible">
          <div className="flex flex-col gap-3">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by practitioner, facility, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-0 py-2 pl-10 pr-3 ring-1 ring-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-600 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <select className="w-full rounded-md border-0 py-2 pl-3 pr-8 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm appearance-none bg-white">
                  <option>All Status</option>
                  <option>BOOKED</option>
                  <option>CANCELLED</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 relative">
                <select className="w-full rounded-md border-0 py-2 pl-3 pr-8 ring-1 ring-gray-300 focus:ring-2 focus:ring-orange-600 text-sm appearance-none bg-white">
                  <option>All Facilities</option>
                  <option>OKRoom</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
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
              <div key={b.id} className="p-3 sm:p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {b.practitioner}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{b.receiverMedia}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2 ${getStatusColor(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                  <div>
                    <span className="text-gray-500">Order ID:</span>
                    <p className="font-medium text-gray-900 truncate">{b.orderId}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Facility:</span>
                    <p className="font-medium text-gray-900">{b.facilityGroup} - {b.facilityCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-in:</span>
                    <p className="font-medium text-gray-900">{b.usageStartDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Check-out:</span>
                    <p className="font-medium text-gray-900">{b.usageEndDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium text-gray-900">{b.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Cost:</span>
                    <p className="font-medium text-gray-900">{b.cost ? `₹${b.cost}` : "-"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-2 border-t border-gray-100">
                  <button className="text-orange-600 hover:text-orange-900 touch-manipulation p-1">
                    <PrinterIcon className="w-5 h-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 touch-manipulation p-1">
                    <BanknotesIcon className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 touch-manipulation p-1">
                    <XCircleIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 gap-3">
            <p className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
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
                className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <span className="text-xs sm:text-sm font-medium text-gray-700 px-2">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-2 sm:space-x-3">
            <DocumentTextIcon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-yellow-800">
                Action Notes
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-yellow-700">
                <span className="block sm:inline"><strong>Print</strong> = Printer</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline"><strong>Pay</strong> = Banknotes</span>
                <span className="hidden sm:inline"> | </span>
                <span className="block sm:inline"><strong>Cancel</strong> = X</span>
              </p>
            </div>
          </div>
        </div>

        {/* New Booking Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="w-6 h-6 text-orange-600 mr-2" />
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">New Facility Booking</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg touch-manipulation"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-4 sm:px-6 py-4 sm:py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Practitioner Name */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Practitioner Name *
                    </label>
                    <input
                      type="text"
                      name="practitioner"
                      value={newBooking.practitioner}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter practitioner name"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newBooking.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <EnvelopeIcon className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newBooking.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter email address"
                      required
                    />
                  </div>

                  {/* Facility Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <HomeIcon className="w-4 h-4 inline mr-1" />
                      Facility Group *
                    </label>
                    <select
                      name="facilityGroup"
                      value={newBooking.facilityGroup}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="OKRoom">OKRoom</option>
                      <option value="Conference Hall">Conference Hall</option>
                      <option value="Meeting Room">Meeting Room</option>
                    </select>
                  </div>

                  {/* Facility Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facility Code *
                    </label>
                    <input
                      type="text"
                      name="facilityCode"
                      value={newBooking.facilityCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 206"
                      required
                    />
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="usageStartDate"
                      value={newBooking.usageStartDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="usageEndDate"
                      value={newBooking.usageEndDate}
                      onChange={handleInputChange}
                      min={newBooking.usageStartDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Comments */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments
                    </label>
                    <textarea
                      name="comments"
                      value={newBooking.comments}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Any special requirements or notes..."
                    />
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitBooking}
                  className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 font-medium text-sm touch-manipulation"
                >
                  Create Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}