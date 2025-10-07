import { ChevronLeftIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

const roomDetails = {
    "Deluxe AC Room": {
        capacity: "Fits 2 Adults",
        features: ["AC", "WiFi", "TV", "Attached Bath"],
        image:
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=400&fit=crop",
        refundable: false,
        description:
            "Spacious room with modern amenities and air conditioning for ultimate comfort.",
        fullDescription:
            "Experience luxury and comfort in our Deluxe AC Room. Each room is thoughtfully designed with premium furnishings, modern air conditioning system, and all the amenities you need for a comfortable stay. The room features a private attached bathroom with hot water facility, high-speed WiFi, flat-screen TV with cable channels, and spacious wardrobes. Perfect for couples or small families.",
        amenities: [
            "Air Conditioning",
            "WiFi",
            "Flat-screen TV",
            "Attached Bathroom",
            "Hot Water",
            "Spacious Wardrobe",
            "Premium Bedding",
            "Reading Lamp",
            "Telephone",
        ],
        size: "350 sq ft",
        occupancy: "2 Adults",
    },
    "Standard Non-AC Room": {
        capacity: "Fits 2 Adults",
        features: ["Fan", "WiFi", "Clean", "Attached Bath"],
        image:
            "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&h=400&fit=crop",
        refundable: false,
        description:
            "Comfortable and affordable room for budget-conscious travelers.",
        fullDescription:
            "Our Standard Non-AC Rooms offer comfortable and budget-friendly accommodation without compromising on cleanliness and essential amenities. Each room is well-maintained with essential furniture, ceiling fan, private attached bathroom, and WiFi connectivity. These rooms are ideal for pilgrims seeking a simple, clean space for their spiritual journey.",
        amenities: [
            "Ceiling Fan",
            "WiFi",
            "Attached Bathroom",
            "Hot Water",
            "Basic Furniture",
            "Clean Bedding",
            "Reading Lamp",
            "Telephone",
        ],
        size: "250 sq ft",
        occupancy: "2 Adults",
    },
    Dormitory: {
        capacity: "Shared - 6-8 Beds",
        features: ["Shared", "Fan", "Lockers", "Economical"],
        image:
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=400&fit=crop",
        refundable: false,
        description:
            "Shared accommodation perfect for groups and spiritual gatherings.",
        fullDescription:
            "Our dormitory rooms are designed for groups, spiritual seekers, and budget travelers. Each dormitory accommodates 6-8 guests in a shared space with individual beds, personal lockers for valuables, common bathroom facilities, and ceiling fans. This option fosters community and is perfect for group pilgrimages and spiritual gatherings.",
        amenities: [
            "6-8 Shared Beds",
            "Personal Lockers",
            "Ceiling Fans",
            "Common Bathroom",
            "Hot Water",
            "Clean Environment",
            "Reading Area",
        ],
        size: "500 sq ft",
        occupancy: "6-8 Persons",
    },
};

export default function RoomDetails({ selectedRoom, onClose, onSelectRoom }) {
    if (!selectedRoom) return null;

    const details = roomDetails[selectedRoom];

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 p-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onClose}
                    className="mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-2 font-semibold"
                >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Back to Room Selection
                </button>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="h-96 overflow-hidden">
                        <img
                            src={details.image}
                            alt={selectedRoom}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="p-8 md:p-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                            {selectedRoom}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            {details.fullDescription}
                        </p>

                        <div className="grid md:grid-cols-3 gap-6 mb-10 p-6 bg-orange-50 rounded-2xl">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Room Size</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {details.size}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Occupancy</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {details.occupancy}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Refundable</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {details.refundable ? "Yes" : "Non-Refundable"}
                                </p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Amenities
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {details.amenities.map((amenity, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                                    >
                                        <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <span className="text-gray-700">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Features
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {details.features.map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-full"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                onClose();
                                onSelectRoom(selectedRoom);
                            }}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Select This Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}