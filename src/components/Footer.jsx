import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t text-center text-gray-600 p-4">
      © {new Date().getFullYear()} ISKCON Ujjain • All rights reserved
    </footer>
  );
}
