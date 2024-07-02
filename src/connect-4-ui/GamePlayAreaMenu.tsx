import styled from "styled-components";

const StyledMenu = styled.menu`
  /* background-color: #2772db; */
  background-color: #f5ebeb;
  position: sticky;
  top: 0;
  min-height: 60px;
  height: 80px;
  width: 100%;
  display: flex;
  margin: -2px;
`;

const GamePlayAreaMenu = () => {
  return <StyledMenu></StyledMenu>;
};

export default GamePlayAreaMenu;
