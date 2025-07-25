import Grid from "@/components/calendar/Grid";
import Header from "@/components/calendar/Header";
import Timeline from "@/components/calendar/TimeLine";
// (new Date().getDay()) // Current day of the week (0-6)


export default function Home() {

  return (
    <div className="flex flex-row">
      <Timeline />
      <div className="flex flex-col w-full">
        <Header />
        <Grid />
      </div>
    </div>
  );
}
