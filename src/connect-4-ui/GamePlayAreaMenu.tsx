import styled from "styled-components";
import MenuButton from "./MenuButton";

const StyledMenu = styled.menu`
  background-color: #d5eeff;
  position: sticky;
  top: 0;
  height: 70px;
  display: flex;
  align-items: center;
  margin-top: -2px;
  margin-bottom: -2px;
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
  return <StyledMenu>{children}</StyledMenu>;
};

export default GamePlayAreaMenu;
