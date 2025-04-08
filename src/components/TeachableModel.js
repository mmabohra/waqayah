import React, { useRef, useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableModel = ({ onResultsUpdate }) => {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const webcamObjRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const rafIdRef = useRef(null);
  
  // Default performance setting - using a moderate frame skip value
  const frameSkip = 2; 
  const frameCount = useRef(0);
  const modelURL = "https://teachablemachine.withgoogle.com/models/I4POmI6M5/";
  
  useEffect(() => {
    async function setupModel() {
      try {
        // Load the model first
        const modelURLPath = modelURL + "model.json";
        const metadataURL = modelURL + "metadata.json";
        console.log("Loading model...");
        const model = await tmImage.load(modelURLPath, metadataURL);
        modelRef.current = model;
        console.log("Model loaded successfully");
        
        // Setup webcam
        const flip = true;
        const webcam = new tmImage.Webcam(640, 480, flip);
        webcamObjRef.current = webcam;
        
        // Setup camera
        await webcam.setup();
        console.log("Webcam setup complete");
        await webcam.play();
        console.log("Webcam started playing");
        
        // Only append the webcam canvas once we know it's properly setup
        if (webcamRef.current) {
          // Make sure container is empty
          webcamRef.current.innerHTML = '';
          webcamRef.current.appendChild(webcam.canvas);
          
          // Style the canvas
          webcam.canvas.style.width = '100%';
          webcam.canvas.style.height = '100%';
          webcam.canvas.style.objectFit = 'cover';
        }
        
        setIsLoading(false);
        predict();
        
      } catch (err) {
        console.error("Error in setup:", err);
        if (err.name === 'NotAllowedError') {
          setError("Camera access denied. Please allow camera permissions.");
        } else if (err.name === 'NotFoundError') {
          setError("No camera found on your device.");
        } else {
          setError(`Error: ${err.message}`);
        }
        setIsLoading(false);
      }
    }
    
    setupModel();
    
    // Cleanup function
    return () => {
      console.log("Cleaning up TeachableModel");
      if (webcamObjRef.current) {
        webcamObjRef.current.stop();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);
  
  const predict = async () => {
    // Update the webcam frame
    if (webcamObjRef.current) {
      webcamObjRef.current.update();
    }
    
    // Only run prediction on some frames to balance performance
    frameCount.current = (frameCount.current + 1) % frameSkip;
    
    if (frameCount.current === 0 && modelRef.current && webcamObjRef.current) {
      try {
        const predictions = await modelRef.current.predict(webcamObjRef.current.canvas);
        
        // Send prediction results to parent
        if (onResultsUpdate) {
          const formattedResults = predictions.map(p => ({
            className: p.className,
            probability: p.probability
          }));
          onResultsUpdate(formattedResults);
        }
      } catch (err) {
        console.error("Prediction error:", err);
      }
    }
    
    // Continue loop
    rafIdRef.current = requestAnimationFrame(predict);
  };
  
  return (
    <div className="w-full h-full bg-black relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black">
          <div className="text-white text-center">
            {error ? (
              <p className="text-red-300">{error}</p>
            ) : (
              <>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p>Initializing camera...</p>
              </>
            )}
          </div>
        </div>
      )}
      <div 
        ref={webcamRef} 
        className="webcam-container w-full h-full"
      />
    </div>
  );
};

export default TeachableModel;