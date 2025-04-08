import React, { useRef, useEffect, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const TeachableModel = ({ onResultsUpdate }) => {
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const webcamObjRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const rafIdRef = useRef(null);
  const frameSkip = 2;
  const frameCount = useRef(0);
  const modelURL = "https://teachablemachine.withgoogle.com/models/I4POmI6M5/";

  useEffect(() => {
    async function setupModel() {
      try {
        // Load the model
        const modelURLPath = modelURL + "model.json";
        const metadataURL = modelURL + "metadata.json";
        console.log("Loading model...");
        const model = await tmImage.load(modelURLPath, metadataURL);
        modelRef.current = model;
        console.log("Model loaded successfully");

        // Define camera constraints for back camera
        const constraints = {
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'environment' // Explicitly request back camera
          }
        };

        // Get media stream with back camera
        console.log("Requesting back camera...");
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        console.log("Media stream obtained:", stream.getVideoTracks()[0].label);

        // Initialize Teachable Machine Webcam with the stream
        const webcam = new tmImage.Webcam(640, 480, true); // flip = true
        webcamObjRef.current = webcam;

        // Manually set the stream
        await webcam.setup({ stream });
        console.log("Webcam setup with stream complete");

        // Start the webcam
        await webcam.play();
        console.log("Webcam started playing");

        // Append webcam canvas
        if (webcamRef.current) {
          webcamRef.current.innerHTML = '';
          webcamRef.current.appendChild(webcam.canvas);
          webcam.canvas.style.width = '100%';
          webcam.canvas.style.height = '100%';
          webcam.canvas.style.objectFit = 'cover';
        }

        setIsLoading(false);

        // Define and start prediction loop
        async function predict() {
          if (webcamObjRef.current) {
            webcamObjRef.current.update(); // Update the frame
          }

          frameCount.current = (frameCount.current + 1) % frameSkip;

          if (frameCount.current === 0 && modelRef.current && webcamObjRef.current) {
            try {
              const predictions = await modelRef.current.predict(webcamObjRef.current.canvas);
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

          rafIdRef.current = requestAnimationFrame(predict);
        }

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

    // Cleanup
    return () => {
      console.log("Cleaning up TeachableModel");
      if (webcamObjRef.current) {
        webcamObjRef.current.stop();
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onResultsUpdate]);

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
      <div ref={webcamRef} className="webcam-container w-full h-full" />
    </div>
  );
};

export default TeachableModel;