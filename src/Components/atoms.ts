import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: IToDo[];
}

const { persistAtom } = recoilPersist({
  key: "toDo",
  storage: localStorage,
});

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    trashCan: [],
    toDo: [],
    doing: [],
    done: [],
  },
  effects_UNSTABLE: [persistAtom],
});

/* type BoardEntry = [string, IToDo[]];
폐기하고 Object.entries로 해결
export const boardSelector = selector<BoardEntry[]>({
  key: "board",
  get: ({ get }) => {
    const toDo = get(toDoState);
    const boards = Object.entries(toDo);
    console.log(boards);

    return boards;
  },
   배열이 된 get을 set함수로 호출하여 수정하고 반환하면 Object.fromEntries에 의해 객체가 돼서
  toDoState에 반환 
  set: ({ set }, newValue) => {
    const newBoard = Object.fromEntries(
      newValue as Iterable<readonly [PropertyKey, IToDo[]]>
    );
    set(toDoState, newBoard);
  },
}); */
