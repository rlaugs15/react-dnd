import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[];
}

const { persistAtom } = recoilPersist({
  key: "localStorage", //원하는 key 값 입력
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

export const boardState = atom({
  key: "board",
  default: [],
});
