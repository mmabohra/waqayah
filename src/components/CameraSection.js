import { useState, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle } from 'lucide-react';
import TeachableModel from './TeachableModel';

export default function CameraSection() {
  const [isModelActive, setIsModelActive] = useState(false);
  const [classificationResults, setClassificationResults] = useState([]);
  const [modelKey, setModelKey] = useState(Date.now());

  const handleClassificationResults = (results) => {
    if (results && results.length > 0) {
      setClassificationResults(results);
    }
  };

  const startClassification = () => {
    setIsModelActive(true);
  };

  const resetClassification = () => {
    setModelKey(Date.now());
    setClassificationResults([]);
  };

  const topResult = classificationResults.length > 0 ? 
    classificationResults.reduce((prev, current) => 
      (prev.probability > current.probability) ? prev : current
    ) : null;

  const getConfidenceIndicator = (probability) => {
    if (probability > 0.8) return { color: "text-green-600", bgColor: "bg-green-600" };
    if (probability > 0.5) return { color: "text-yellow-600", bgColor: "bg-yellow-600" };
    return { color: "text-red-600", bgColor: "bg-red-600" };
  };

  return (
    <div id="camera" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Experience AI Classification</h2>
          <p className="mt-4 text-lg text-gray-600">See how Waqayah's AI identifies waste items in real-time</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {!isModelActive ? (
              <div className="p-8 text-center">
                <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
                  <Camera className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Live AI Classification</h3>
                <p className="text-gray-600 mb-6">
                  Activate your camera and show items to see real-time waste classification in action.
                </p>
                <div className="space-y-4">
                  <button
                    onClick={startClassification}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Activate Camera
                  </button>
                  <div className="text-sm text-gray-500">
                    <p>Note: This feature may cause high CPU usage on some devices</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 relative">
                  <div className="bg-black w-full aspect-video">
                    <TeachableModel 
                      key={modelKey}
                      onResultsUpdate={handleClassificationResults}
                    />
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-black/50 text-white py-1 px-3 rounded-full text-sm flex items-center">
                    <div className="h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    Live Classification
                  </div>
                </div>
                
                <div className="md:w-2/5 p-4 bg-gray-50 border-l">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg">Live Results</h3>
                    <div className="flex space-x-2">
                      
                    </div>
                  </div>
                  
                  {topResult ? (
                    <div className="mb-6 p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${topResult && getConfidenceIndicator(topResult.probability).bgColor} mr-2`}></div>
                        <h4 className="font-medium">Current Detection:</h4>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className={`text-xl font-bold ${topResult && getConfidenceIndicator(topResult.probability).color}`}>
                          {topResult.className}
                        </span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {(topResult.probability * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-3 bg-white rounded-lg shadow-sm">
                      <p className="text-gray-500 text-center">Waiting for items...</p>
                    </div>
                  )}

                  <h4 className="font-medium text-sm text-gray-600 mb-2">All Probabilities</h4>
                  <div className="space-y-3">
                    {classificationResults.map((result, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-16 text-sm">{result.className}</div>
                        <div className="flex-1 ml-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 ${getConfidenceIndicator(result.probability).bgColor} rounded-full`}
                              style={{ width: `${result.probability * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-2 text-xs text-gray-600 w-12 text-right">
                          {(result.probability * 100).toFixed(1)}%
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium text-sm text-gray-600 mb-2">Performance Tips</h4>
                    <p className="text-xs text-gray-500">
                      Use a plain background for higher accuracy, avoid cluttered environments and ensure good lighting.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-medium text-green-800 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Single-Input Smart Waste Management
            </h3>
            <p className="mt-2 text-gray-700">
              Waqayah's system uses this same technology in smart bins that accept all waste types in a single opening. The AI automatically classifies items and the bin sorts them internally, eliminating human error.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}