// pages/DashboardHome.jsx
import { 
  CalendarIcon, 
  UserGroupIcon, 
  CurrencyRupeeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const stats = [
  { name: 'Total Bookings', value: '1,234', icon: CalendarIcon, change: '+12%', changeType: 'positive' },
  { name: 'Active Guests', value: '89', icon: UserGroupIcon, change: '+8%', changeType: 'positive' },
  { name: 'Revenue', value: '₹2,45,678', icon: CurrencyRupeeIcon, change: '+15%', changeType: 'positive' },
  { name: 'Occupancy Rate', value: '78%', icon: CheckCircleIcon, change: '+5%', changeType: 'positive' },
];

const recentBookings = [
  { id: 1, guest: 'Rajesh Kumar', room: 'Deluxe AC', checkIn: '2024-01-15', checkOut: '2024-01-17', status: 'Confirmed', amount: '₹3,000' },
  { id: 2, guest: 'Priya Sharma', room: 'Standard Non-AC', checkIn: '2024-01-16', checkOut: '2024-01-18', status: 'Pending', amount: '₹2,000' },
  { id: 3, guest: 'Amit Patel', room: 'Dormitory', checkIn: '2024-01-14', checkOut: '2024-01-16', status: 'Confirmed', amount: '₹1,500' },
  { id: 4, guest: 'Sneha Reddy', room: 'Deluxe AC', checkIn: '2024-01-17', checkOut: '2024-01-19', status: 'Cancelled', amount: '₹3,000' },
];

export default function DashboardHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Overview of your guest house operations and bookings
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              New Booking
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4 sm:p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-4 sm:ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-base sm:text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-5 sm:py-3">
                <div className="text-sm">
                  <span className={`font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>{' '}
                  <span className="text-gray-500">from last month</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Bookings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest guest bookings and their status</p>
          </div>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Guest
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden sm:table-cell">
                      Room
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
                      Dates
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden lg:table-cell">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1">
                          {booking.room}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1">
                          {booking.checkIn} to {booking.checkOut}
                        </div>
                        <div className="text-xs text-gray-500 sm:hidden mt-1 font-medium">
                          {booking.amount}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                        {booking.room}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                        {booking.checkIn} to {booking.checkOut}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {booking.status === 'Confirmed' && <CheckCircleIcon className="w-3 h-3 mr-1" />}
                          {booking.status === 'Pending' && <ClockIcon className="w-3 h-3 mr-1" />}
                          {booking.status === 'Cancelled' && <XCircleIcon className="w-3 h-3 mr-1" />}
                          <span className="hidden xs:inline">{booking.status}</span>
                          <span className="xs:hidden">
                            {booking.status === 'Confirmed' ? 'Conf' : 
                             booking.status === 'Pending' ? 'Pend' : 'Canc'}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                        {booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                </div>
                <div className="ml-4 sm:ml-5">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Guest Management</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage guest information and preferences</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-orange-600 hover:text-orange-500 text-sm font-medium">
                  View all guests →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                </div>
                <div className="ml-4 sm:ml-5">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Room Availability</h3>
                  <p className="mt-1 text-sm text-gray-500">Check and manage room availability</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-orange-600 hover:text-orange-500 text-sm font-medium">
                  Check availability →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyRupeeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
                </div>
                <div className="ml-4 sm:ml-5">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Financial Reports</h3>
                  <p className="mt-1 text-sm text-gray-500">View revenue and financial reports</p>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-orange-600 hover:text-orange-500 text-sm font-medium">
                  Generate reports →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}