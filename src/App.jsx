import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputFields from './components/dashboard/InputFields'
import Tables from './components/dashboard/Tables'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='grid gap-4 p-4 grid-row-[220px_1fr]'>
      <InputFields />
      <Tables />
    </div>
  )
}

export default App
