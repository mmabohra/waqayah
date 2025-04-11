export default function HowItWorksSection() {
  return (
    <div id="technical" className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Technical Information
        </h2>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="w-full h-480 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-xs">
              <img src="cnn.jpeg"></img>
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">CNN via Teachable Machine</h3>
          <p className="text-gray-600 text-sm mb-4">
            A lightweight (~2MB) convolutional neural network (CNN) trained with Teachable Machine classifies waste from a 640x480 webcam feed. It processes every 2nd frame in less than 0.5s with 86.2% accuracy, then a Raspberry Pi sorts the output.
          </p>
          <ul className="text-gray-600 text-xs space-y-2">
            <li><strong>Flow:</strong> Input → Conv (edges, features) → Pooling (shrink) → FC (scores)</li>
            <li><strong>Tech:</strong> WebGL for GPU speed, 30 FPS input</li>
            <li><strong>Setup:</strong> Webcam + Pi 4, no cloud needed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}