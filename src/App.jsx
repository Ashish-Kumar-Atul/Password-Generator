import { useCallback, useEffect, useState } from 'react'

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black transition-colors duration-500">
      <div className="w-full max-w-xl p-8 rounded-3xl border border-gray-300 dark:border-gray-700 bg-white/30 dark:bg-white/10 backdrop-blur-md shadow-xl">
        
        <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-orange-400 mb-6">
          🔐 Password Generator
        </h1>

        <div className="flex items-center mb-6">
          <input
            type="text"
            readOnly
            value={password}
            className="flex-grow px-4 py-2 bg-white/70 dark:bg-black/40 text-gray-900 dark:text-white rounded-l-xl font-mono text-lg outline-none"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-xl transition-all shadow-md"
          >
            Copy
          </button>
        </div>

        {copied && (
          <div className="text-center mb-4 text-green-600 dark:text-green-400 animate-pulse">
            ✅ Copied to clipboard!
          </div>
        )}

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <label className="text-lg text-gray-800 dark:text-white">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-2/3 accent-orange-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-gray-800 dark:text-white">Include Numbers</label>
            <input
              type="checkbox"
              checked={numbersAllowed}
              onChange={() => setNumbersAllowed(prev => !prev)}
              className="w-5 h-5 accent-orange-400"
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="text-lg text-gray-800 dark:text-white">Include Symbols</label>
            <input
              type="checkbox"
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
