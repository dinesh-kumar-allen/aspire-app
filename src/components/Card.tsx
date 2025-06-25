import React from "react";
import { Card as CardType } from "@/interfaces/cards";
import { formatCardNumber, maskCardNumber } from "@/utils/cardUtils";
import Image from "next/image";

interface CardProps {
  card: CardType;
  showCardNumber: boolean;
}

const Card: React.FC<CardProps> = ({ card, showCardNumber }) => {
  return (
    <div className={"rounded-xl p-4 lg:p-7 text-white shadow-lg h-[220px] lg:min-h-[260px] relative overflow-hidden flex flex-col justify-between " + (card?.isFrozen ? "bg-highlight-green/40" : "bg-highlight-green")}>
      {/* Top right logo */}
      <div className="flex justify-between items-start mb-4">
        <div></div>
        <Image src="/aspire_logo_transparent.svg" alt="aspire" width={84} height={24} />
      </div>
      
      {/* Card Holder */}
      <div className="mb-4 lg:mb-6">
        <p className="text-2xl font-bold">{card.cardHolder}</p>
      </div>
      
      {/* Card Number */}
      <div className="flex items-center gap-4 mb-2">
        <span className="tracking-widest text-sm font-bold">
          {formatCardNumber(showCardNumber ? card.cardNumber : maskCardNumber(card.cardNumber))}
        </span>
      </div>
      
      {/* Expiry & CVV */}
      <div className="flex justify-start items-center font-bold">
        <span className="text-sm">Thru: {card.expiry}</span>
        <span className="text-sm ml-4">CVV: ***</span>
      </div>
      
      {/* Company Logo */}
      <div className="flex justify-end">
        <Image src="/Visa Logo.svg" alt="VISA" width={67} height={24} />
      </div>
    </div>
  );
};

export default Card; 