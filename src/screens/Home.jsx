import { useState, useEffect } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  XMarkIcon,
  HomeIcon,
  PhoneIcon,
  ClockIcon,
  GiftIcon,
  UsersIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [bookingStep, setBookingStep] = useState(1);
  const [patronStatus, setPatronStatus] = useState("");
  const [selectedDates, setSelectedDates] = useState({
    checkin: "",
    checkout: "",
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    roomType: "",
    aadhaar: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [errorModal, setErrorModal] = useState({
    show: false,
    message: "",
    title: "",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=600&fit=crop",
  ];

  // Room images for lightbox
  const roomImages = {
    "Deluxe AC Room": [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"
    ],
    "Standard Non-AC Room": [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=800&h=600&fit=crop"
    ],
    "Dormitory": [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop"
    ]
  };

  const roomAvailability = {
    "2025-10-06": [
      { type: "Deluxe AC Room", available: 3, price: 500 },
      { type: "Standard Non-AC Room", available: 5, price: 500 },
      { type: "Dormitory", available: 2, price: 500 },
    ],
    "2025-10-07": [
      { type: "Deluxe AC Room", available: 2, price: 500 },
      { type: "Standard Non-AC Room", available: 4, price: 500 },
      { type: "Dormitory", available: 3, price: 500 },
    ],
    "2025-10-08": [
      { type: "Deluxe AC Room", available: 4, price: 500 },
      { type: "Standard Non-AC Room", available: 6, price: 500 },
      { type: "Dormitory", available: 1, price: 500 },
    ],
    "2025-10-09": [
      { type: "Deluxe AC Room", available: 1, price: 500 },
      { type: "Standard Non-AC Room", available: 3, price: 500 },
      { type: "Dormitory", available: 2, price: 500 },
    ],
  };

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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroImages.length]);

  // Add keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  // Lightbox navigation functions
  const nextImage = () => {
    if (selectedRoomDetails) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % roomImages[selectedRoomDetails].length
      );
    }
  };

  const prevImage = () => {
    if (selectedRoomDetails) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + roomImages[selectedRoomDetails].length) % roomImages[selectedRoomDetails].length
      );
    }
  };

  const openLightbox = (index = 0) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const handlePatronSelect = (status) => {
    setPatronStatus(status);
    setBookingStep(2);
  };

  const handleDateSelection = () => {
    if (!selectedDates.checkin || !selectedDates.checkout) {
      setErrorModal({
        show: true,
        title: "Missing Dates",
        message: "Please select both check-in and check-out dates to proceed.",
      });
      return;
    }

    const checkinDate = new Date(selectedDates.checkin);
    const checkoutDate = new Date(selectedDates.checkout);

    if (checkoutDate <= checkinDate) {
      setErrorModal({
        show: true,
        title: "Invalid Dates",
        message:
          "Check-out date must be after check-in date. Please select valid dates.",
      });
      return;
    }

    const checkinKey = selectedDates.checkin;
    const checkoutKey = selectedDates.checkout;

    if (roomAvailability[checkinKey] && roomAvailability[checkoutKey]) {
      setAvailableRooms(roomAvailability[checkinKey]);
      setBookingStep(3);
    } else {
      setErrorModal({
        show: true,
        title: "No Availability",
        message:
          "Sorry, rooms are not available for the selected dates. Please choose from: October 6-9, 2025",
      });
    }
  };

  const handleRoomSelect = (roomType) => {
    setFormData((prev) => ({ ...prev, roomType }));
    setBookingStep(4);
  };

  const handleSeeDetails = (roomType) => {
    setSelectedRoomDetails(roomType);
  };

  const closeRoomDetails = () => {
    setSelectedRoomDetails(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    const basePrice = patronStatus === "yes" ? 300 : 500;
    const checkinDate = new Date(selectedDates.checkin);
    const checkoutDate = new Date(selectedDates.checkout);
    const nights = Math.ceil(
      (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
    );
    const guests = formData.guests || 1;
    return basePrice * nights * guests;
  };

  const calculateNights = () => {
    if (!selectedDates.checkin || !selectedDates.checkout) return 0;
    const checkinDate = new Date(selectedDates.checkin);
    const checkoutDate = new Date(selectedDates.checkout);
    return Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setBookingStep(1);
    setPatronStatus("");
    setSelectedDates({ checkin: "", checkout: "" });
    setAvailableRooms([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: 1,
      roomType: "",
      aadhaar: "",
    });
  };

  const resetBooking = () => {
    setBookingStep(1);
    setPatronStatus("");
    setSelectedDates({ checkin: "", checkout: "" });
    setAvailableRooms([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: 1,
      roomType: "",
      aadhaar: "",
    });
  };

  const patronBenefits = [
    {
      icon: CheckCircleIcon,
      color: "text-green-600",
      text: "Personalized hologram Patronship card with your photo and patron number",
    },
    {
      icon: HomeIcon,
      color: "text-blue-600",
      text: "Annual stay of up to 3 days at participating official ISKCON guest houses worldwide",
    },
    {
      icon: UsersIcon,
      color: "text-purple-600",
      text: "Stay includes patron, spouse, children under 18, and dependent parents over 60",
    },
    {
      icon: ClockIcon,
      color: "text-red-600",
      text: "All stays require advance reservation and are subject to room availability",
    },
    {
      icon: GiftIcon,
      color: "text-pink-600",
      text: "Free prasadam (sanctified meals) twice daily for up to three days per year at any ISKCON temple",
    },
  ];

  // Lightbox Component
  const Lightbox = () => {
    if (!lightboxOpen || !selectedRoomDetails) return null;

    const images = roomImages[selectedRoomDetails];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-2 sm:p-4">
        <button
          onClick={closeLightbox}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 sm:p-3 text-white hover:text-orange-400 transition-colors bg-black/50 rounded-full"
        >
          <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        <button
          onClick={prevImage}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
        >
          <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 sm:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all"
        >
          <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="relative max-w-4xl lg:max-w-6xl max-h-full w-full h-full flex items-center justify-center">
          <img
            src={images[currentImageIndex]}
            alt={`${selectedRoomDetails} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentImageIndex
                  ? "bg-orange-500"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white text-xs sm:text-sm">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>
    );
  };

  // Room Details Modal Page
  if (selectedRoomDetails) {
    const details = roomDetails[selectedRoomDetails];
    const images = roomImages[selectedRoomDetails];

    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 p-3 sm:p-4">
        <Lightbox />
        
        <div className="max-w-6xl mx-auto">
          <button
            onClick={closeRoomDetails}
            className="mb-4 sm:mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-2 font-semibold text-sm sm:text-base"
          >
            <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Room Selection
          </button>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden">
            {/* Main Image Section */}
            <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden group">
              <img
                src={details.image}
                alt={selectedRoomDetails}
                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                onClick={() => openLightbox(0)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
                    <p className="font-semibold text-sm sm:text-base">Click to view gallery</p>
                    <p className="text-xs sm:text-sm">{images.length} images available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Room Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={img}
                      alt={`${selectedRoomDetails} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                {selectedRoomDetails}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                {details.fullDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 p-4 sm:p-6 bg-orange-50 rounded-xl sm:rounded-2xl">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600 mb-1 sm:mb-2">Room Size</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600">
                    {details.size}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600 mb-1 sm:mb-2">Occupancy</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600">
                    {details.occupancy}
                  </p>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-600 mb-1 sm:mb-2">Refundable</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600">
                    {details.refundable ? "Yes" : "Non-Refundable"}
                  </p>
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {details.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                  Features
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {details.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-100 text-orange-700 font-semibold rounded-full text-sm sm:text-base"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  closeRoomDetails();
                  setFormData((prev) => ({
                    ...prev,
                    roomType: selectedRoomDetails,
                  }));
                  setBookingStep(4);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
              >
                Select This Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50">
      <Lightbox />
      
      {/* Error Modal */}
      {errorModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg mx-2 sm:mx-4 p-4 sm:p-5 md:p-6 transform animate-scale-in relative">
            {/* Close Button */}
            <button
              onClick={() =>
                setErrorModal({ show: false, message: "", title: "" })
              }
              className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="text-center">
              {/* Room Icon with Brand Colors */}
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <HomeIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                {errorModal.title}
              </h3>

              <p className="text-gray-600 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed">
                {errorModal.message}
              </p>

              <button
                onClick={() =>
                  setErrorModal({ show: false, message: "", title: "" })
                }
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-xl mx-2 sm:mx-4 p-4 sm:p-5 md:p-6 transform animate-scale-in">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <CheckCircleIcon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-600" />
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h3>

              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">
                Thank you for your booking request. We've received your details.
              </p>

              <div className="bg-orange-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-left shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-2 text-center text-sm sm:text-base">
                  Booking Summary
                </h4>
                <div className="space-y-1 text-xs sm:text-sm">
                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Guest:</span>
                    <span className="font-medium text-gray-800">
                      {formData.name}
                    </span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium text-gray-800">
                      {formData.roomType}
                    </span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Check-in:</span>
                    <span className="font-medium text-gray-800">
                      {selectedDates.checkin}
                    </span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Check-out:</span>
                    <span className="font-medium text-gray-800">
                      {selectedDates.checkout}
                    </span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Guests:</span>
                    <span className="font-medium text-gray-800">
                      {formData.guests}
                    </span>
                  </div>

                  <div className="flex justify-between flex-wrap">
                    <span className="text-gray-600">Aadhaar ID:</span>
                    <span className="font-medium text-gray-800">
                      {formData.aadhaar}
                    </span>
                  </div>

                  <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between items-center">
                    <span className="text-gray-600 text-xs sm:text-sm">Total:</span>
                    <span className="text-base sm:text-lg font-bold text-orange-500">
                      ₹{calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-2 sm:p-3 md:p-4 mb-3 sm:mb-4 text-left sm:text-center">
                <p className="text-xs sm:text-sm text-blue-800 space-y-1">
                  <strong className="block mb-1 text-sm sm:text-base">We'll contact you at:</strong>
                  <span className="flex sm:justify-center items-center gap-1 sm:gap-2">
                    <PhoneIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    {formData.phone}
                  </span>
                  <span className="flex sm:justify-center items-center gap-1 sm:gap-2">
                    <HomeIcon className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    {formData.email}
                  </span>
                </p>
              </div>

              <button
                onClick={closeSuccessModal}
                className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
              >
                <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section Slider */}
      <header className="relative w-full h-screen max-h-[500px] sm:max-h-[600px] md:max-h-[700px] overflow-hidden">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt={`Hero Slide ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 z-10">
          <div className="w-full max-w-4xl">
            <div className="inline-block mb-3 sm:mb-4 px-4 py-1 sm:px-6 sm:py-2 bg-orange-500/20 backdrop-blur-sm border border-orange-400/30 rounded-full">
              <p className="text-orange-100 text-xs sm:text-sm font-medium tracking-wide">
                Sacred Hospitality
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              ISKCON Ujjain
              <br />
              <span className="text-orange-400">Guest House</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 text-gray-200 leading-relaxed px-2">
              Experience divine peace and comfort near the sacred temple
            </p>
            <a
              href="#booking"
              className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              Book Your Stay
            </a>
          </div>
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 md:left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20"
        >
          <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 md:right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-2 sm:p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20"
        >
          <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
        </button>

        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-6 h-1.5 sm:w-8 sm:h-2 md:w-12 md:h-3 bg-orange-500"
                  : "w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </header>

      <main>
        {/* Booking Form */}
        <section
          id="booking"
          className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Book Your Stay
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Complete the steps below to reserve your room
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8 sm:mb-10 md:mb-12 flex justify-center items-center gap-2 sm:gap-3 md:gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold transition-all text-sm sm:text-base ${
                      bookingStep >= step
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-6 h-1 sm:w-8 sm:h-1 md:w-12 md:h-1 md:mx-2 mx-1 transition-all ${
                        bookingStep > step ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Patron Status */}
            {bookingStep === 1 && (
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Are you a Life Patronship member?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <button
                    onClick={() => handlePatronSelect("yes")}
                    className="p-4 sm:p-6 md:p-8 border-2 border-orange-500 rounded-xl sm:rounded-2xl hover:bg-orange-50 transition-all group"
                  >
                    <CheckCircleIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-orange-500" />
                    <h4 className="text-lg sm:text-xl md:text-xl font-bold mb-1 sm:mb-2 text-center">Yes, I have</h4>
                    {/* <p className="text-xs sm:text-sm text-gray-600 text-center">
                      Get special discounted rates
                    </p> */}
                  </button>
                  <button
                    onClick={() => handlePatronSelect("no")}
                    className="p-4 sm:p-6 md:p-8 border-2 border-gray-300 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <XMarkIcon className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-gray-500" />
                    <h4 className="text-lg sm:text-xl md:text-xl font-bold mb-1 sm:mb-2 text-center">No, I don't</h4>
                    {/* <p className="text-xs sm:text-sm text-gray-600 text-center">
                      Standard rates apply
                    </p> */}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {bookingStep === 2 && (
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                <button
                  onClick={resetBooking}
                  className="mb-4 sm:mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Select Your Dates
                </h3>
                <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Rooms available: October 6-9, 2025
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.checkin}
                      onChange={(e) =>
                        setSelectedDates((prev) => ({
                          ...prev,
                          checkin: e.target.value,
                        }))
                      }
                      min="2025-10-06"
                      className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={selectedDates.checkout}
                      onChange={(e) =>
                        setSelectedDates((prev) => ({
                          ...prev,
                          checkout: e.target.value,
                        }))
                      }
                      min="2025-10-06"
                      className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>
                <button
                  onClick={handleDateSelection}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 sm:py-4 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                >
                  Check Availability
                </button>
              </div>
            )}

            {/* Step 3: Room Selection */}
            {bookingStep === 3 && (
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                <button
                  onClick={() => setBookingStep(2)}
                  className="mb-4 sm:mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
                  Available Rooms
                </h3>
                <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  {selectedDates.checkin} to {selectedDates.checkout} •{" "}
                  {calculateNights()}{" "}
                  {calculateNights() === 1 ? "night" : "nights"}
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {availableRooms.map((room, idx) => {
                    const details = roomDetails[room.type];
                    const price = patronStatus === "yes" ? 300 : room.price;
                    const originalPrice = room.price;
                    const hasDiscount = patronStatus === "yes";

                    return (
                      <div
                        key={idx}
                        className="w-full border-2 border-gray-200 rounded-xl sm:rounded-2xl hover:border-orange-500 hover:shadow-lg transition-all text-left group overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row">
                          {/* Room Image */}
                          <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                            <img
                              src={details.image}
                              alt={room.type}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {room.available <= 2 && (
                              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                                Only {room.available} left!
                              </div>
                            )}
                          </div>

                          {/* Room Details */}
                          <div className="flex-1 p-4 sm:p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                              <div className="flex-1 mb-3 sm:mb-0">
                                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                                  {room.type}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                                  {details.capacity}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                                  {details.features.map((feature, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>

                                <p className="text-xs sm:text-sm text-gray-600">
                                  {room.available} rooms available
                                </p>
                                {!details.refundable && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    • Non-Refundable
                                  </p>
                                )}
                              </div>

                              {/* Pricing */}
                              <div className="text-left sm:text-right">
                                {hasDiscount && (
                                  <p className="text-xs sm:text-sm text-gray-400 line-through">
                                    ₹{originalPrice}
                                  </p>
                                )}
                                <p className="text-2xl sm:text-3xl font-bold text-orange-500">
                                  ₹{price}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600">
                                  per night
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  + ₹350 taxes & fees
                                </p>
                                {hasDiscount && (
                                  <div className="mt-1 sm:mt-2 inline-block">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                      Patron Discount
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 border-t border-gray-200 pt-3 sm:pt-4">
                              <button
                                onClick={() => handleSeeDetails(room.type)}
                                className="flex-1 px-3 py-2 sm:px-4 sm:py-2 border-2 border-orange-500 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors text-sm sm:text-base"
                              >
                                See Details
                              </button>
                              <button
                                onClick={() => handleRoomSelect(room.type)}
                                className="flex-1 px-3 py-2 sm:px-4 sm:py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Booking Form */}
            {bookingStep === 4 && (
              <div className="bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
                <button
                  onClick={() => setBookingStep(3)}
                  className="mb-4 sm:mb-6 text-orange-500 hover:text-orange-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Back
                </button>
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
                  Complete Your Booking
                </h3>

                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-orange-50 rounded-lg sm:rounded-xl">
                  <h4 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                    Booking Summary
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-gray-700 text-xs sm:text-sm">
                    <p>
                      <span className="font-semibold">Room:</span>{" "}
                      {formData.roomType}
                    </p>
                    <p>
                      <span className="font-semibold">Check-in:</span>{" "}
                      {selectedDates.checkin}
                    </p>
                    <p>
                      <span className="font-semibold">Check-out:</span>{" "}
                      {selectedDates.checkout}
                    </p>
                    <p>
                      <span className="font-semibold">Patron Status:</span>{" "}
                      {patronStatus === "yes" ? "Yes" : "No"}
                    </p>
                    <div className="pt-2 sm:pt-4 mt-2 sm:mt-4 border-t border-gray-300">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                        ₹{patronStatus === "yes" ? 300 : 500} per person per
                        night
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">
                          Total: ₹{calculateTotal()}
                        </p>
                        <div className="flex flex-col">
                          <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">
                            Additional Members
                          </label>
                          <div className="flex items-center border-2 border-gray-200 rounded-lg sm:rounded-xl overflow-hidden w-full sm:w-40">
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  guests: Math.max(1, (prev.guests || 1) - 1),
                                }))
                              }
                              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              name="guests"
                              value={formData.guests}
                              onChange={handleInputChange}
                              min="1"
                              className="w-full text-center p-2 sm:p-3 focus:outline-none text-sm sm:text-base"
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  guests: (prev.guests || 1) + 1,
                                }))
                              }
                              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors text-sm sm:text-base"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                        Aadhaar ID *
                      </label>
                      <input
                        type="text"
                        name="aadhaar"
                        value={formData.aadhaar}
                        onChange={handleInputChange}
                        placeholder="Enter Aadhaar Number"
                        required
                        maxLength={12}
                        className="border-2 border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full focus:border-orange-500 focus:outline-none transition-colors text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            )}

            {/* Patron Card Info */}
            {bookingStep === 1 && (
              <div className="mt-8 sm:mt-10 md:mt-12">
                <div className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-orange-200/30 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-yellow-200/30 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                      <GiftIcon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 mr-2 sm:mr-3" />
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                        Life Patron Card
                      </h3>
                    </div>

                    <p className="text-center text-gray-700 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                      As a Life Patron member of ISKCON, you receive exclusive
                      benefits worldwide
                    </p>

                    <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
                      {patronBenefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <benefit.icon
                            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${benefit.color} flex-shrink-0 mt-0.5`}
                          />
                          <span className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Rooms Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Our Accommodations
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Choose from our range of comfortable rooms designed for your
              spiritual journey
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=400&fit=crop",
                title: "Deluxe AC Room",
                desc: "Spacious room with modern amenities and air conditioning for ultimate comfort.",
                features: ["AC", "WiFi", "TV"],
              },
              {
                img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&h=400&fit=crop",
                title: "Standard Non-AC Room",
                desc: "Comfortable and affordable room for budget-conscious travelers.",
                features: ["Fan", "WiFi", "Clean"],
              },
              {
                img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&h=400&fit=crop",
                title: "Dormitory",
                desc: "Shared accommodation perfect for groups and spiritual gatherings.",
                features: ["Shared", "Economical", "Groups"],
              },
            ].map((room, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative overflow-hidden h-48 sm:h-56 md:h-64">
                  <img
                    src={room.img}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2">
                    {room.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-semibold rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">
                    {room.title}
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    {room.desc}
                  </p>
                  <a
                    href="#booking"
                    className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-500 text-sm sm:text-base"
                  >
                    View Details
                    <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact & Temple Info Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-900 to-orange-800 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                INTERNATIONAL SOCIETY FOR
                <br />
                KRISHNA CONSCIOUSNESS
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-orange-100 leading-relaxed">
                ISKCON Ujjain, Sri Sri Radha MadanMohan welcomes you all
                <br />
                in this holy land of Ujjain
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 md:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <HomeIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Address
                </h3>
                <p className="text-orange-100 leading-relaxed text-sm sm:text-base">
                  33-37, Hare Krishna Land, Bharatpuri,
                  <br />
                  Ujjain, Madhya Pradesh, 456010
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Contact
                </h3>
                <p className="text-orange-100 text-sm sm:text-base">
                  <a
                    href="tel:+919424940422"
                    className="hover:text-white transition-colors block sm:inline"
                  >
                    +91 9424940422
                  </a>
                  <br />
                  <a
                    href="mailto:info@iskconujjain.com"
                    className="hover:text-white transition-colors block sm:inline"
                  >
                    info@iskconujjain.com
                  </a>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 md:col-span-2">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Temple Timings
                </h3>
                <p className="text-orange-100 text-base sm:text-lg md:text-xl">
                  Morning 04:10 AM - Evening 09:15 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-orange-100 py-8 sm:py-10 md:py-12 text-center">
        <p className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2">Hare Krishna | Hare Rama</p>
        <p className="text-xs sm:text-sm md:text-base">
          &copy; {new Date().getFullYear()} ISKCON Ujjain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}