import styled from "styled-components";

export const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  margin: 32px auto;
  border: 3px solid gray;
  background-color: lightblue;
  position: relative;
`;

export const PointsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: red;
  z-index: 99;
`;
