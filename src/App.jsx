<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello world</h1>
    </>
=======
import React from 'react'
import './App.css'
import InputFields from './components/dashboard/InputFields'
import Tables from './components/dashboard/Tables'

function App() {

  return (
    <div className='grid gap-4 p-4 grid-row-[220px_1fr]'>
      <InputFields />
      <Tables />
    </div>
>>>>>>> 6db4a813370728b065e28a9304fe896fe002f93a
  )
}

export default App
