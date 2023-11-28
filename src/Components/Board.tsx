import { styled } from "styled-components";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { IToDo, toDoState } from "./atoms";
import DragabbleCard from "./DragabbleCard";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { BiCommentX } from "react-icons/bi";

const Wrapper = styled.div`
  background-color: yellowgreen;
  border-radius: 5px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-top: 4px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Btn = styled(BiCommentX)`
  font-size: 20px;
`;

const Area = styled.div<{ draggingOver: boolean }>`
  min-height: 250px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.draggingOver ? "#A5DF00" : "yellowgreen"};
  transition: background-color 0.5s ease-in-out;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  font-weight: 500;
`;

const TInput = styled.input`
  text-align: center;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 7px;
`;

const Input = styled.input`
  border-radius: 5px;
  margin: 0 7px;
`;

interface BoardProps {
  boardId: string;
  toDos: IToDo[];
}

interface IForm {
  toDo: string;
  title: string;
}

function Board({ boardId, toDos }: BoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>({
    defaultValues: {
      title: `${boardId}`,
    },
  });
  //타이틀 수정
  const onTitle = ({ title }: IForm) => {
    if (boardId === title) return;
    setToDos((allToDos) => {
      // title과 일치하는 boardId가 이미 존재하는지 확인
      const isTitleExists = Object.keys(allToDos).some((key) => key === title);
      // 일치하는 boardId가 있으면 종료
      if (isTitleExists) {
        setValue("title", `${boardId}`);
        return allToDos;
      }

      const oldTitleValue = [...allToDos[boardId]];
      const toDos = { ...allToDos };
      const obj = Object.entries(toDos);

      const targetIndex = obj.findIndex((toDo) => toDo[0] === boardId);
      if (targetIndex !== -1) {
        obj.splice(targetIndex, 1, [title, oldTitleValue]);
        const updatedToDos = Object.fromEntries(obj);

        return updatedToDos;
      } else {
        return allToDos;
      }
    });
  };
  //카드 리스트 추가
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((allToDos) => {
      const value = [...allToDos[boardId]];
      return {
        ...allToDos,
        [boardId]: [...value, { id: Date.now(), text: toDo }],
      };
    });
    setValue("toDo", "");
  };
  //보드 삭제 버튼
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDos((allBoards) => {
      const arrayBoards = Object.entries({ ...allBoards });
      const filteredBoards = arrayBoards.filter(
        (boards) => boards[0] !== value
      );
      const finish = Object.fromEntries(filteredBoards);
      return {
        ...finish,
      };
    });
  };

  return (
    <Wrapper>
      <BtnWrapper>
        <Button value={boardId} onClick={onClick}>
          <Btn />
        </Button>
      </BtnWrapper>
      <Title>
        <form onSubmit={handleSubmit(onTitle)}>
          <TInput {...register("title")} type="text" />
        </form>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("toDo")} placeholder={`${boardId}를 입력하시오`} />
      </Form>
      <Droppable droppableId={boardId} key={boardId}>
        {(provided, snapshot) => (
          <Area
            ref={provided.innerRef}
            {...provided.droppableProps}
            draggingOver={Boolean(snapshot.isDraggingOver)}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                toDoId={toDo.id}
                text={toDo.text}
                key={toDo.id}
                index={index}
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
