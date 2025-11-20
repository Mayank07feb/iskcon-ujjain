export const formatRoomType = (type) => {
  if (!type) return "";
  return type
    .toLowerCase() // "deluxe_ac"
    .split("_") // ["deluxe", "ac"]
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ["Deluxe", "AC"]
    .join(" "); // "Deluxe AC"
};

export const calculateNights = () => {
  if (!selectedDates.checkin || !selectedDates.checkout) return 0;
  const checkinDate = new Date(selectedDates.checkin);
  const checkoutDate = new Date(selectedDates.checkout);
  return Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };

  return date.toLocaleDateString("en-GB", options); // e.g. "27 Oct 2025"
};



export const formatDateAndTime = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};