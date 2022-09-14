import { FC } from 'react'
import './styles.css'

type InputProps = {
  placeholder: string
  type: string
  value: any
  required?: boolean
  name?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const Input: FC<InputProps> = (props) => {
  return (
    <>
      <input
        className={props.error && 'input__error'}
        placeholder={props.placeholder}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        required={props.required || false}
      />
      <span className="input__error__message">{props.error}</span>
    </>
  )
}

Input.defaultProps = {
  type: 'text',
}

export default Input
