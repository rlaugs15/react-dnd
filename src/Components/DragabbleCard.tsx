import { styled, keyframes } from "styled-components";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = styled.div`
  padding: 5px 10px;
  border-radius: 5px;
  margin: 0px 10px;
  margin-bottom: 5px;
  background-color: green;
  color: black;
`;

const Area = styled.div`
  background-color: #5fb404;
  border-radius: 5px;
  padding: 7px 5px;
  margin: 10px;
`;

interface DragabbleCardProps {
  toDoId: number;
  text: string;
  index: number;
}

function DragabbleCard({ toDoId, text, index }: DragabbleCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(provided, snapshot) => (
        <Area
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </Area>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
