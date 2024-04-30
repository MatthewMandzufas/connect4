import { Round } from "@/connect-4-ui/Round";
import { PlayerRoundOverviewProps } from "@/connect-4-ui/PlayerRoundOverview";
import { GameStatus } from "@/connect-4-ui/GameStatus";
import { PlayerRoundOverviews } from "@/connect-4-ui/PlayerRoundOverviews";

type GameOverviewProps = {
  playerOne: PlayerRoundOverviewProps & { playerNumber: 1 };
  playerTwo: PlayerRoundOverviewProps & { playerNumber: 2 };
  gameRunning: boolean;
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
