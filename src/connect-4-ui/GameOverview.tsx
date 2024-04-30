import styled from "styled-components";
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

const Wrapper = styled.div``;

const GameOverview = ({
  playerOne,
  playerTwo,
  roundNumber,
  gameRunning,
}: GameOverviewProps) => {
  return (
    <Wrapper>
      <Round roundNumber={roundNumber} />
      <PlayerRoundOverviews playerOne={playerOne} playerTwo={playerTwo} />
      <GameStatus gameRunning={gameRunning} />
    </Wrapper>
  );
};

export default GameOverview;
