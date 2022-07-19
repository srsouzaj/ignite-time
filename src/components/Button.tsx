import { ButtonContainer } from './Button.styles'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

export interface ButtonInterface {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonInterface) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>
}
