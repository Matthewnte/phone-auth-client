import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { usePhoneAuth } from '../context/phoneAuth'
import Alert from './Alert'
import Button from './Button'
import Form from './Form'

export default function PhoneSignup() {
  const [error, setError] = useState<string>('')
  const {
    setuserRecaptchaVerifier,
    setConfirmationResult,
    setIsSendOTP,
    phoneNumber,
    setPhoneNumber,
  } = usePhoneAuth()

  const getOtp = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (!phoneNumber) return setError('Please enter a valid phone number')

    try {
      const response = await setuserRecaptchaVerifier(phoneNumber)
      setConfirmationResult(response)
      setIsSendOTP(true)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Form>
      {error && <Alert message={error} />}

      <PhoneInput
        defaultCountry="NG"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(phoneNumber) => setPhoneNumber(phoneNumber)}
      />

      <div id="recaptcha-container"></div>

      <Button
        id={'btnInsert'}
        type={'submit'}
        value={'Send OTP'}
        isDisabled={false}
        clickHandler={getOtp}
      />
    </Form>
  )
}
