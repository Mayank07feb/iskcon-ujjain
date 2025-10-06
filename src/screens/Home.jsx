import { useState, useEffect } from "react";

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
    guests: "",
    roomType: "",
  });

  const heroImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=600&fit=crop",
  ];

  // Static room availability data (6, 7, 8, 9 October available)
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

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, heroImages.length]);

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

  const handlePatronSelect = (status) => {
    setPatronStatus(status);
    setBookingStep(2);
  };

  const handleDateSelection = () => {
    if (!selectedDates.checkin || !selectedDates.checkout) {
      alert("Please select both check-in and check-out dates");
      return;
    }

    const checkinDate = new Date(selectedDates.checkin);
    const checkoutDate = new Date(selectedDates.checkout);

    if (checkoutDate <= checkinDate) {
      alert("Check-out date must be after check-in date");
      return;
    }

    // Check if dates are available
    const checkinKey = selectedDates.checkin;
    const checkoutKey = selectedDates.checkout;

    if (roomAvailability[checkinKey] && roomAvailability[checkoutKey]) {
      setAvailableRooms(roomAvailability[checkinKey]);
      setBookingStep(3);
    } else {
      alert(
        "Sorry, rooms are not available for the selected dates. Please choose from: October 6-9, 2025"
      );
    }
  };

  const handleRoomSelect = (roomType) => {
    setFormData((prev) => ({ ...prev, roomType }));
    setBookingStep(4);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const basePrice = patronStatus === "yes" ? 300 : 500;
    const checkinDate = new Date(selectedDates.checkin);
    const checkoutDate = new Date(selectedDates.checkout);
    const nights = Math.ceil(
      (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
    );
    return basePrice * nights;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = calculateTotal();
    console.log("Booking submitted:", {
      patronStatus,
      selectedDates,
      formData,
      total,
    });
    alert(
      `Thank you! Your booking request has been submitted.\nTotal Amount: ₹${total}\nWe will contact you shortly.`
    );

    // Reset form
    setBookingStep(1);
    setPatronStatus("");
    setSelectedDates({ checkin: "", checkout: "" });
    setAvailableRooms([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      guests: "",
      roomType: "",
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
      guests: "",
      roomType: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary via-white to-secondary">
      {/* Hero Section Slider */}
      <header className="relative w-full h-screen max-h-[700px] overflow-hidden">
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

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-heroOverlayMedium via-heroOverlayLight to-heroOverlayDark" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-10">
          <div>
            <div className="inline-block mb-4 px-6 py-2 bg-primaryOrange/20 backdrop-blur-sm border border-primaryOrangeLight/30 rounded-full">
              <p className="text-textOrange100 text-sm font-medium tracking-wide">
                Sacred Hospitality
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              ISKCON Ujjain
              <br />
              <span className="text-primaryOrangeLight">Guest House</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Experience divine peace and comfort near the sacred temple
            </p>
            <a
              href="#booking"
              className="inline-block bg-gradient-to-r from-primaryOrange to-primaryOrangeDark text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-primaryOrange/50 hover:scale-105 transition-all duration-300"
            >
              Book Your Stay
            </a>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20"
        >
          <svg
            className="w-6 h-6 text-gray800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-xl hover:scale-110 transition-all z-20"
        >
          <svg
            className="w-6 h-6 text-gray800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-12 h-3 bg-primaryOrange"
                  : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </header>

      <main>
        {/* Booking Form with Multi-Step Process */}
        <section
          id="booking"
          className="py-24 px-6 lg:px-8 bg-gradient-to-b from-secondary to-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primaryOrangeDark to-primary bg-clip-text text-transparent">
                Book Your Stay
              </h2>
              <p className="text-gray600 text-lg">
                Complete the steps below to reserve your room
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-12 flex justify-center items-center gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      bookingStep >= step
                        ? "bg-primaryOrange text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 4 && (
                    <div
                      className={`w-16 h-1 mx-2 transition-all ${
                        bookingStep > step ? "bg-primaryOrange" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Patron Status */}
            {bookingStep === 1 && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                <h3 className="text-2xl font-bold text-gray800 mb-6 text-center">
                  Are you a Life Patronship member?
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handlePatronSelect("yes")}
                    className="p-8 border-2 border-primaryOrange rounded-2xl hover:bg-primaryOrange/5 transition-all group"
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-primaryOrange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h4 className="text-xl font-bold mb-2">Yes, I have</h4>
                    <p className="text-gray-600">₹300 per night</p>
                  </button>
                  <button
                    onClick={() => handlePatronSelect("no")}
                    className="p-8 border-2 border-gray-300 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <svg
                      className="w-16 h-16 mx-auto mb-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <h4 className="text-xl font-bold mb-2">No, I don't</h4>
                    <p className="text-gray-600">₹500 per night</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {bookingStep === 2 && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                <button
                  onClick={resetBooking}
                  className="mb-6 text-primaryOrange hover:text-primaryOrangeDark flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
                <h3 className="text-2xl font-bold text-gray800 mb-6 text-center">
                  Select Your Dates
                </h3>
                <p className="text-center text-gray-600 mb-8">
                  Rooms available: October 6-9, 2025
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray700 font-semibold mb-2">
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
                    //   min="2025-10-06"
                    //   max="2025-10-09"
                      className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-gray700 font-semibold mb-2">
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
                    //   min="2025-10-06"
                    //   max="2025-10-09"
                      className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                    />
                  </div>
                </div>
                <button
                  onClick={handleDateSelection}
                  className="w-full bg-gradient-to-r from-primaryOrange to-primaryOrangeDark text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                >
                  Check Availability
                </button>
              </div>
            )}

            {/* Step 3: Room Selection */}
            {bookingStep === 3 && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                <button
                  onClick={() => setBookingStep(2)}
                  className="mb-6 text-primaryOrange hover:text-primaryOrangeDark flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
                <h3 className="text-2xl font-bold text-gray800 mb-6 text-center">
                  Available Rooms
                </h3>
                <p className="text-center text-gray-600 mb-8">
                  {selectedDates.checkin} to {selectedDates.checkout}
                </p>
                <div className="space-y-4">
                  {availableRooms.map((room, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRoomSelect(room.type)}
                      className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primaryOrange hover:bg-primaryOrange/5 transition-all text-left group"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-xl font-bold text-gray800 mb-2">
                            {room.type}
                          </h4>
                          <p className="text-gray-600">
                            {room.available} rooms available
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primaryOrange">
                            ₹{patronStatus === "yes" ? 300 : 500}
                          </p>
                          <p className="text-sm text-gray-600">per night</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Booking Form */}
            {bookingStep === 4 && (
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl">
                <button
                  onClick={() => setBookingStep(3)}
                  className="mb-6 text-primaryOrange hover:text-primaryOrangeDark flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
                <h3 className="text-2xl font-bold text-gray800 mb-6 text-center">
                  Complete Your Booking
                </h3>

                {/* Booking Summary */}
                <div className="mb-8 p-6 bg-secondary rounded-xl">
                  <h4 className="font-bold text-gray800 mb-4">
                    Booking Summary
                  </h4>
                  <div className="space-y-2 text-gray-700">
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
                    <div className="pt-4 mt-4 border-t border-gray-300">
                      <p className="text-2xl font-bold text-primaryOrange">
                        Total: ₹{calculateTotal()}
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative">
                      <label className="block text-gray700 font-semibold mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                        className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-gray700 font-semibold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                        className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="relative">
                      <label className="block text-gray700 font-semibold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="relative">
                      <label className="block text-gray700 font-semibold mb-2">
                        Number of Guests *
                      </label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        placeholder="2"
                        min="1"
                        required
                        className="border-2 border-gray200 rounded-xl p-4 w-full focus:border-primaryOrange focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primaryOrange to-primaryOrangeDark text-white font-bold py-5 rounded-xl shadow-xl hover:shadow-2xl hover:shadow-primaryOrange/50 hover:scale-[1.02] transition-all duration-300"
                  >
                    Confirm Booking
                  </button>
                </form>
              </div>
            )}

            {/* Premium Patron Card Info - Show only on step 1 */}
            {bookingStep === 1 && (
              <div className="mt-12">
                <div className="relative bg-gradient-to-br from-secondary via-white to-secondary rounded-3xl shadow-2xl p-8 md:p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blurOrange rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-blurYellow rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center justify-center mb-6">
                      <svg
                        className="w-12 h-12 text-primaryOrangeDark mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                        />
                      </svg>
                      <h3 className="text-3xl md:text-4xl font-bold text-gray800">
                        Life Patron Card
                      </h3>
                    </div>

                    <p className="text-center text-gray700 text-lg mb-8 max-w-2xl mx-auto">
                      As a Life Patron member of ISKCON, you receive exclusive
                      benefits worldwide
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          iconPath:
                            "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                          color: "text-green",
                          text: "Personalized hologram Patronship card with your photo and patron number",
                        },
                        {
                          iconPath:
                            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                          color: "text-blue",
                          text: "Annual stay of up to 3 days at participating official ISKCON guest houses worldwide",
                        },
                        {
                          iconPath:
                            "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                          color: "text-purple",
                          text: "Stay includes patron, spouse, children under 18, and dependent parents over 60",
                        },
                        {
                          iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                          color: "text-red",
                          text: "All stays require advance reservation and are subject to room availability",
                        },
                        {
                          iconPath:
                            "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
                          color: "text-pink",
                          text: "Free prasadam (sanctified meals) twice daily for up to three days per year at any ISKCON temple",
                        },
                      ].map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          <svg
                            className={`w-6 h-6 ${benefit.color} flex-shrink-0 mt-0.5`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={benefit.iconPath}
                            />
                          </svg>
                          <span className="text-gray700 text-sm leading-relaxed">
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
        <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primaryOrangeDark to-primary bg-clip-text text-transparent">
              Our Accommodations
            </h2>
            <p className="text-gray600 text-lg max-w-2xl mx-auto">
              Choose from our range of comfortable rooms designed for your
              spiritual journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
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
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={room.img}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {room.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primaryOrangeDark text-xs font-semibold rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 text-gray800">
                    {room.title}
                  </h3>
                  <p className="text-gray600 mb-6 leading-relaxed">
                    {room.desc}
                  </p>
                  <a
                    href="#booking"
                    className="inline-flex items-center text-primaryOrangeDark font-semibold hover:text-primaryOrange"
                  >
                    View Details
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>



        {/* Contact & Temple Info Section */}
        <section className="py-24 px-6 lg:px-8 bg-gradient-to-b from-footerBg to-primaryOrangeDark text-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                INTERNATIONAL SOCIETY FOR
                <br />
                KRISHNA CONSCIOUSNESS
              </h2>
              <p className="text-xl text-textOrange100 leading-relaxed">
                ISKCON Ujjain, Sri Sri Radha MadanMohan welcomes you all
                <br />
                in this holy land of Ujjain
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Address
                </h3>
                <p className="text-textOrange100 leading-relaxed">
                  33-37, Hare Krishna Land, Bharatpuri,
                  <br />
                  Ujjain, Madhya Pradesh, 456010
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Contact
                </h3>
                <p className="text-textOrange100">
                  <a
                    href="tel:+919424940422"
                    className="hover:text-white transition-colors"
                  >
                    +91 9424940422
                  </a>
                  <br />
                  <a
                    href="mailto:info@iskconujjain.com"
                    className="hover:text-white transition-colors"
                  >
                    info@iskconujjain.com
                  </a>
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:col-span-2">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Temple Timings
                </h3>
                <p className="text-textOrange100 text-lg">
                  Morning 04:10 AM - Evening 09:15 PM
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray800 text-textOrange100 py-12 text-center">
        <p className="text-lg mb-2">Hare Krishna | Hare Rama</p>
        <p className="text-sm opacity-75">
          &copy; 2025 ISKCON Ujjain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}