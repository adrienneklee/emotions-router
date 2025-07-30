import { useState, useEffect } from 'react'

function ImpatientPage() {
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const imageList = [
      { id: 1, src: '/progress-images/progress-1.png', date: 'January 1, 2024', description: 'Initial Setup' },
      { id: 2, src: '/progress-images/progress-2.png', date: 'January 2, 2024', description: 'Early Progress' },
      { id: 3, src: '/progress-images/progress-3.png', date: 'January 3, 2024', description: 'Feature Development' },
      { id: 4, src: '/progress-images/progress-4.png', date: 'January 4, 2024', description: 'UI Improvements' },
      { id: 5, src: '/progress-images/progress-5.png', date: 'January 5, 2024', description: 'Component Updates' },
      { id: 6, src: '/progress-images/progress-6.png', date: 'January 6, 2024', description: 'Navigation Enhancement' },
      { id: 7, src: '/progress-images/progress-7.png', date: 'January 7, 2024', description: 'Layout Refinement' },
      { id: 8, src: '/progress-images/progress-8.png', date: 'January 8, 2024', description: 'Style Updates' },
      { id: 9, src: '/progress-images/progress-9.png', date: 'January 9, 2024', description: 'Feature Addition' },
      { id: 10, src: '/progress-images/progress-10.png', date: 'January 10, 2024', description: 'Design Polish' },
      { id: 11, src: '/progress-images/progress-11.png', date: 'January 11, 2024', description: 'Functionality Update' },
      { id: 12, src: '/progress-images/progress-12.png', date: 'January 12, 2024', description: 'Component Integration' },
      { id: 13, src: '/progress-images/progress-13.png', date: 'January 13, 2024', description: 'User Experience Enhancement' },
      { id: 14, src: '/progress-images/progress-14.png', date: 'January 14, 2024', description: 'Interface Refinement' },
      { id: 15, src: '/progress-images/progress-15.png', date: 'January 15, 2024', description: 'Feature Expansion' },
      { id: 16, src: '/progress-images/progress-16.png', date: 'January 16, 2024', description: 'Visual Updates' },
      { id: 17, src: '/progress-images/progress-17.png', date: 'January 17, 2024', description: 'Performance Optimization' },
      { id: 18, src: '/progress-images/progress-18.png', date: 'January 18, 2024', description: 'Content Integration' },
      { id: 19, src: '/progress-images/progress-19.png', date: 'January 19, 2024', description: 'Layout Enhancement' },
      { id: 20, src: '/progress-images/progress-20.png', date: 'January 20, 2024', description: 'Final Touches' },
      { id: 21, src: '/progress-images/progress-21.png', date: 'January 21, 2024', description: 'Feature Completion' },
      { id: 22, src: '/progress-images/progress-22.png', date: 'January 22, 2024', description: 'Project Milestone' }
    ]
    setImages(imageList)
  }, [])

  return (
    <div className="min-h-screen bg-[#eaac8b] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Reflect on Progress</h1>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mb-8 space-y-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid-column cursor-pointer bg-white rounded-lg overflow-hidden shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={`Progress from ${image.date}`}
                className="w-full h-auto"
              />
              {/* <div className="p-3 bg-white">
                <div className="text-sm font-medium text-gray-700">{image.date}</div>
                <div className="text-xs text-gray-500 mt-1">{image.description}</div>
              </div> */}
            </div>
          ))}
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="max-w-[95vw] max-h-[95vh] bg-white rounded-lg overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={`Progress from ${selectedImage.date}`}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 backdrop-blur-sm">
                <div className="text-lg font-medium text-gray-800">{selectedImage.date}</div>
                <div className="text-gray-600 mt-1">{selectedImage.description}</div>
              </div> */}
              <button
                className="absolute top-2 right-2 text-white hover:text-gray-200 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-all duration-200"
                onClick={() => setSelectedImage(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#f7d1c0] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default ImpatientPage 