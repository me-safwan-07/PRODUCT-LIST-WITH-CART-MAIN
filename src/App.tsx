import { useState } from 'react'
// import './App.css'
import Desserts from './components/Desserts'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Desserts />
      </div>
    </>
  )
}

export default App
