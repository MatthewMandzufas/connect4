import styled from "styled-components";

type MenuButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler;
};

const StyledMenuButton = styled.button`
  padding: 20px;
  font-family: monospace;
  font-size: 2rem;
  background-color: beige;
  outline: 2px solid #142d4c;
  height: 50px;
  display: flex;
  align-items: center;

  &:hover {
    outline: none;
  }
`;

const MenuButton = ({ text, onClick }: MenuButtonProps) => {
  return <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>;
};

export default MenuButton;
