import { useState } from "react";
import {
  XMarkIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function CancelBookingPage({ onClose, onCancelSuccess }) {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [serverOtp] = useState("1234");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [form, setForm] = useState({
    email: "",
    phone: "",
  });

  const fakeRooms = [
    { id: "101", type: "Deluxe Room", refund: 2000 },
    { id: "102", type: "Suite Room", refund: 3500 },
    { id: "103", type: "Standard Room", refund: 1500 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = () => {
    if (!form.email || !form.phone)
      return alert("Please enter Email & Phone Number");
    setStep(2);
  };

  const handleVerifyOTP = () => {
    if (otp !== serverOtp) return alert("Incorrect OTP!");
    setStep(3);
  };

  const handleProceedCancel = () => {
    onCancelSuccess && onCancelSuccess(selectedRoom);
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-heroOverlayMedium backdrop-blur-sm p-4 sm:p-6">
      {/* MODAL CARD */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-4 sm:p-6 relative max-h-screen overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <button
              onClick={() => {
                if (showDetails) {
                  setShowDetails(false);
                } else if (step > 1) {
                  setStep(step - 1);
                } else {
                  onClose && onClose();
                }
              }}
              className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray700" />
            </button>

            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray800">
              {showDetails ? "Room Details" : "Cancel Booking"}
            </h2>
          </div>

          <button
            onClick={() => onClose && onClose()}
            className="p-1 sm:p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition"
          >
            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray700" />
          </button>
        </div>

        {/* STEP 1 — Email + Phone */}
        {step === 1 && !showDetails && (
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div>
              <label className="font-semibold text-gray700 block mb-1.5 sm:mb-2 text-sm sm:text-base">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primaryOrange focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="font-semibold text-gray700 block mb-1.5 sm:mb-2 text-sm sm:text-base">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-primaryOrange focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>

            <button
              onClick={handleSendOTP}
              className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-primaryOrange text-white rounded-lg font-semibold hover:bg-primaryOrangeDark transition"
            >
              Send OTP
            </button>
          </div>
        )}

        {/* STEP 2 — OTP Verification */}
        {step === 2 && !showDetails && (
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <p className="text-xs sm:text-sm text-gray600">
              OTP sent to <strong>{form.email}</strong> and{" "}
              <strong>{form.phone}</strong>
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
              className="w-full p-2.5 sm:p-3 border rounded-lg text-center text-lg sm:text-xl tracking-widest focus:ring-2 focus:ring-primaryOrange focus:outline-none"
              placeholder="Enter OTP"
            />

            <button
              onClick={handleVerifyOTP}
              className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-primaryOrange text-white rounded-lg font-semibold hover:bg-primaryOrangeDark transition"
            >
              Verify OTP
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg bg-gray200 text-gray700 hover:bg-gray-300 transition"
            >
              Edit Email / Phone
            </button>
          </div>
        )}

        {/* STEP 3 — Room List */}
        {step === 3 && !showDetails && (
          <div className="w-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md border border-primaryOrange p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-10 transition-all">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">

              {/* Left: Room Image */}
              <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl h-40 xs:h-48 sm:h-56 md:h-64">
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop&q=80"
                  alt="Luxury Hotel Room"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Room Details */}
              <div className="relative flex flex-col">

                {/* Price Top Right */}
                <div className="absolute top-0 right-0 text-right">
                  <p className="text-primaryOrange text-xl xs:text-2xl sm:text-3xl font-bold">₹3000</p>
                  <p className="text-gray600 text-[10px] xs:text-xs sm:text-sm">per night</p>
                </div>

                {/* Title */}
                <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray800 mb-1 pr-16 xs:pr-20">Antila</h2>
                <p className="text-gray700 mb-2 sm:mb-3 md:mb-4 text-xs xs:text-sm sm:text-base">Deluxe Ac</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                  <span className="bg-gray200 text-gray700 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm">AC</span>
                  <span className="bg-gray200 text-gray700 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm">TV</span>
                  <span className="bg-gray200 text-gray700 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm">Hot Water</span>
                  <span className="bg-gray200 text-gray700 px-1.5 xs:px-2 sm:px-3 py-0.5 xs:py-1 rounded-full text-[10px] xs:text-xs sm:text-sm">Sea View</span>
                </div>

                {/* Room Info */}
                <div className="text-gray700 mb-2 sm:mb-3 md:mb-4 text-xs xs:text-sm sm:text-base">
                  <p className="font-semibold">Rooms available</p>

                  <p className="mt-1 text-[10px] xs:text-xs sm:text-sm">
                    <span className="font-bold">Fits 10 Adults</span> <br />
                    • Non-Refundable <br />
                    Bed type: Twin Adults
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 mt-auto pt-2 xs:pt-3 sm:pt-4 border-t border-gray200">
                  <button 
                    onClick={() => setShowDetails(true)}
                    className="w-full sm:w-1/2 border border-primaryOrange text-primaryOrange py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl font-semibold hover:bg-primaryOrangeLight hover:text-white transition-all text-xs xs:text-sm sm:text-base"
                  >
                    See Details
                  </button>

                  <button 
                    onClick={() => {
                      setSelectedRoom(fakeRooms[0]);
                      setStep(4);
                    }}
                    className="w-full sm:w-1/2 bg-primaryOrange text-white py-2 xs:py-2.5 sm:py-3 rounded-lg xs:rounded-xl font-semibold hover:bg-primaryOrangeDark transition-all text-xs xs:text-sm sm:text-base"
                  >
                    Cancel This Room
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROOM DETAILS VIEW */}
        {showDetails && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6">
            {/* Room Image */}
            <div className="overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl h-48 xs:h-56 sm:h-64 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&h=800&fit=crop&q=80"
                alt="Luxury Hotel Room"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Room Title & Price */}
            <div className="flex justify-between items-start gap-3">
              <div>
                <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray800">Antila</h2>
                <p className="text-gray700 text-sm xs:text-base sm:text-lg">Deluxe Ac</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-primaryOrange text-2xl xs:text-3xl sm:text-4xl font-bold">₹3000</p>
                <p className="text-gray600 text-xs sm:text-sm">per night</p>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray800 mb-2 sm:mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">AC</span>
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">TV</span>
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">Hot Water</span>
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">Sea View</span>
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">WiFi</span>
                <span className="bg-gray200 text-gray700 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs xs:text-sm sm:text-base">Mini Bar</span>
              </div>
            </div>

            {/* Room Details */}
            <div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray800 mb-2 sm:mb-3">Room Details</h3>
              <div className="space-y-1.5 xs:space-y-2 text-gray700 text-xs xs:text-sm sm:text-base">
                <p><strong>Capacity:</strong> Fits 10 Adults</p>
                <p><strong>Bed Type:</strong> Twin Adults</p>
                <p><strong>Room Size:</strong> 450 sq ft</p>
                <p><strong>View:</strong> Sea View</p>
                <p><strong>Cancellation Policy:</strong> Non-Refundable</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray800 mb-2 sm:mb-3">Description</h3>
              <p className="text-gray700 leading-relaxed text-xs xs:text-sm sm:text-base">
                Experience luxury and comfort in our Deluxe AC room with stunning sea views. 
                This spacious room features modern amenities including air conditioning, flat-screen TV, 
                hot water, and complimentary WiFi. Perfect for families or groups, the room comfortably 
                accommodates up to 10 adults with twin adult beds. Enjoy your stay with access to our 
                mini bar and 24/7 room service.
              </p>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => {
                setShowDetails(false);
                setSelectedRoom(fakeRooms[0]);
                setStep(4);
              }}
              className="w-full bg-primaryOrange text-white py-2.5 xs:py-3 rounded-lg xs:rounded-xl font-semibold hover:bg-primaryOrangeDark transition-all text-sm xs:text-base"
            >
              Cancel This Room
            </button>
          </div>
        )}

        {/* STEP 4 — Refund Summary */}
        {step === 4 && !showDetails && selectedRoom && (
          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center">
            <CheckCircleIcon className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-green mx-auto" />

            <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray800">
              Refund Summary
            </h3>

            <p className="text-gray600 text-xs xs:text-sm sm:text-base">
              Cancelling <strong>{selectedRoom.type}</strong> (Room{" "}
              {selectedRoom.id})
            </p>

            <p className="text-xl xs:text-2xl sm:text-3xl font-bold text-green">
              Refund: ₹{selectedRoom.refund}
            </p>

            <button
              onClick={handleProceedCancel}
              className="w-full py-2.5 xs:py-3 text-sm xs:text-base bg-primaryOrange text-white rounded-lg font-semibold hover:bg-primaryOrangeDark transition"
            >
              Proceed Cancellation
            </button>

            <button
              onClick={() => setStep(3)}
              className="w-full py-2.5 xs:py-3 text-sm xs:text-base border rounded-lg bg-gray200 text-gray700 hover:bg-gray-300 transition"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}