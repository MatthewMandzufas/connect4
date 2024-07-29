import { Board, BoardProps, GridBoardCellProps } from "@/connect-4-ui/Board";
import GameOverview, { GameOverviewProps } from "@/connect-4-ui/GameOverview";
import { useState } from "react";
import { TwitterPicker } from "react-color";
import styled from "styled-components";
import GamePlayAreaMenu from "./GamePlayAreaMenu";
import MenuButton from "./MenuButton";

export type GameUuid = `${string}-${string}-${string}-${string}-${string}`;

export type GameplayAreaProps = {
  activeGame?: {
    gameOverview: GameOverviewProps;
    board: BoardProps;
  };
  onStartGameClick?: (
    playerOneColor: string,
    playerTwoColor: string
  ) => () => void;
  onBoardCellClick?: ({ row, column }: GridBoardCellProps) => void;
  onSaveGameClick?: () => void;
  onLoadGameClick?: () => void;
  onRestartGameClick?: () => void;
};

const StyledGameplayArea = styled.div<{
  $activeGame?: GameplayAreaProps["activeGame"];
}>`
  display: flex;
  justify-content: ${({ $activeGame }) =>
    $activeGame === undefined ? "center" : "space-evenly"};
  min-height: 100vh;
  overflow: auto;
  align-items: center;
  background: linear-gradient(
    112.1deg,
    rgb(32, 38, 57) 11.4%,
    rgb(63, 76, 119) 70.2%
  );
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  padding: 20px 30px;
  font-family: monospace;
  font-size: 2rem;
  background-color: beige;
  outline: 8px solid #142d4c;
  height: 10vh;
  width: 70vw;
  max-height: 150px;
  max-width: 300px;
`;

const StyledHeader = styled.h1`
  color: beige;
  font-size: 4.5rem;
  font-family: monospace;
`;

const StyledStartGameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledPlayerColorSelect = styled.div`
  margin: 10%;
`;

const StyledPlayerHeader = styled.h1`
  color: beige;
`;

const StyledHorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

export const GameplayArea = ({
  activeGame,
  onStartGameClick = () => () => {},
  onBoardCellClick = () => {},
  onSaveGameClick = () => {},
  onLoadGameClick = () => {},
  onRestartGameClick = () => {},
}: GameplayAreaProps) => {
  const [playerOneColor, setPlayerOneColor] = useState("#FF5733");
  const [playerTwoColor, setPlayerTwoColor] = useState("#fdfd96");
  const updatePlayerOneColor = ({ hex }: { hex: string }) => {
    setPlayerOneColor(hex);
  };
  const updatePlayerTwoColor = ({ hex }: { hex: string }) => {
    setPlayerTwoColor(hex);
  };
  const handleStart = onStartGameClick(playerOneColor, playerTwoColor);
  return (
    <div>
      {activeGame ? (
        <GamePlayAreaMenu>
          <MenuButton text={"Restart"} onClick={onRestartGameClick} />
          <MenuButton text={"Save"} onClick={onSaveGameClick} />
          <MenuButton text={"Load"} onClick={onLoadGameClick} />
        </GamePlayAreaMenu>
      ) : (
        <> </>
      )}
      <StyledGameplayArea $activeGame={activeGame}>
        {activeGame ? (
          <>
            <GameOverview {...activeGame.gameOverview} />
            <Board
              {...activeGame.board}
              playerOneColor={playerOneColor}
              playerTwoColor={playerTwoColor}
              onBoardCellClick={onBoardCellClick}
            />
          </>
        ) : (
          <>
            <StyledStartGameArea>
              <StyledHeader>Connect4</StyledHeader>
              <StyledButton onClick={handleStart}>Start</StyledButton>
              <StyledPlayerColorSelect>
                <StyledHorizontalDiv>
                  <StyledPlayerHeader>
                    Player One Colour: {playerOneColor}
                  </StyledPlayerHeader>
                  <TwitterPicker
                    colors={[
                      "#FF5733",
                      "#FCB900",
                      "#EB144C",
                      "#F78DA7",
                      "#9900EF",
                    ]}
                    triangle="hide"
                    onChange={updatePlayerOneColor}
                  />
                </StyledHorizontalDiv>
                <StyledHorizontalDiv>
                  <StyledPlayerHeader>
                    Player Two Colour: {playerTwoColor}
                  </StyledPlayerHeader>
                  <TwitterPicker
                    colors={[
                      "#7BDCB5",
                      "#00D084",
                      "#8ED1FC",
                      "#0693E3",
                      "#ABB8C3",
                    ]}
                    triangle="hide"
                    onChange={updatePlayerTwoColor}
                  />
                </StyledHorizontalDiv>
              </StyledPlayerColorSelect>
            </StyledStartGameArea>
          </>
        )}
      </StyledGameplayArea>
    </div>
  );
};
