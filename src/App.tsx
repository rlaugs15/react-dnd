import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import reset from "styled-reset";
import DarkModeBtn from "./thems/DarkModeBtn";
import { useRecoilValue } from "recoil";
import { darkState, darkTheme, lightTheme } from "./thems/theme";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
 ${reset}
 * {
  box-sizing: border-box;
}
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
  text-decoration:none;
  color: inherit;
}
`;

function App() {
  const isDark = useRecoilValue(darkState);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <DarkModeBtn />
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
