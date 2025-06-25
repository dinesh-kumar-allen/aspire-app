"use client";
import React, { useMemo } from "react";
import { Card, CardAction } from "@/interfaces/cards";
import Image from "next/image";

interface CardActionsProps {
  activeCard: Card;
  onAction: (action: CardAction) => void;
  freezeTestId?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ activeCard, onAction, freezeTestId }) => {
  const actions: CardAction[] = useMemo(() => [
    {
      id: "freeze",
      name: activeCard.isFrozen ? "Unfreeze card" : "Freeze card",
      icon: activeCard.isFrozen ? "/unfreeze.svg" : "/Freeze card.svg",
      action: () => {
        onAction({
          id: "freeze",
          name: activeCard.isFrozen ? "Unfreeze card" : "Freeze card",
          icon: activeCard.isFrozen ? "/unfreeze.svg" : "/Freeze card.svg",
          action: () => {}
        });
      }
    },
    {
      id: "spend-limit",
      name: "Set spend limit",
      icon: "/Set spend limit.svg",
      action: () => {
        onAction({
          id: "spend-limit",
          name: "Set spend limit",
          icon: "/Set spend limit.svg",
          action: () => {}
        });
      }
    },
    {
      id: "gpay",
      name: "Add to GPay",
      icon: "/GPay.svg",
      action: () => {
        onAction({
          id: "gpay",
          name: "Add to GPay",
          icon: "/GPay.svg",
          action: () => {}
        });
      }
    },
    {
      id: "replace",
      name: "Replace card",
      icon: "/Replace card.svg",
      action: () => {
        onAction({
          id: "replace",
          name: "Replace card",
          icon: "/Replace card.svg",
          action: () => {}
        });
      }
    },
    {
      id: "deactivate",
      name: "Cancel card",
      icon: "/Deactivate card.svg",
      action: () => {
        onAction({
          id: "deactivate",
          name: "Cancel card",
          icon: "/Deactivate card.svg",
          action: () => {}
        });
      }
    }
  ], [activeCard.isFrozen, onAction]);

  return (
    <div className="bg-light-blue rounded-t-xl lg:rounded-xl p-2 lg:shadow-sm">
      <div className="grid grid-cols-5 gap-5 px-2">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex flex-col items-center p-1 rounded-lg  transition-colors group cursor-pointer"
            {...(action.id === 'freeze' && freezeTestId ? { 'data-testid': freezeTestId } : {})}
          >
            <div className="w-12 h-12  rounded-full flex items-center justify-center mb-2 transition-colors">
              <Image 
                src={action.icon} 
                alt={action.name} 
                width={24} 
                height={24}
                className="opacity-70 group-hover:opacity-100"
              />
            </div>
            <span className="text-sm font-medium text-dark-blue text-center transition-colors">
              {action.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardActions; 