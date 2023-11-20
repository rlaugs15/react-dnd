import { styled } from "styled-components";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { darkState, darkTheme } from "./theme";

const Wrapper = styled.div`
  display: flex;
`;

const Icon = styled.div`
  display: flex;
  border-radius: 5px;
  margin: 7px;
  font-size: 22px;
  padding: 10px;
  color: ${(props) =>
    props.theme.bgColor === "#353b48" ? "#F57C00" : "#FEFD48"};
  background-color: ${(props) =>
    props.theme.bgColor === "#353b48" ? "#F7F8E0" : "navy"};
`;

function DarkModeBtn() {
  const [dark, setDark] = useRecoilState(darkState);
  const onClick = () => {
    setDark((isDark) => !isDark);
  };
  return (
    <Wrapper>
      <Icon onClick={onClick}>
        {dark ? <BsFillSunFill /> : <BsFillMoonFill />}
      </Icon>
    </Wrapper>
  );
}

export default DarkModeBtn;
