import styled from "styled-components";

export type RoundProps = {
  roundNumber: number;
};

const StyledRoundNumber = styled.div`
  background-color: #2772db;
  color: #f5ebeb;
  font-size: min(4vw, 2rem);
  text-align: center;
  padding: 10px 0px;
  font-family: monospace;
  border-radius: 20px 20px 0 0;
  outline: 6px solid #142d4c;
  width: min(60vh, 60vw);
  min-height: 50px;
  height: min(6vh, 6vw);
  align-content: center;
`;

export const Round = ({ roundNumber }: RoundProps) => (
  <StyledRoundNumber>{`Round: ${roundNumber}`}</StyledRoundNumber>
);

Round.defaultProps = {
  roundNumber: 1,
};
