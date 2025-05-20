import { useCallback, useState, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(12)
  const [password, setPassword] = useState("")
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [copied, setCopied] = useState(false)

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numbersAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    let pass = ""
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length)
      pass += str.charAt(index)
    }
    setPassword(pass)
  }, [length, numbersAllowed, charAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-xl p-8 rounded-3xl shadow-2xl border border-gray-700 bg-white/10 backdrop-blur-md">
        <h1 className="text-4xl text-center text-orange-400 font-extrabold mb-6 tracking-wide">
          ✨ Password Generator
        </h1>

        <div className="flex items-center mb-6 shadow-md">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-grow bg-white/80 text-gray-800 px-4 py-2 rounded-l-xl text-lg font-mono outline-none backdrop-blur-sm"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl transition-all duration-300 shadow-md hover:shadow-blue-500/40"
          >
            Copy
          </button>
        </div>

        {copied && (
          <div className="text-center mb-4 text-green-400 animate-pulse">
            ✅ Password copied!
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg text-white font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 accent-orange-400 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="numbersInput" className="text-lg text-white font-medium">Include Numbers</label>
            <input
              type="checkbox"
              id="numbersInput"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed(prev => !prev)}
              className="w-5 h-5 accent-orange-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="charInput" className="text-lg text-white font-medium">Include Symbols</label>
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="w-5 h-5 accent-orange-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
