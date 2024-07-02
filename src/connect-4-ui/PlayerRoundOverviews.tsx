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
  flex-wrap: wrap;
  width: min(60vh, 60vw);
  /* height: min(12vh, 12vw); */
  min-height: min(15vh, 15vw);
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
