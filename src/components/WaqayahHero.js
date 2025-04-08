import { ArrowRight, RecycleIcon } from 'lucide-react';

export default function WaqayahHero() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content - Text */}
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-flex items-center bg-green-100 px-3 py-1 rounded-full text-green-800 text-sm font-medium">
              <RecycleIcon className="h-4 w-4 mr-2" />
              Smart Waste Management
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Revolutionizing <span className="text-green-600">Recycling</span> With Artificial Intelligence
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700">
              AI-powered classification engine designed to integrate into future smart bins and recycling kiosks across the UAE.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#camera" className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors duration-300">
                Try Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Right Content - Visualization */}
          <div className="lg:w-1/2 relative">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <div className="aspect-video bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <h3 className="text-green-800 font-bold text-2xl mb-2">How Waqayah Works</h3>
                  <p className="text-gray-700 mb-4">One opening for all waste — our AI does the sorting</p>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-white rounded-lg p-3 shadow-md">
                      <div className="font-medium text-center">Input</div>
                      <p className="text-sm text-gray-600">User deposits any waste item</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-md">
                      <div className="font-medium text-center">Process</div>
                      <p className="text-sm text-gray-600">AI classifies waste type</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-md">
                      <div className="font-medium text-center">Output</div>
                      <p className="text-sm text-gray-600">Automated bin sorting</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-medium text-green-800">86.2%</h3>
                  <p className="text-sm text-gray-600">Classification Accuracy</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <h3 className="font-medium text-green-800">0.2s</h3>
                  <p className="text-sm text-gray-600">Processing Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Implementation Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
              <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-green-800">1</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Web/Mobile App Demo</h3>
              <p className="text-gray-600 text-sm">Interactive prototype showcasing classification technology</p>
            </div>
            
            <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
              <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-green-800">2</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Hardware Integration</h3>
              <p className="text-gray-600 text-sm">Attach camera + Raspberry Pi to real bins</p>
            </div>
            
            <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
              <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-green-800">3</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Municipal Integration</h3>
              <p className="text-gray-600 text-sm">Connect to municipal recycling system</p>
            </div>
            
            <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 transition-colors">
              <div className="bg-green-100 h-10 w-10 rounded-full flex items-center justify-center mb-4">
                <span className="font-bold text-green-800">4</span>
              </div>
              <h3 className="font-medium text-lg mb-2">Reward System</h3>
              <p className="text-gray-600 text-sm">Incentivize with Emirates ID or "Green Points"</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-blue-800 font-medium text-lg mb-2">Dubai Metro or Mall Implementation</h3>
            <p className="text-gray-700">
              System installation at Dubai Mall or metro stations provides a single waste deposit point where the AI automatically sorts items, making recycling effortless for residents and tourists alike.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}