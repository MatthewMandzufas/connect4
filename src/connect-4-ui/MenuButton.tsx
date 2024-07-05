import styled from "styled-components";

type MenuButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler;
};

const StyledMenuButton = styled.button`
  /* padding: 20px; */
  font-family: monospace;
  font-size: 1.2rem;
  background-color: beige;
  outline: 2px solid #142d4c;
  height: 7vh;
  max-height: 50px;
  width: 50vw;
  max-width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    outline: none;
  }
`;

const MenuButton = ({ text, onClick }: MenuButtonProps) => {
  return <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>;
};

export default MenuButton;
