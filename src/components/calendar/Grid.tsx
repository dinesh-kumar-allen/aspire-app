"use client";
import { useCallback, useState } from "react";

const calendarGrid = Array.from({ length: 7 }, (_, columnIndex) => {
  return Array.from({ length: 24 }, (_, rowIndex) => {
    return {
      index: `${columnIndex}_${rowIndex}`,
    };
  });
});

export interface ICalendarEvent {
  id: string;
  title: string;
  day: string;
  startTime: string;
  endTime: string;
  participants: string[];
}
const calendarEvents: ICalendarEvent[] = [
  {
    id: "1",
    title: "Test Title",
    day: "1", // 0 - 6
    startTime: "10:00",
    endTime: "11:00",
    participants: ["John Doe", "Jane Doe"],
  },
];

const Grid = () => {
  const [eventMap, setEventMap] = useState<Record<string, ICalendarEvent>>(calendarEvents.reduce((acc, event) => {
    acc[event.day + "_" + event.startTime] = event;
    return acc;
  }, {} as Record<string, ICalendarEvent>))

  const handleDragStart = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.persist()
      event.stopPropagation();
      event.dataTransfer.setData("text", event.target.id);
      event.dataTransfer.effectAllowed = "move";
      console.log("dragstart", event);
    },
    []
  );
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
    //   event.preventDefault();
      console.log("dragover", event);
      event.dataTransfer.dropEffect = "move";
    },
    []
  );
  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // event.preventDefault();
    console.log("drop", event);
  }, []);

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    // event.preventDefault();
    console.log("dragend", event);
  }, []);

  return (
    <div id="calendar-grid" className="grid grid-cols-7">
      {calendarGrid.map((row, columnIndex) => (
        <div key={columnIndex} className="grid grid-rows-24 text-center">
          {row.map((cell, rowIndex) => {
            const cellId = `${columnIndex}_${
              rowIndex > 10 ? `${rowIndex - 1}:00` : `0${rowIndex}:00`
            }`;
            const event = eventMap[cellId]?.title;
            return (
              <div
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={event ? undefined : handleDrop}
                onDragEnd={handleDragEnd}
                className="border-1 border-gray-200 p-2 my-0.25 flex flex-col items-center justify-center cursor-pointer"
                id={cellId}
                key={cell.index}
                draggable={event ? true : false}
              >
                {event}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
