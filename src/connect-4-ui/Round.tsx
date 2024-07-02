import styled from "styled-components";

export type RoundProps = {
  roundNumber: number;
};

const StyledRoundNumber = styled.div`
  background-color: #2772db;
  color: #f5ebeb;
  font-size: 2rem;
  text-align: center;
  padding: 10px 0px;
  font-family: monospace;
  border-radius: 20px 20px 0 0;
  outline: 6px solid #d5eeff;
`;

export const Round = ({ roundNumber }: RoundProps) => (
  <StyledRoundNumber>{`Round: ${roundNumber}`}</StyledRoundNumber>
);

Round.defaultProps = {
  roundNumber: 1,
};
