import { FC, ReactNode } from 'react'
import './styles.css'

type FormProps = {
  children: ReactNode
}

const Form: FC<FormProps> = ({ children }) => {
  return (
    <form className='form'>
      {children}
    </form>
  )
}

export default Form;
