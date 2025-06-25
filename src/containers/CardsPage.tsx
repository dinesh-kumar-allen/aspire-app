"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Card, CardAction, AddCardFormData } from "@/interfaces/cards";
import AddCardModal from "@/components/AddCardModal";
import Tabs from "@/components/Tabs";
import { useTabs } from "@/hooks/useTabs";
import Image from "next/image";
import { useCards } from "@/contexts/CardsContext";
import CardsContainer from "@/containers/CardsContainer";
import Loading from "@/components/Loading";

const TABS = [
  { id: "debit", label: "My Debit Cards" },
  { id: "company", label: "All Company Cards" },
];

export default function CardsPage() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);

  const {
    getDebitCards,
    getAllCards,
    addCard,
    updateCard,
    getTotalBalance,
    state: { loading, error },
  } = useCards();

  const { activeTabId, setActiveTab } = useTabs(TABS, "debit");

  const currentCards = useMemo(() => {
    return activeTabId === "debit" ? getDebitCards() : getAllCards();
  }, [activeTabId, getDebitCards, getAllCards]);

  const handleAddCard = (
    formData: Omit<AddCardFormData, "initialBalance"> & {
      initialBalance: number;
    }
  ) => {
    const newCard: Card = {
      id: Date.now().toString(),
      cardNumber: formData.cardNumber,
      cardHolder: formData.cardHolder,
      expiry: formData.expiry,
      cardCompany: formData.cardCompany,
      isActive: false,
      isFrozen: false,
      balance: formData.initialBalance,
      cardType: formData.cardType,
    };

    const isCompany = activeTabId === "company";
    addCard(newCard, isCompany);
  };

  const handleCardAction = (action: CardAction) => {
    const activeCard = currentCards[activeCardIndex];
    if (!activeCard) return;

    switch (action.id) {
      case "freeze":
        const isCompany = activeTabId === "company";
        updateCard(
          activeCard.id,
          { isFrozen: !activeCard.isFrozen },
          isCompany
        );
        break;
      case "spend-limit":
        alert("Set spend limit for card:" + activeCard.cardHolder);
        break;
      case "gpay":
        alert("Add to GPay:" + activeCard.cardHolder);
        break;
      case "replace":
        alert("Replace card:" + activeCard.cardHolder);
        break;
      case "deactivate":
        alert("Deactivate card:" + activeCard.cardHolder);
        break;
    }
  };

  const renderHeader = useCallback(() => {
    return (
        <div className="w-full-available lg:mx-15 px-2 py-6" data-testid="header">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-base text-white lg:text-black">Available Balance</p>
                  <p className="text-2xl font-bold text-white lg:text-black text-center flex items-center justify-start mt-2.25">
                    <span className="text-white bg-highlight-green px-2 py-1 rounded-md text-sm mr-2">
                      S$
                    </span>{" "}
                    {getTotalBalance("all").toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsAddCardModalOpen(true)}
              className="flex items-center gap-2  lg:bg-highlight-blue text-accent-blue lg:text-white px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
              data-testid="new-card-btn"
            >
              <Image src="/add.svg" alt="Add" width={16} height={16} className="hidden lg:block" />
              <Image src="/plus.svg" alt="Add" width={16} height={16} className="block lg:hidden" />

              New Card
            </button>
          </div>
        </div>
    );
  }, [getTotalBalance, setIsAddCardModalOpen]);

  const renderError = useCallback(() => {
    return (
      error && (
        <div className="w-full-available lg:mx-15 px-2 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )
    );
  }, [error]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <main className="flex-1 bg-highlight-blue lg:bg-white min-h-screen">
      {renderHeader()}
      {renderError()}

      <div className="w-full-available px-0 lg:px-2 lg:py-6 lg:mx-15">
        <Tabs
          tabs={TABS}
          activeTabId={activeTabId}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            setActiveCardIndex(0);
          }}
          className="mb-4"
          data-testid="tabs"
        />

        <CardsContainer
          cards={currentCards}
          activeCardIndex={activeCardIndex}
          onCardChange={setActiveCardIndex}
          onCardAction={handleCardAction}
          data-testid="cards-container"
        />
      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSubmit={handleAddCard}
        data-testid="add-card-modal"
      />
    </main>
  );
}
