import { DefaultTheme } from "styled-components";
import { atom } from "recoil";

export const lightTheme: DefaultTheme = {
  bgColor: "#F7F8E0",
  textColor: "black",
  accentColor: "#FF6F00",
  divColor: "lavender",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#353b48",
  textColor: "#f5f6fa",
  accentColor: "#44bd32",
  divColor: "black",
};

export const darkState = atom({
  key: "dark",
  default: false,
});
