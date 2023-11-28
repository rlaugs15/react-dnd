import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { styled } from "styled-components";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import Board from "./Board";

import TrashCan from "./TrashCan";
import { useForm } from "react-hook-form";
import { useState } from "react";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: sticky;
  top: 0;
`;

const Title = styled.div`
  margin-bottom: 6px;
  font-size: 21px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #008b8b;
  padding: 15px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const Input = styled.input`
  border-radius: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const TrashCanWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: -70px;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

interface IForm {
  newboards: string;
}

function Home() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  //새로운 보드 추가
  const createBoard = ({ newboards }: IForm) => {
    setToDos((allBoards) => {
      const obj = { ...allBoards };
      const newObj = Object.entries(obj);
      const updateBoards = [...newObj, [newboards, []]];
      const newBoards = Object.fromEntries(updateBoards);
      return {
        ...newBoards,
      };
    });
    setValue("newboards", "");
  };

  const onDragEnd = (info: DropResult) => {
    const { source, destination } = info;
    if (!destination) return;
    //같은 보드로 드래그할 때
    if (source.droppableId === destination.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const value = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, value);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    //다른 보드로 드래그할 때
    if (source.droppableId !== destination.droppableId) {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const destinationCopy = [...allBoards[destination.droppableId]];
        const value = sourceCopy[source.index];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination?.index, 0, value);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
      });
    }
    //쓰레기통으로 넣을 때
    if (destination.droppableId === "trashCan") {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        sourceCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
        };
      });
    }
  };
  return (
    <>
      <FormWrapper>
        <Title>Create Board</Title>
        <Form onSubmit={handleSubmit(createBoard)}>
          <Input {...register("newboards")} />
        </Form>
      </FormWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <TrashCanWrapper>
            <TrashCan boardId={"trashCan"} index={0} />
          </TrashCanWrapper>
          <Boards>
            {Object.keys(toDos)
              .filter((boards) => "trashCan" !== boards)
              .map((boardId) => (
                <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default Home;
