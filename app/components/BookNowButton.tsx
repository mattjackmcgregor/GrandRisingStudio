import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  useState,
} from "react";
import { BookingModal } from "./BookingModal";

interface Props {
  extraClasses?: string;
}

const BookNowButton = ({ extraClasses }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className={`inline-flex items-center justify-center px-2 py-1 whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring   ${extraClasses}`}
        onClick={openModal}
      >
        Book Now
      </button>

      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default BookNowButton;
