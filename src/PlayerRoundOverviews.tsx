import styled from "styled-components";
import {
  PlayerRoundOverview,
  PlayerRoundOverviewProps,
} from "./PlayerRoundOverview";

export type PlayerRoundOverviewsProps = {
  playerOne: PlayerRoundOverviewProps & { playerNumber: 1 };
  playerTwo: PlayerRoundOverviewProps & { playerNumber: 2 };
};

const Wrapper = styled.div`
  display: flex;
`;

export const PlayerRoundOverviews = ({
  playerOne,
  playerTwo,
}: PlayerRoundOverviewsProps) => {
  return (
    <Wrapper>
      <PlayerRoundOverview {...playerOne} />
      <PlayerRoundOverview {...playerTwo} />
    </Wrapper>
  );
};
