import React from "react";
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col mb-5 container mx-auto px-6 py-10 items-center bg-black/10 rounded-lg backdrop-blur border-gray-900 border">
      {children}
    </div>
  );
}
export default Card;
