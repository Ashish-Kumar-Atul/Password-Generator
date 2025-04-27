import { useCallback, useState } from 'react'

function App() {
  const [length, setLength] = useState(6);
  const [password,setPassword] = useState(" ")
  const [numbersAllowed,setNumbersAllowed] = useState("false")
  const [charAllowed,setCharAllowed] = useState("false")

  const passwordGenerator = useCallback(()=>{
    let pass =" "
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numbersAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    
  })

  return (
      <div className='flex flex-wrap justify-center mt-10'>
        <div className='bg-slate-600 w-[70%] rounded-2xl px-8 py-8 '>
          <div className='mb-8'>
            <input 
            type="text"
            readOnly
            className='bg-white w-[80%] h-10 rounded-l-lg text-lg text-orange-500' />
            <button type="button"
            className='w-[20%] bg-blue-600 h-10 rounded-r-lg text-white text-lg'
            >Copy</button>
          </div>
      
          <div className='flex flex-wrap gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" 
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
              />
              <label>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox" />
              <label htmlFor="numbers">Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input type="checkbox" />
              <label htmlFor="char">Characters</label>
            </div>
          </div>
        </div>

      </div>
    
  )
}

export default App