function LazyPage() {
  return (
    <div className="min-h-screen bg-[#5fa8d3] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Cold Shower</h1>
        
        {/* Centered Giphy */}
        <div className="flex justify-center mb-8">
          <div className="w-[360px] h-[360px] rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWJtZnJsMzBwa2E4ZTcyd3U4NWYydnpibmc0Y3dreTU0Z3ZiYTh6cCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/svs1zuLsLAXW8zxf7z/giphy.gif"
              alt="Shower animation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Rain Animation Container */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={index}
              className="raindrop absolute w-0.5 h-8 bg-white/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: Math.random() * 0.4 + 0.2
              }}
            />
          ))}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <a 
            href="/" 
            className="text-white hover:text-blue-200 font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default LazyPage 