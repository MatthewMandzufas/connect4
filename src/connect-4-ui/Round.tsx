import styled from "styled-components";

export type RoundProps = {
  roundNumber: number;
};

const StyledRoundNumber = styled.div`
  background-color: blue;
  color: white;
  font-size: 2rem;
  text-align: center;
  padding: 10px 0px;
  border-radius: 20px 20px 0 0;
`;

export const Round = ({ roundNumber }: RoundProps) => (
  <StyledRoundNumber>{`Round: ${roundNumber}`}</StyledRoundNumber>
);

Round.defaultProps = {
  roundNumber: 1,
};
