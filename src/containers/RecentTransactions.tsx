"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/interfaces/cards";
import Accordion from "@/components/Accordion";
import { useCards } from "@/contexts/CardsContext";
import Image from "next/image";

interface RecentTransactionsProps {
  card?: Card;
}

const RecentTransactions = ({ card }: RecentTransactionsProps) => {
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const {
    getTransactions,
    fetchTransactions,
    state: { loadingTransactions },
  } = useCards();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isExpanded && card) {
      const cardTransactions = getTransactions(card.id);
      if (!cardTransactions || cardTransactions.length === 0) {
        fetchTransactions(card.id);
      }
    }
  }, [isExpanded, card]);

  const cardTransactions = card ? getTransactions(card.id) : [];

  const displayTransactions = showAllTransactions
    ? cardTransactions
    : cardTransactions?.slice(0, 4);

  const renderTransactions = () => {
    if (!displayTransactions || displayTransactions.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          {loadingTransactions
            ? "Loading transactions..."
            : "No transactions found"}
        </div>
      );
    }

    return displayTransactions.map((tx) => (
      <div key={tx.id} className="flex items-start gap-4 py-4">
        <div className={`rounded-full p-4 ${tx.iconColor}`}>
          <Image src={tx.icon} alt="icon" width={16} height={16} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-black">{tx.merchant}</span>
            <span className={`font-bold ${tx.color}`}>{tx.amount}</span>
          </div>
          <div className="text-grey text-sm">{tx.date}</div>
          <div className="mt-2 flex items-center gap-2 text-highlight-blue text-sm font-semibold">
            <div className="bg-highlight-blue rounded-xl p-1.5">
              <Image
                src="/business-and-finance.svg"
                alt="card"
                width={15}
                height={15}
              />
            </div>
            {tx.info}
          </div>
        </div>
      </div>
    ));
  };

  const handleViewAllClick = () => {
    setShowAllTransactions(!showAllTransactions);
  };

  return (
    <Accordion
      title="Recent transactions"
      icon="/recent_transactions.svg"
      expanded={isExpanded}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="divide-y divide-[#E5E9F2]">
        <div className="px-6 py-4">{renderTransactions()}</div>
        {cardTransactions && cardTransactions.length > 4 && (
          <div className="flex justify-center">
            <button
              onClick={handleViewAllClick}
              className="cursor-pointer w-full text-center bg-background-green-light border-background-green-lighter text-highlight-green font-bold text-sm transition-colors py-4 rounded-md"
            >
              {showAllTransactions ? "Show less" : "View all card transactions"}
            </button>
          </div>
        )}
      </div>
    </Accordion>
  );
};

export default RecentTransactions;
