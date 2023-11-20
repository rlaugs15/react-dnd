import { Draggable, Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { IToDo, toDoState } from "./atoms";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import { title } from "process";

const Wrapper = styled.div`
  background-color: yellowgreen;
  border-radius: 5px;
`;

const Area = styled.div`
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 7px;
`;

const TitleInput = styled.input`
  border-radius: 5px;
  margin: 2px 7px;
  text-align: center;
`;

const Input = styled.input<{ isInput: boolean }>`
  border-radius: 5px;
  background-color: ${(props) => (props.isInput ? "greenyellow" : "white")};
  margin: 0 2px;
`;

interface BoardIdProps {
  boardId: string;
  toDos: IToDo[];
}

interface IForm {
  title: string;
  toDo: string;
}

function Board({ boardId, toDos }: BoardIdProps) {
  const [isInput, setIsInput] = useState(true);
  const [toDo, setToDos] = useRecoilState(toDoState);

  const { register, setValue, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: `${boardId}`,
    },
  });

  const foCusChange = () => setIsInput((prev) => !prev);
  const onSubmit = (info: IForm) => {
    console.log("인풋", info);
    const { toDo } = info;

    /*   if (title !== boardId) {
      setToDos((allBoards) => {
        const targetValue = [...allBoards[boardId]];
        const newObject = { ...allBoards, [title]: targetValue };
        delete newObject[boardId]; // 기존 boardId 제거
        return newObject;
      });
    } */
    setToDos((allToDos) => {
      const newToDo = { id: Date.now(), text: toDo }; //toDo가 IFrom타입이라
      return {
        ...allToDos,
        [boardId]: [...toDos, newToDo],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <TitleInput {...register("title")} /> */}
        <Input
          {...register("toDo")}
          placeholder={isInput ? "" : `${boardId}를 입력하시오`}
          onFocus={foCusChange}
          onBlur={foCusChange}
          isInput={isInput}
        />
      </Form>
      <Droppable key={boardId} droppableId={boardId}>
        {(provided) => (
          <Area ref={provided.innerRef} {...provided.droppableProps}>
            {toDos.map((toDo, index) => (
              <DragabbleCard
                toDo={toDo.id}
                index={index}
                key={toDo.id}
                text={toDo.text}
              />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(Board);
