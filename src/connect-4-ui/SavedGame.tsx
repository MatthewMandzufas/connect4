import styled from "styled-components";
import { GameUuid } from "./GameplayArea";

type SavedGameProps = {
  gameId: GameUuid;
  dateSaved: Date;
  handleLoadGame?: () => void;
};

const StyledGameAndDate = styled.div`
  outline: 2px solid black;
  margin: 10px;
  padding: 10px;
`;

const StyledSavedGame = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 10px;
`;

const SavedGame = ({ gameId, dateSaved, handleLoadGame }: SavedGameProps) => {
  return (
    <StyledSavedGame>
      <StyledGameAndDate>
        <p>Game ID: {gameId}</p>
        <p>Date Saved: {dateSaved.toString()}</p>
      </StyledGameAndDate>
      <button onClick={handleLoadGame}>Load Game</button>
    </StyledSavedGame>
  );
};

export default SavedGame;
