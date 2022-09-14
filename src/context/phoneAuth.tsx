import { RecaptchaVerifier, signInWithPhoneNumber } from '@firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

export const PhoneAuthContext = createContext({} as any)

export const PhoneAuthContextProvider = ({ children }: any) => {
  const [isSendOTP, setIsSendOTP] = useState(false)
  const [confirmationResult, setConfirmationResult] = useState<any>()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [isAuth, setIsAuth] = useState(false)
  const [fbToken, setFbToken] = useState<string>('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true)
        setPhoneNumber(user.phoneNumber!)
      } else {
        setIsAuth(false)
        setPhoneNumber('')
      }
    })
  }, [])

  useEffect(() => {
    if (isAuth) {
      auth.currentUser?.getIdToken(true).then((fbToken) => {
        setFbToken(fbToken)
      })
    }
  }, [isAuth])

  const setuserRecaptchaVerifier = async (phoneNumber: string) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth,
    )
    recaptchaVerifier.render()
    return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
  }

  return (
    <PhoneAuthContext.Provider
      value={{
        setuserRecaptchaVerifier,
        isSendOTP,
        setIsSendOTP,
        confirmationResult,
        setConfirmationResult,
        phoneNumber,
        setPhoneNumber,
        isAuth,
        fbToken,
      }}
    >
      {children}
    </PhoneAuthContext.Provider>
  )
}

export const usePhoneAuth = () => useContext(PhoneAuthContext)
