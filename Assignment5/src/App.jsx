import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Calculator from './pages/Calculator'
import UserForm from './pages/UserForm'
import ResumeBuilder from './pages/ResumeBuilder'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/"       element={<Calculator />} />
          <Route path="/form"   element={<UserForm />} />
          <Route path="/resume" element={<ResumeBuilder />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
