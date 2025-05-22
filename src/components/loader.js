import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #13192e;
  font-weight: 500;
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export default function Loader({ text = "Loading..." }) {
  return (
    <LoaderContainer>
      <Spinner />
      <span>{text}</span>
    </LoaderContainer>
  );
}
