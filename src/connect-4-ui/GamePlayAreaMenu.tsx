import styled from "styled-components";
import MenuButton from "./MenuButton";

const StyledMenu = styled.menu`
  /* background-color: #2772db; */
  background-color: #d5eeff;
  position: sticky;
  top: 0;
  min-height: 60px;
  /* height: 80px; */
  width: 100%;
  display: flex;
  align-items: center;
  margin: -2px;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const GamePlayAreaMenu = ({
  children,
}: {
  children?:
    | Array<React.ReactElement<typeof MenuButton>>
    | React.ReactElement<typeof MenuButton>;
}) => {
  return (
    <StyledMenu>
      {children}
      {/* <MenuButton text={"Button!"} /> */}
    </StyledMenu>
  );
};

export default GamePlayAreaMenu;
