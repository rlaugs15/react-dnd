import { FaTrashAlt } from "react-icons/fa";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

const Area = styled.div<{ isDraggingOver: boolean }>`
  background-color: ${(props) => (props.isDraggingOver ? "red" : "green")};
  padding: 4px 2px;
  border-radius: 5px;
  transition: background-color 0.2s ease-in-out;
`;

const FaTrash = styled.div``;

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
          <Draggable draggableId={boardId} index={index}>
            {(provided) => (
              <FaTrash ref={provided.innerRef}>
                <FaTrashCan />
              </FaTrash>
            )}
          </Draggable>
        </Area>
      )}
    </Droppable>
  );
}

export default TrashCan;
