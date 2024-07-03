import { GameUuid } from "./GameplayArea";

type SavedGameProps = {
  gameId: GameUuid;
  dateSaved: Date;
};

const SavedGame = ({ gameId, dateSaved }: SavedGameProps) => {
  return (
    <>
      <p>Game ID: {gameId}</p>
      <p>Date Saved: {dateSaved.toString()}</p>
    </>
  );
};

export default SavedGame;
