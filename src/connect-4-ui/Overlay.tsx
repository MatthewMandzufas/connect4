/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";

const StyledOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
`;

type OverlayProps<T extends React.ComponentType<any>> = {
  handleClose?: () => void;
  componentSpec?: ComponentSpec<T>;
};

type ComponentSpec<T extends React.ComponentType<any>> = {
  Component: T;
  props: React.ComponentProps<T>;
};

const Overlay = <T extends React.ComponentType<any>>({
  handleClose = () => {},
  componentSpec = {
    Component: (() => <></>) as unknown as T,
    props: {} as React.ComponentProps<T>,
  },
}: OverlayProps<T>) => {
  const { Component, props } = componentSpec;
  return (
    <StyledOverlay id="overlay" onClick={handleClose}>
      <Component {...props} />
    </StyledOverlay>
  );
};

export default Overlay;
