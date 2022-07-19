import styled, { css } from "styled-components";
import { ButtonInterface } from "./Button";

const buttonVariant = {
  primary: "purple",
  secondary: "orange",
  danger: "red",
  success: "green",
};

export const ButtonContainer = styled.button<ButtonInterface>`
  width: 100px;
  height: 40px;
  border-radius: 4px;
  border: 0;
  margin: 8px;

  background-color: ${(props) => props.theme.primary};
`;
