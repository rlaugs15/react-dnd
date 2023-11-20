import { styled } from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

const Card = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0px 10px;
  margin-bottom: 5px;
  background-color: green;
  color: black;
`;

interface DragabbleCardProps {
  toDo: number;
  index: number;
  text: string;
}

function DragabbleCard({ toDo, index, text }: DragabbleCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo + ""} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
