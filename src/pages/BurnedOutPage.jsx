function BurnedOutPage() {
  return (
    <div className="min-h-screen bg-[#edafb8] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Walk</h1>
        <div className="w-full max-w-xl mx-auto">
          <img 
            src="/Guff3.png" 
            alt="White fluffy dog sitting on wooden floor" 
            className="w-full h-auto max-w-[50%] mx-auto"
          />
        </div>
        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-white hover:text-[#fae3e7] font-semibold transition-colors"
          >
            ← Back to Emotions
          </a>
        </div>
      </div>
    </div>
  )
}

export default BurnedOutPage 