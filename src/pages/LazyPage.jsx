function LazyPage() {
  // Create an array of raindrops with randomized initial positions
  const raindrops = Array.from({ length: 100 }).map((_, index) => ({
    id: index,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`, // Random initial vertical position
    animationDelay: `${Math.random() * 2}s`, // Reduced max delay for quicker initial fill
    opacity: Math.random() * 0.4 + 0.2
  }))

  return (
    <div className="min-h-screen bg-[#5fa8d3] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Rain container */}
      <div className="absolute inset-0 pointer-events-none">
        {raindrops.map(drop => (
          <div
            key={drop.id}
            className="raindrop absolute w-0.5 h-8 bg-white/30"
            style={{
              left: drop.left,
              top: drop.top, // Set initial position
              animationDelay: drop.animationDelay,
              opacity: drop.opacity
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="w-full max-w-3xl relative z-10">
        <h1 className="text-4xl font-bold text-white mb-16 text-center">Shower</h1>
        <div className="mt-16 text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#cce4f4] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default LazyPage 