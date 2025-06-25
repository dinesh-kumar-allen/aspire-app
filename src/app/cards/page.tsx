import { CardsProvider } from "@/contexts/CardsContext";
import Cards from "@/pages/CardsPage";

export default function CardsPage() {
  return (
    <CardsProvider>
      <Cards />
    </CardsProvider>
  );
}
