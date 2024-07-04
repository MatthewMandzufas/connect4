import styled from "styled-components";
import { GameUuid } from "./GameplayArea";

type SavedGameProps = {
  gameId: GameUuid;
  dateSaved: Date;
};

const StyledSavedGame = styled.div`
  outline: 2px solid black;
  margin: 10px;
`;

const SavedGame = ({ gameId, dateSaved }: SavedGameProps) => {
  return (
    <StyledSavedGame>
      <p>Game ID: {gameId}</p>
      <p>Date Saved: {dateSaved.toString()}</p>
    </StyledSavedGame>
  );
};

export default SavedGame;
