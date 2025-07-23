function AngryPage() {
  return (
    <div className="min-h-screen bg-[#81b29a] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Sing</h1>
        <div className="w-full aspect-[16/9] max-w-3xl mx-auto">
          <iframe 
            style={{borderRadius: "12px"}} 
            src="https://open.spotify.com/embed/playlist/6AElMRTToTO4w8BBg7aw9R?utm_source=generator&theme=0" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#e8f1ed] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default AngryPage 