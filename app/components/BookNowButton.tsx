import React, { MouseEventHandler, useState } from "react";
import { Button } from "@/components/ui/button";
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
      <Button className={`${extraClasses}`} onClick={openModal}>
        Book Now
      </Button>
      {isModalOpen && <BookingModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default BookNowButton;
