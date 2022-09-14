import { useEffect, useState } from 'react'
import { fetcher, updateData } from '../api'
import Alert from '../components/Alert'
import Button from '../components/Button'
import Form from '../components/Form'
import FormInput from '../components/FormInput'
import { usePhoneAuth } from '../context/phoneAuth'

export default function Profile() {
  const [name, setName] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { phoneNumber, fbToken } = usePhoneAuth()

  const validateForm = () => {
    // validate email input regex
    const isEmailValid = (email: string) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }

    // validate name input
    if (!name) {
      setNameError('Please enter a valid name')
    } else {
      setNameError('')
    }

    // validate email input
    if (email.length === 0 || !isEmailValid(email)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }

    return name && email && isEmailValid(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') setName(value)
    if (name === 'email') setEmail(value)
  }

  const handleSave = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    try {
      if (validateForm()) {
        setLoading(true)
        const response = await updateData(
          `/profiles/${phoneNumber}`,
          { name, email },
          fbToken,
        )
        if (response.error) {
          setError(response.error)
        }
      }
    } catch (error: any) {
      setError(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true)
        const data = await fetcher(`/profiles/${phoneNumber}`, fbToken)
        setName(data.name)
        setEmail(data.email)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (phoneNumber && fbToken) {
      getProfile()
    }
  }, [phoneNumber, fbToken])
  // const { data, isError, isLoading } = useFetch(`/profiles/08034783722`)

  if (loading) return <div>loading...</div>

  return (
    <>
      <h2>User Profile</h2>
      <Form>
        {error && <Alert message={error} />}
        <FormInput
          placeholder="Name"
          type="text"
          name="name"
          onChange={handleChange}
          value={name}
          error={nameError}
        />
        <FormInput
          placeholder="Email"
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          error={emailError}
        />
        <Button
          id={'btnSaveProfile'}
          type={'submit'}
          value={'Save'}
          clickHandler={handleSave}
        />
      </Form>
    </>
  )
}
