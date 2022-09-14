import { useNavigate } from 'react-router'
import { usePhoneAuth } from '../../context/phoneAuth'
import { auth } from '../../firebase'
import Button from '../Button'
import './styles.css'

export default function NavBar() {
  const navigate = useNavigate()
  const { isAuth } = usePhoneAuth()

  const handleSignOut = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // sign out firebase auth
    try {
      await auth.signOut()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isAuth && (
        <nav>
          <Button
            id={'btnInsert'}
            type={'submit'}
            value={'Logout'}
            isDisabled={false}
            clickHandler={handleSignOut}
          />
        </nav>
      )}
    </>
  )
}
