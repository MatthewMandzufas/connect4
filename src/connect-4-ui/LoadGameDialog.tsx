import styled from "styled-components";
import SavedGame from "./SavedGame";

const StyledLoadGameDialog = styled.div`
  border: 2px solid blue;
  background: beige;
  min-height: 20vh;
  min-width: 60vw;
`;

const StyledHeading = styled.h1`
  text-align: center;
  font-family: monospace;
  font-weight: 700;
  color: blue;
  margin: 10px;
  text-decoration: underline dashed;
`;

const StyledSavedGames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const StyledCloseButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  color: red;
  /* outline: 3px solid black; */
  border: none;

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    cursor: pointer;
    outline: 3px red solid;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

type LoadGameDialogProps = {
  onCloseDialogClick?: () => void;
  children?:
    | Array<React.ReactElement<typeof SavedGame>>
    | React.ReactElement<typeof SavedGame>;
};

const LoadGameDialog = ({
  onCloseDialogClick = () => {},
  children,
}: LoadGameDialogProps) => {
  return (
    <StyledLoadGameDialog>
      <StyledHeader>
        <StyledHeading>Saved Games</StyledHeading>
        <StyledCloseButton onClick={onCloseDialogClick}>X</StyledCloseButton>
      </StyledHeader>

      <StyledSavedGames>{children ?? "No Saved Games"}</StyledSavedGames>
    </StyledLoadGameDialog>
  );
};

export default LoadGameDialog;
