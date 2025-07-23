import { useEffect, useState } from 'react'

function AnxiousPage() {
  const [isBreathing, setIsBreathing] = useState(false) // Start at exhale position
  const [hasStarted, setHasStarted] = useState(false) // Track if animation has started

  useEffect(() => {
    const breatheIn = () => {
      setIsBreathing(true)
      setTimeout(breatheOut, 4000) // Inhale for 4 seconds
    }

    const breatheOut = () => {
      setIsBreathing(false)
      setTimeout(breatheIn, 6000) // Exhale for 6 seconds
    }

    // Start the breathing cycle with a slight delay to show initial state
    const startTimer = setTimeout(() => {
      setHasStarted(true)
      breatheIn()
    }, 1000)

    // Cleanup on unmount
    return () => {
      clearTimeout(startTimer)
      clearTimeout(breatheIn)
      clearTimeout(breatheOut)
    }
  }, [])

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-16 text-center">Breathe</h1>
        <div className="flex justify-center items-center">
          <div 
            className={`
              w-64 h-64 rounded-full bg-white/20 backdrop-blur-sm
              flex items-center justify-center
              breathing-circle ${isBreathing ? 'inhale' : 'exhale'}
              ${isBreathing ? 'scale-125' : 'scale-75'}
            `}
          >
            <div className="text-white text-xl font-light">
              {!hasStarted ? 'breathe' : isBreathing ? 'Inhale...' : 'Exhale...'}
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <a 
            href="/" 
            className="text-white hover:text-red-200 font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default AnxiousPage 