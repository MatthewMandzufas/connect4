import { Status } from "@/connect-4-domain/game";
import { GameStatus } from "@/connect-4-ui/GameStatus";
import { PlayerRoundOverviewProps } from "@/connect-4-ui/PlayerRoundOverview";
import { PlayerRoundOverviews } from "@/connect-4-ui/PlayerRoundOverviews";
import { Round } from "@/connect-4-ui/Round";

export type GameOverviewProps = {
  playerOne: PlayerRoundOverviewProps & { playerNumber: 1 };
  playerTwo: PlayerRoundOverviewProps & { playerNumber: 2 };
  gameRunning: Status;
  roundNumber: number;
};

const GameOverview = ({
  playerOne,
  playerTwo,
  roundNumber,
  gameRunning,
}: GameOverviewProps) => {
  return (
    <div>
      <Round roundNumber={roundNumber} />
      <PlayerRoundOverviews playerOne={playerOne} playerTwo={playerTwo} />
      <GameStatus gameRunning={gameRunning} />
    </div>
  );
};

export default GameOverview;
