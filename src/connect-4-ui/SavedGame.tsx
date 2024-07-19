import styled from "styled-components";

type SavedGameProps = {
  gameId: string;
  dateSaved: Date;
  handleLoadGame?: () => void;
};

const StyledGameAndDate = styled.div`
  margin: 10px;
  padding: 10px;
  color: #f5ebeb;
`;

const StyledSavedGame = styled.div`
  min-width: 80%;
  display: flex;
  outline: 2px solid #f5ebeb;
  flex-direction: row;
  margin: 15px;
`;

const StyledButton = styled.button`
  color: #32424a;
  background: #f5ebeb;
  min-height: 50px;
  min-width: 100px;

  &:hover {
    outline: 3px solid #f5ebeb;
    cursor: pointer;
  }
`;

const SavedGame = ({ gameId, dateSaved, handleLoadGame }: SavedGameProps) => {
  return (
    <StyledSavedGame>
      <StyledGameAndDate>
        <p>Game ID: {gameId}</p>
        <p>Date Saved: {dateSaved.toString()}</p>
        <StyledButton onClick={handleLoadGame}>Load Game</StyledButton>
      </StyledGameAndDate>
    </StyledSavedGame>
  );
};

export default SavedGame;
