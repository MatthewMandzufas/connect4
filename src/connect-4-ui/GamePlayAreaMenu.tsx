import styled from "styled-components";
import MenuButton from "./MenuButton";

const StyledMenu = styled.menu`
  background-color: #385170;
  position: sticky;
  top: 0;
  left: 0;
  min-height: 70px;
  display: flex;
  align-items: center;
  margin-top: -2px;
  margin-bottom: -2px;
  /* flex-wrap: wrap; */
  justify-content: space-evenly;
  gap: 10px;
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
