import { useState } from 'react'

function App() {
  const [length,setLenth] = useState("8")
  const [password,setPassword] = useState(" ")
  const [numbers,setNumbersAllowed] = useState("false")
  const [char,setCharAllowed] = useState("false")


  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default App