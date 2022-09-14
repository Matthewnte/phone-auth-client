import { FC } from 'react'
import './styles.css'

type AlertProps = {
  message: string
}

const Alert: FC<AlertProps> = (props) => {
  return (
    <div className="alert">
      <p>{props.message}</p>
    </div>
  )
}

export default Alert
