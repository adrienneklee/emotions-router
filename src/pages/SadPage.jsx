import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'

function SadPage() {
  const [gratitudes, setGratitudes] = useState([])
  const [currentGratitude, setCurrentGratitude] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editingGratitude, setEditingGratitude] = useState(null)

  // Load gratitudes from Firestore on component mount
  useEffect(() => {
    const q = query(collection(db, 'gratitudes'), orderBy('timestamp', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const gratitudesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate()
      }))
      setGratitudes(gratitudesData)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSaveGratitude = async (e) => {
    e.preventDefault()
    if (currentGratitude.trim()) {
      try {
        if (editingGratitude) {
          // Update existing gratitude
          await updateDoc(doc(db, 'gratitudes', editingGratitude.id), {
            text: currentGratitude,
            lastEdited: new Date()
          })
          setEditingGratitude(null)
        } else {
          // Create new gratitude
          await addDoc(collection(db, 'gratitudes'), {
            text: currentGratitude,
            timestamp: new Date(),
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          })
        }
        // Clear the form
        setCurrentGratitude('')
        // Reset form element
        e.target.reset()
        // Clear textarea value explicitly
        const textarea = document.querySelector('textarea')
        if (textarea) {
          textarea.value = ''
        }
      } catch (error) {
        console.error('Error saving gratitude:', error)
      }
    }
  }

  const handleEditGratitude = (gratitude) => {
    setEditingGratitude(gratitude)
    setCurrentGratitude(gratitude.text)
    document.querySelector('textarea')?.focus()
  }

  const handleCancelEdit = () => {
    setEditingGratitude(null)
    setCurrentGratitude('')
  }

  const handleDeleteGratitude = async (gratitudeId) => {
    if (window.confirm('Are you sure you want to delete this gratitude?')) {
      try {
        await deleteDoc(doc(db, 'gratitudes', gratitudeId))
        if (editingGratitude?.id === gratitudeId) {
          handleCancelEdit()
        }
      } catch (error) {
        console.error('Error deleting gratitude:', error)
      }
    }
  }

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return ''
    return formatDistanceToNow(timestamp, { addSuffix: true })
  }

  return (
    <div className="min-h-screen bg-[#f6bd60] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Gratitude</h1>

        {/* Gratitude Input Form */}
        <form onSubmit={handleSaveGratitude} className="mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-4 pt-3 text-sm text-[#f6bd60] font-medium">
              I am grateful for...
            </div>
            <textarea
              value={currentGratitude}
              onChange={(e) => setCurrentGratitude(e.target.value)}
              placeholder="Today, I appreciate..."
              className="w-full p-4 min-h-[120px] text-gray-700 focus:outline-none resize-none"
            />
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              {editingGratitude && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="bg-[#f6bd60] text-white px-4 py-2 rounded-lg hover:bg-[#f6bd60] transition-colors"
                  disabled={!currentGratitude.trim()}
                >
                  {editingGratitude ? 'Save Changes' : 'Save Gratitude'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Gratitudes List */}
        <div className="space-y-4 mb-8">
          {isLoading ? (
            <div className="text-white text-center">Loading gratitudes...</div>
          ) : gratitudes.length === 0 ? (
            <div className="text-white text-center">No gratitudes yet. Start writing!</div>
          ) : (
            gratitudes.map(gratitude => (
              <div key={gratitude.id} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">{gratitude.date}</span>
                    <span className="text-xs text-gray-400">{getTimeAgo(gratitude.timestamp)}</span>
                    {gratitude.lastEdited && (
                      <span className="text-xs text-gray-400 italic">
                        edited {getTimeAgo(gratitude.lastEdited)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditGratitude(gratitude)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGratitude(gratitude.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{gratitude.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#f6bd60] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default SadPage 