import styled from "styled-components";
import SavedGame from "./SavedGame";

const StyledLoadGameDialog = styled.div`
  border: 2px solid blue;
  background: beige;
`;

const StyledHeading = styled.h1`
  text-align: center;
  font-family: monospace;
  font-weight: 700;
  color: blue;
  text-decoration: underline dashed;
`;

const StyledSavedGames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
`;

const StyledCloseButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  color: blue;
  border: none;

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    cursor: pointer;
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

      {children ?? <StyledSavedGames>No Saved Games</StyledSavedGames>}
    </StyledLoadGameDialog>
  );
};

export default LoadGameDialog;
