import { create } from "zustand";
import { boardData } from "../data/data";

/*
const useBoard = create((set) => ({
  board: boardData,

  // Setter to update the whole board
  setBoard: (newBoard) => set({ board: newBoard }),

  // Optional: Reset board to initial state
  resetBoard: () => set({ board: boardData }),
}));

export default useBoard;
*/


const useBoard = create((set) => ({
  board: boardData,

  setBoard: (board) => set(() => ({ board })),

  deleteCard: (columnId, cardId) => {
    set((state) => {
      const updatedBoard = { ...state.board };

      // If your data is stored like board.columns = [{ id, cards: [] }]
      updatedBoard.columns = updatedBoard.columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            cards: column.cards.filter((card) => card.id !== cardId),
          };
        }
        return column;
      });

      return { board: updatedBoard };
    });
  },
}));

export default useBoard;

