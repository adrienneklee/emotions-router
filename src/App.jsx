import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import AngryPage from './pages/AngryPage'
import BurnedOutPage from './pages/BurnedOutPage'
import AnxiousPage from './pages/AnxiousPage'
import LazyPage from './pages/LazyPage'
import OverthinkingPage from './pages/OverthinkingPage'
import SadPage from './pages/SadPage'

function EmotionsButtons() {
  const navigate = useNavigate()
  
  const emotions = [
    { name: 'Angry', style: 'bg-[#81b29a] hover:bg-[#6a9781]', route: '/angry' },
    { name: 'Burned out', style: 'bg-[#edafb8] hover:bg-[#e59aa4]', route: '/burned-out' },
    { name: 'Overthinking', style: 'bg-purple-500 hover:bg-purple-600', route: '/overthinking' },
    { name: 'Anxious', style: 'bg-red-500 hover:bg-red-600', route: '/anxious' },
    { name: 'Stressed', style: 'bg-teal-500 hover:bg-teal-600' },
    { name: 'Sad', style: 'bg-yellow-500 hover:bg-yellow-600', route: '/sad' },
    { name: 'Lazy', style: 'bg-[#5fa8d3] hover:bg-[#4c91bc]', route: '/lazy' },
    { name: 'Impatient', style: 'bg-[#eaac8b] hover:bg-[#e09b77]' }
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-row flex-wrap justify-center items-center gap-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.name}
              className={`${emotion.style} text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:scale-105`}
              onClick={() => emotion.route && navigate(emotion.route)}
            >
              {emotion.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmotionsButtons />} />
        <Route path="/angry" element={<AngryPage />} />
        <Route path="/burned-out" element={<BurnedOutPage />} />
        <Route path="/anxious" element={<AnxiousPage />} />
        <Route path="/lazy" element={<LazyPage />} />
        <Route path="/overthinking" element={<OverthinkingPage />} />
        <Route path="/sad" element={<SadPage />} />
      </Routes>
    </Router>
  )
}

export default App
