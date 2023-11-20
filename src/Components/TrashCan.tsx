import { FaTrashAlt } from "react-icons/fa";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Area = styled.div<{ isDraggingOver: boolean }>`
  padding: 10px 0px;
  border-radius: 5px;
  background-color: ${(props) => (props.isDraggingOver ? "red" : "green")};
  min-height: 70px;
  max-height: 70px;
  min-width: 60px;
  max-width: 60px;
  padding: 5px;
  transition: background-color 0.2s ease-in-out;
`;

const Garbage = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FaTrashCan = styled(FaTrashAlt)`
  font-size: 56px;
`;

interface TrashCanProps {
  boardId: string;
  index: number;
}

function TrashCan({ boardId, index }: TrashCanProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Area
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          <Draggable key={boardId} draggableId={boardId} index={index}>
            {(provided) => (
              <Garbage ref={provided.innerRef}>
                <FaTrashCan />
              </Garbage>
            )}
          </Draggable>
          {provided.placeholder}
        </Area>
      )}
    </Droppable>
  );
}

export default TrashCan;
