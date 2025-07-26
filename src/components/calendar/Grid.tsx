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
      event.stopPropagation();
      const target = event.target as HTMLElement;
      if (target.id) {
        event.dataTransfer.setData("text", target.id);
        event.dataTransfer.effectAllowed = "move";
      }
    },
    []
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.persist();
    
    const target = event.target as HTMLElement;
    const draggedId = event.dataTransfer.getData("text");
    const targetId = target.id;
    
    if (targetId && draggedId) {
      setEventMap(prev => {
        const newMap = { ...prev };
        const [day, startTime] = targetId.split("_")
        newMap[targetId] = {
          ...prev[draggedId],
          day: day,
          startTime: startTime,
          endTime: (parseInt(startTime.split(":")[0]) + 1) + ":00",
        };
        delete newMap[draggedId];
        return newMap;
      });
    }
  }, []);

  const handleDragEnd = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    console.log("dragend", event);
  }, []);

  return (
    <div 
      id="calendar-grid" 
      className="grid grid-cols-7"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      {calendarGrid.map((row, columnIndex) => (
        <div key={columnIndex} className="grid grid-rows-24 text-center">
          {row.map((cell, rowIndex) => {
            const cellId = `${columnIndex}_${
              rowIndex > 10 ? `${rowIndex - 1}:00` : `0${rowIndex}:00`
            }`;
            const event = eventMap[cellId]?.title;
            return (
              <div
                className={`border-1 border-gray-200 p-2 my-0.25 flex flex-col items-center justify-center ${
                  event ? 'bg-blue-100' : 'cursor-pointer hover:bg-gray-50'
                }`}
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
