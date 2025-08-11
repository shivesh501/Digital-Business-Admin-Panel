/*
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import useBoard from '../../store/Board';
import './Board.css';
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import AddCardModal from '../../Components/AddCardModal/AddCardModal';

const Boards = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { board, setBoard } = useBoard();

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === 'COLUMN') {
      const reorderedColumns = Array.from(board.columns);
      const [moved] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, moved);
      setBoard({ ...board, columns: reorderedColumns });
    } else {
      const sourceCol = board.columns[source.droppableId];
      const destCol = board.columns[destination.droppableId];
      const sourceCards = Array.from(sourceCol.cards);
      const destCards = Array.from(destCol.cards);
      const [moved] = sourceCards.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceCards.splice(destination.index, 0, moved);
        const updatedColumn = { ...sourceCol, cards: sourceCards };
        const updatedColumns = [...board.columns];
        updatedColumns[source.index] = updatedColumn;
        setBoard({ ...board, columns: updatedColumns });
      } else {
        destCards.splice(destination.index, 0, moved);
        const updatedColumns = board.columns.map((col, index) => {
          if (index === +source.droppableId) return { ...col, cards: sourceCards };
          if (index === +destination.droppableId) return { ...col, cards: destCards };
          return col;
        });
        setBoard({ ...board, columns: updatedColumns });
      }
    }
  };

  return (
    <div className="board-container">
      <span>Trello Board</span>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
              {board.columns.map((column, colIndex) => (
                <Draggable draggableId={`col-${colIndex}`} index={colIndex} key={`col-${colIndex}`}>
                  {(provided) => (
                    <div className="column" ref={provided.innerRef} {...provided.draggableProps}>
                      <div className="column-header" {...provided.dragHandleProps}>
                        <span>{column.title}</span>
                        <IoMdAdd onClick={() => setModalOpened(true)} />
                      </div>
                      <Droppable droppableId={`${colIndex}`} type="CARD">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="card-list">
                            {column.cards.map((card, cardIndex) => (
                              <Draggable
                                key={card.id}
                                draggableId={`card-${card.id}`}
                                index={cardIndex}
                              >
                                {(provided) => (
                                  <div
                                    className="kanban-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div>
                                      <span>{card.title}</span>
                                      <button
                                        className="remove-button"
                                        onClick={() => {
                                          const updatedCards = column.cards.filter(c => c.id !== card.id);
                                          const updatedColumns = [...board.columns];
                                          updatedColumns[colIndex] = {
                                            ...column,
                                            cards: updatedCards,
                                          };
                                          setBoard({ ...board, columns: updatedColumns });
                                        }}
                                      >
                                        <RxCross2 size={15} />
                                      </button>
                                    </div>
                                    <span>{card.description}</span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {modalOpened && (
        <AddCardModal
          visible={modalOpened}
          onClose={() => setModalOpened(false)}
          handleCardAdd={(title, description) => {
            const card = {
              id: new Date().getTime(),
              title,
              description,
            };
            const updatedColumns = [...board.columns];
            updatedColumns[0].cards.push(card); // Add to first column for demo
            setBoard({ ...board, columns: updatedColumns });
            setModalOpened(false);
          }}
        />
      )}
    </div>
  );
};

export default Boards;
*/

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import useBoard from '../../store/Board';
import './Board.css';
import { RxCross2 } from 'react-icons/rx';
import { IoMdAdd } from 'react-icons/io';
import AddCardModal from '../../Components/AddCardModal/AddCardModal';

const Boards = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [currentColumnIndex, setCurrentColumnIndex] = useState(null);
  const { board, setBoard } = useBoard();

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'COLUMN') {
      const reorderedColumns = Array.from(board.columns);
      const [moved] = reorderedColumns.splice(source.index, 1);
      reorderedColumns.splice(destination.index, 0, moved);
      setBoard({ ...board, columns: reorderedColumns });
    } else {
      const sourceCol = board.columns[source.droppableId];
      const destCol = board.columns[destination.droppableId];
      const sourceCards = Array.from(sourceCol.cards);
      const destCards = Array.from(destCol.cards);
      const [moved] = sourceCards.splice(source.index, 1);

      if (source.droppableId === destination.droppableId) {
        sourceCards.splice(destination.index, 0, moved);
        const updatedColumn = { ...sourceCol, cards: sourceCards };
        const updatedColumns = [...board.columns];
        updatedColumns[source.droppableId] = updatedColumn;
        setBoard({ ...board, columns: updatedColumns });
      } else {
        destCards.splice(destination.index, 0, moved);
        const updatedColumns = board.columns.map((col, index) => {
          if (index === +source.droppableId) return { ...col, cards: sourceCards };
          if (index === +destination.droppableId) return { ...col, cards: destCards };
          return col;
        });
        setBoard({ ...board, columns: updatedColumns });
      }
    }
  };

  const handleCardDelete = (colIndex, cardId) => {
    const updatedColumns = [...board.columns];
    updatedColumns[colIndex] = {
      ...board.columns[colIndex],
      cards: board.columns[colIndex].cards.filter((c) => c.id !== cardId),
    };
    setBoard({ ...board, columns: updatedColumns });
  };

  const handleCardAdd = (title, description) => {
    if (currentColumnIndex === null) return;
    const card = {
      id: new Date().getTime(),
      title,
      description,
    };
    const updatedColumns = [...board.columns];
    updatedColumns[currentColumnIndex].cards.push(card);
    setBoard({ ...board, columns: updatedColumns });
    setModalOpened(false);
    setCurrentColumnIndex(null);
  };

  return (
    <div className="board-container">
      <span>Trello Board</span>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div className="board" ref={provided.innerRef} {...provided.droppableProps}>
              {board.columns.map((column, colIndex) => (
                <Draggable draggableId={`col-${colIndex}`} index={colIndex} key={`col-${colIndex}`}>
                  {(provided) => (
                    <div className="column" ref={provided.innerRef} {...provided.draggableProps}>
                      <div className="column-header" {...provided.dragHandleProps}>
                        <span>{column.title}</span>
                        <IoMdAdd
                          onClick={() => {
                            setCurrentColumnIndex(colIndex);
                            setModalOpened(true);
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                      <Droppable droppableId={`${colIndex}`} type="CARD">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps} className="card-list">
                            {column.cards.map((card, cardIndex) => (
                              <Draggable
                                key={card.id}
                                draggableId={`card-${card.id}`}
                                index={cardIndex}
                              >
                                {(provided) => (
                                  <div
                                    className="kanban-card"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div className="card-header">
                                      <span>{card.title}</span>
                                      <button
                                        className="remove-button"
                                        onClick={() => handleCardDelete(colIndex, card.id)}
                                      >
                                        <RxCross2 size={15} />
                                      </button>
                                    </div>
                                    <span>{card.description}</span>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {modalOpened && (
        <AddCardModal
          visible={modalOpened}
          onClose={() => setModalOpened(false)}
          handleCardAdd={handleCardAdd}
        />
      )}
    </div>
  );
};

export default Boards;
