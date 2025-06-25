import { CardsProvider } from "@/contexts/CardsContext";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

const CardsPageLazy = dynamic(() => import("@/containers/CardsPage"), {
  loading: () => <Loading />,
});

export default function CardsPage() {
  return (
    <CardsProvider>
      <CardsPageLazy />
    </CardsProvider>
  );
}
