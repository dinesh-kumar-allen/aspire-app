"use client";
import React from "react";
import { Card } from "@/interfaces/cards";
import { useSwipeable } from "react-swipeable";
import CardComponent from "./Card";

interface CardCarouselProps {
  cards: Card[];
  activeCardIndex: number;
  onCardChange: (index: number) => void;
  showCardNumber: boolean;
}

const CardCarousel: React.FC<CardCarouselProps> = ({
  cards,
  activeCardIndex,
  onCardChange,
  showCardNumber,
}) => {
  const handleSwipeLeft = () => {
    const newIndex =
      activeCardIndex === cards.length - 1 ? 0 : activeCardIndex + 1;
    onCardChange(newIndex);
  };

  const handleSwipeRight = () => {
    const newIndex =
      activeCardIndex === 0 ? cards.length - 1 : activeCardIndex - 1;
    onCardChange(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
    trackTouch: true,
    rotationAngle: 0,
    touchEventOptions: { passive: true },
    delta: 50, // Minimum swipe distance
    preventScrollOnSwipe: true,
    swipeDuration: 500,
  });

  if (!cards.length) return null;

  const activeCard = cards[activeCardIndex];

  return (
    <div className="relative ">
      {/* Card Display */}
      <div
        {...handlers}
        className="cursor-grab active:cursor-grabbing select-none mx-4 lg:mx-0"
      >
        <CardComponent card={activeCard} showCardNumber={showCardNumber} />
      </div>

      {/* Card Indicators */}
      {cards.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => onCardChange(index)}
              className={`cursor-pointer transition-all duration-20 bg-highlight-green  rounded-full ${
                index === activeCardIndex ? "w-8 h-2" : "w-2 h-2 opacity-20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCarousel;
