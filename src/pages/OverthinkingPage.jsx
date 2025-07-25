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

function OverthinkingPage() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [editingNote, setEditingNote] = useState(null)

  // Load notes from Firestore on component mount
  useEffect(() => {
    const q = query(collection(db, 'notes'), orderBy('timestamp', 'desc'))
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() // Convert Firestore timestamp to JS Date
      }))
      setNotes(notesData)
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSaveNote = async (e) => {
    e.preventDefault()
    if (currentNote.trim()) {
      try {
        if (editingNote) {
          // Update existing note
          await updateDoc(doc(db, 'notes', editingNote.id), {
            text: currentNote,
            lastEdited: new Date()
          })
          setEditingNote(null)
        } else {
          // Create new note
          await addDoc(collection(db, 'notes'), {
            text: currentNote,
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
        setCurrentNote('')
        // Reset form element
        e.target.reset()
        // Clear textarea value explicitly
        const textarea = document.querySelector('textarea')
        if (textarea) {
          textarea.value = ''
        }
      } catch (error) {
        console.error('Error saving note:', error)
      }
    }
  }

  const handleEditNote = (note) => {
    setEditingNote(note)
    setCurrentNote(note.text)
    // Scroll to the textarea
    document.querySelector('textarea')?.focus()
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
    setCurrentNote('')
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteDoc(doc(db, 'notes', noteId))
        if (editingNote?.id === noteId) {
          handleCancelEdit()
        }
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return ''
    return formatDistanceToNow(timestamp, { addSuffix: true })
  }

  return (
    <div className="min-h-screen bg-[#b8c0ff] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Write</h1>

        {/* Note Input Form */}
        <form onSubmit={handleSaveNote} className="mb-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder={editingNote ? "Edit your note..." : "Type your thoughts here..."}
              className="w-full p-4 min-h-[120px] text-gray-700 focus:outline-none resize-none"
            />
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
              {editingNote && (
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
                  className="bg-[#b8c0ff] text-white px-4 py-2 rounded-lg hover:bg-[#a3acff] transition-colors"
                  disabled={!currentNote.trim()}
                >
                  {editingNote ? 'Save Changes' : 'Save Note'}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Notes List */}
        <div className="space-y-4 mb-8">
          {isLoading ? (
            <div className="text-white text-center">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="text-white text-center">No notes yet. Start writing!</div>
          ) : (
            notes.map(note => (
              <div key={note.id} className="bg-white rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">{note.date}</span>
                    <span className="text-xs text-gray-400">{getTimeAgo(note.timestamp)}</span>
                    {note.lastEdited && (
                      <span className="text-xs text-gray-400 italic">
                        edited {getTimeAgo(note.lastEdited)}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditNote(note)}
                      className="text-[#b8c0ff] hover:text-[#a3acff] transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{note.text}</p>
              </div>
            ))
          )}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#d8dcff] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default OverthinkingPage 