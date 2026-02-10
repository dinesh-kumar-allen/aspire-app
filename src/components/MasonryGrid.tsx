import React, { useCallback, useEffect, useMemo, useRef } from "react";

import {
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  MasonryCellProps,
} from "react-virtualized";
import PinItem from "./PinItem";
import { IPinItem } from "@/app/types/pinItem";
import useColumnChange from "@/app/hooks/useColumnChange";

const columnWidth = 300;
const defaultHeight = 350;
const defaultWidth = columnWidth;

const cache = new CellMeasurerCache({
  defaultHeight,
  defaultWidth,
  fixedWidth: true,
});

const MasonryGridV3 = ({ pins }: { pins: IPinItem[] }) => {
  const masonryRef = useRef<Masonry | null>(null);

  const setMasonry = useCallback((node: Masonry | null) => {
    masonryRef.current = node;
  }, []);
  const columns = useColumnChange();

  const cellPositioner = useMemo(
    () =>
      createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount: columns,
        columnWidth,
        spacer: 20,
      }),
    [columns]
  );

  const itemsWithSizes = useMemo(
    () =>
      pins.map((pin) => {
        return {
          item: pin,
          size: {
            width: pin.imageData.width,
            height: pin.imageData.height + 50,
          },
        };
      }),
    [pins]
  );

  useEffect(() => {
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.recomputeCellPositions();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [columns]);

  const keyMapper = useCallback(
    (rowIndex: number) => {
      return itemsWithSizes?.[rowIndex]?.item?.pinId || rowIndex;
    },
    [itemsWithSizes]
  );

  const cellRenderer = ({ index, key, parent, style }: MasonryCellProps) => {
    if (!itemsWithSizes?.[index]) {
      return null;
    }
    const { item, size } = itemsWithSizes[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <div style={{ minWidth: size.width, minHeight: size.height }}>
            <PinItem {...item} />
          </div>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <div className="w-full h-full px-2">
      <Masonry
        autoHeight={false}
        cellCount={itemsWithSizes.length}
        cellMeasurerCache={cache}
        cellPositioner={cellPositioner}
        cellRenderer={cellRenderer}
        height={window?.innerHeight}
        width={window?.innerWidth}
        keyMapper={keyMapper}
        ref={setMasonry}
      />
    </div>
  );
};

export default MasonryGridV3;
