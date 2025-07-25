function StressedPage() {
  return (
    <div className="min-h-screen bg-[#83c5be] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-12 text-center">Exercise</h1>
        
        {/* Peloton Button */}
        <div className="flex justify-center mb-12">
          <a
            href="https://auth.onepeloton.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center">
              <svg 
                className="w-6 h-6 mr-2" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 2.25A9.75 9.75 0 1021.75 12 9.76 9.76 0 0012 2.25zm0 18A8.25 8.25 0 1120.25 12 8.26 8.26 0 0112 20.25z"/>
                <path d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
              </svg>
              Login to Peloton
            </span>
            <div className="absolute inset-0 bg-white/10 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
          </a>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#c5e5e1] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default StressedPage 