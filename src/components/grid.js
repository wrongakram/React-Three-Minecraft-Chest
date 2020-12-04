// Component: Grid
// Def: The grid inside the chestmodal that allows all the blocks to live

import React from "react";
import SmartBlocks from "./smartBlocks";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Grid = ({ chestState, updateChestState, inventoryType }) => {
  // Function to update the immer state
  function updateItem(blockFrom, blockTo, item) {
    // If dragging to new inventory type run this
    if (item.inventoryType != inventoryType) {
      updateChestState((draft) => {
        draft[item.inventoryType][blockFrom].item = null;
        draft[inventoryType][blockTo].item = item.id;
      });
      // Update item from the same inventory type
    } else {
      updateChestState((draft) => {
        draft[inventoryType][blockFrom].item = null;
        draft[inventoryType][blockTo].item = item.id;
      });
    }
  }

  // Function will grab where our blocks are coming from and going to and store them in a var for their ids
  // then run the update item function
  const moveItem = (from, to, item) => {
    const blockFrom = `block${from.replaceAll(",", "")}`;
    const blockTo = `block${to.replaceAll(",", "")}`;
    updateItem(blockFrom, blockTo, item);
  };

  // Get the the X & Y of block
  const getXYPosition = (i) => {
    const x = i % 9;
    const y = Math.floor(i / 9);
    return { x, y };
  };

  // Return X & Y of the block in an array string
  const getPosition = (i) => {
    const { x, y } = getXYPosition(i);
    const block = [x, y];
    return `${block}`;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='grid'>
        {Object.keys(chestState[inventoryType]).map(function (key, index) {
          return (
            <div key={index}>
              <SmartBlocks
                inventoryType={inventoryType}
                moveItem={moveItem}
                item={chestState[inventoryType][key]}
                position={getPosition(index)}
              />
            </div>
          );
        })}
      </div>
    </DndProvider>
  );
};

export default Grid;
