import React from "react";
import styled from "styled-components";
import SavedGame from "./SavedGame";

const StyledLoadGameDialog = styled.div`
  border: 2px solid #32424a;
  /* background: beige; */
  background: #32424a;
  min-height: 20vh;
  min-width: 60vw;
`;

const StyledHeading = styled.h1`
  text-align: center;
  font-family: monospace;
  font-weight: 700;
  color: #f5ebeb;
  margin: 10px;
  text-decoration: underline dashed;
  font-size: 3rem;
`;

const StyledSavedGames = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

const StyledCloseButton = styled.button`
  font-size: 1rem;
  padding: 5px 10px;
  color: #32424a;
  border: none;
  height: 40px;
  width: 40px;

  &:active {
    transform: scale(0.96);
  }

  &:hover {
    cursor: pointer;
    outline: 3px #32424a solid;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

type LoadGameDialogProps = {
  onCloseDialogClick?: () => void;
  children?:
    | Array<React.ReactElement<typeof SavedGame>>
    | React.ReactElement<typeof SavedGame>;
};

const StyledNoSavedGames = styled.p`
  color: #f5ebeb;
`;

const LoadGameDialog = ({
  onCloseDialogClick = () => {},
  children = [],
}: LoadGameDialogProps) => {
  return (
    <StyledLoadGameDialog>
      <StyledHeader>
        <StyledHeading>Saved Games</StyledHeading>
        <StyledCloseButton onClick={onCloseDialogClick}>X</StyledCloseButton>
      </StyledHeader>
      <StyledSavedGames>
        {React.Children.count(children) ? (
          children
        ) : (
          <StyledNoSavedGames>No Saved Games!</StyledNoSavedGames>
        )}
      </StyledSavedGames>
    </StyledLoadGameDialog>
  );
};

export default LoadGameDialog;
