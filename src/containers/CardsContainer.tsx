import React, { useMemo, useState } from "react";
import { Card, CardAction } from "@/interfaces/cards";
import CardCarousel from "@/components/CardCarousel";
import CardActions from "@/components/CardActions";
import CardDetails from "@/containers/CardDetails";
import RecentTransactions from "@/containers/RecentTransactions";
import Image from "next/image";

interface CardsContainerProps {
  cards: Card[];
  activeCardIndex: number;
  onCardChange: (index: number) => void;
  onCardAction: (action: CardAction) => void;
  'data-testid'?: string;
}

export default function CardsContainer({
  cards,
  activeCardIndex,
  onCardChange,
  onCardAction,
  'data-testid': dataTestId,
}: CardsContainerProps) {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const activeCard = useMemo(() => cards[activeCardIndex] || cards[0], [cards, activeCardIndex]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12.5 p-10 rounded-xl shadow-[0px_0px_8px_2px_var(--color-shadow-3)]" data-testid={dataTestId}>
      {/* Left Column - Card Carousel and Actions */}
      <div className="lg:col-span-1 space-y-8">
        {/* Show Card Number Toggle */}
        <div className="flex items-center justify-end mb-2">
          <button
            className="flex items-center gap-2 text-green-600 font-bold text-xs focus:outline-none cursor-pointer"
            onClick={() => setShowCardNumber((prev) => !prev)}
          >
            <Image src="/eye.svg" alt="eye" width={16} height={16} />
            {showCardNumber ? "Hide card number" : "Show card number"}
          </button>
        </div>
        {/* Card Carousel */}
        {cards.length > 0 ? (
          <>
            <div data-testid="cards-count" className="hidden">{cards.length}</div>
            <CardCarousel
              cards={cards}
              activeCardIndex={activeCardIndex}
              onCardChange={onCardChange}
              showCardNumber={showCardNumber}
            />
            {/* Card Holder Name for test */}
            <div data-testid={`card-holder-${activeCardIndex}`} className="hidden">{activeCard.cardHolder}</div>
          </>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-500">No cards available</p>
          </div>
        )}

        {/* Card Actions */}
        {activeCard && (
          <div className="mt-8">
            <CardActions
              activeCard={activeCard}
              onAction={onCardAction}
              freezeTestId={`freeze-card-${activeCardIndex}`}
            />
          </div>
        )}
      </div>

      {/* Right Column - Card Details and Transactions */}
      <div className="space-y-6">
        <CardDetails card={activeCard} showCardNumber={showCardNumber} />
        <RecentTransactions card={activeCard} />
      </div>
    </div>
  );
} 