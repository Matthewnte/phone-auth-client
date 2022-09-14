import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import { PhoneAuthContextProvider } from './context/phoneAuth'
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <div className="App">
      <PhoneAuthContextProvider>
        <Router>
          <NavBar />
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Routes>
          </header>
        </Router>
      </PhoneAuthContextProvider>
    </div>
  )
}

export default App
