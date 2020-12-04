// Component: SmartBlocks
// Def: These are the individual blocks that know their position on the grid and accept draggable items

import React from "react";
import { useDrop } from "react-dnd";
// Components
import Item from "./item";

const SmartBlocks = ({ item, position, moveItem, inventoryType }) => {
  // Using the useDrop hook from dnd
  const [{ isOver }, drop] = useDrop({
    accept: "item",
    drop: (item) => {
      moveItem(item.position, position, item);
    },
    // collect allows to monitor certain commands such is isOver for when we are over a specific block
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`${isOver ? "grid-item is-over" : "grid-item"}`} ref={drop}>
      {item.item && (
        <Item item={item} position={position} inventoryType={inventoryType} />
      )}
    </div>
  );
};

export default SmartBlocks;
