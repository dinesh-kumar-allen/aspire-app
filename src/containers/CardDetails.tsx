"use client";
import React, { useState } from "react";
import Accordion from "@/components/Accordion";
import { Card } from "@/interfaces/cards";
import { formatCardNumber, maskCardNumber } from "@/utils/cardUtils";

interface CardDetailsProps {
  card: Card
  showCardNumber: boolean;
}

const CardDetails = ({
  card,
  showCardNumber,
}: CardDetailsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      title="Card details"
      icon="/card_details.svg"
      expanded={isExpanded}
      onClick={() => setIsExpanded(prev => !prev)}
    >
      <div className="divide-y divide-[#E5E9F2]">
        {card ? (
          <>
            <div className="space-y-2 px-3 py-2 lg:px-6 lg:py-4 text-xs lg:text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Card Number:</span>
                <span>
                  {formatCardNumber(showCardNumber
                    ? card.cardNumber
                    : maskCardNumber(card.cardNumber))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Card Holder:</span>
                <span>{card.cardHolder}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Card Expiry:</span>
                <span>{card.expiry}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Card Type:</span>
                <span>{card.cardType}</span>
              </div>
            </div>
          </>
        ): null}
      </div>
    </Accordion>
  );
};

export default CardDetails;
