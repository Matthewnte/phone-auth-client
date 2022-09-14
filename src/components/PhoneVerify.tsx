import { useState } from 'react'
import 'react-phone-number-input/style.css'
import { useNavigate } from 'react-router'
import { postData } from '../api'
import { usePhoneAuth } from '../context/phoneAuth'
import Button from './Button'
import Form from './Form'
import FormInput from './FormInput'

export default function PhoneSignup() {
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { confirmationResult, phoneNumber } = usePhoneAuth()
  const navigate = useNavigate()

  const verifyOtp = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (!otp) return setError('Please enter a valid OTP')

    try {
      setLoading(true)
      await confirmationResult.confirm(otp)
      await postData('/profiles', { phoneNumber })
      navigate('/profile')
    } catch (error: any) {
      // TODO: Log error to server
      setError(error.message)
    }
    setLoading(false)
  }

  if (loading) return <div>loading...</div>

  return (
    <>
      <Form>
        <div id="error">{error}</div>
        <FormInput
          placeholder="Enter OTP"
          type="number"
          name="name"
          onChange={(e) => setOtp(e.target.value)}
          value={otp}
        />
        <Button
          id={'btnInsert'}
          type={'submit'}
          value={'Verify OTP'}
          isDisabled={false}
          clickHandler={verifyOtp}
        />
      </Form>
    </>
  )
}
