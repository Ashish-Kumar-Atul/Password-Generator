import { useCallback, useState, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [password, setPassword] = useState("")
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbersAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numbersAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  return (
    <div className='flex flex-wrap justify-center mt-10 text-orange-500'>
      <div className='bg-slate-600 w-[70%] rounded-2xl px-8 py-8'>
        <div className='mb-8'>
          <input 
            type="text"
            readOnly
            value={password}
            className='bg-white w-[80%] h-10 rounded-l-lg text-lg pl-2' 
          />
          <button 
            type="button"
            className='w-[20%] bg-blue-600 h-10 rounded-r-lg text-white text-lg'
          >
            Copy
          </button>
        </div>

        <div className='flex flex-wrap gap-x-10 justify-evenly'>
          <div className='flex items-center gap-x-2'>
            <input 
              type="range" 
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input 
              type="checkbox" 
              checked={numbersAllowed}
              id='numbersInput'
              onChange={() => {
                setNumbersAllowed(prev => !prev)
              }}
            />
            <label htmlFor="numbersInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-2'>
            <input 
              type="checkbox" 
              checked={charAllowed}
              id='charInput'
              onChange={() => {
                setCharAllowed(prev => !prev)
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
