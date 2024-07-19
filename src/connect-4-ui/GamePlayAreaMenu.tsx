import styled from "styled-components";
import MenuButton from "./MenuButton";

const StyledMenu = styled.div`
  background-color: #385170;
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  outline: 5px solid #142d4c;
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
