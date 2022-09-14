import { FC } from 'react'
import { useNavigate } from 'react-router'
import PhoneSignup from '../components/PhoneSignup'
import PhoneVerify from '../components/PhoneVerify'
import { usePhoneAuth } from '../context/phoneAuth'

const Home: FC = () => {
  const { isSendOTP, isAuth } = usePhoneAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate('/profile')
  }

  return <>{isSendOTP ? <PhoneVerify /> : <PhoneSignup />}</>
}

export default Home
