import { FC } from 'react'
import './styles.css'

type ButtonProps = {
  isDisabled?: boolean
  id: string
  clickHandler: any
  type: 'button' | 'submit' | 'reset'
  value: string
}

const Button: FC<ButtonProps> = (props) => {
  const btnEnableDisable = !props.isDisabled ? 'btn-enable' : 'btn-disabled'

  return (
    <button
      id={props.id}
      className={`btn ${btnEnableDisable}`}
      onClick={props.clickHandler}
      type={props.type}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  )
}

Button.defaultProps = {
  type: 'button',
  isDisabled: false,
}

export default Button
