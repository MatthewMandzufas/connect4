import styled from "styled-components";

type MenuButtonProps = {
  text: string;
  onClick?: React.MouseEventHandler;
};

const StyledMenuButton = styled.button`
  padding: 20px 30px;
  font-family: monospace;
  font-size: 2rem;
  background-color: beige;
  outline: 2px solid #142d4c;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* margin: 5px; */

  &:hover {
    outline: none;
  }
`;

const MenuButton = ({ text, onClick }: MenuButtonProps) => {
  return <StyledMenuButton onClick={onClick}>{text}</StyledMenuButton>;
};

export default MenuButton;
