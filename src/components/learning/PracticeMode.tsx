import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import { AlertTriangle, Camera, CheckCircle, Info, Video } from 'lucide-react';
import Layout from '../layout/Layout';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import { MLPrediction } from '../../types';

const PracticeMode: React.FC = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const modelRef = useRef<tf.LayersModel | null>(null);
  
  const [isModelLoading, setIsModelLoading] = useState<boolean>(true);
  const [isWebcamReady, setIsWebcamReady] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [predictions, setPredictions] = useState<MLPrediction[]>([]);
  const [targetLetter, setTargetLetter] = useState<string>('A');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState<number>(0);
  
  // Letters supported by the model
  const supportedLetters = ['A', 'B', 'C'];

  // Load TensorFlow model
  useEffect(() => {
    async function loadModel() {
      try {
        setIsModelLoading(true);
        
        // URL to your pre-trained model
        // This is a placeholder URL - replace with actual model URL when available
        //const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/sign_language_model/model.json';
        
        // For now, we'll use a mock prediction approach since we don't have an actual model
        // In a real implementation, this would be:
        // const loadedModel = await tf.loadLayersModel(modelUrl);
        // modelRef.current = loadedModel;
        
        // Simulate model loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsModelLoading(false);
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to load the sign language recognition model. Please try again later.');
        setIsModelLoading(false);
      }
    }
    
    loadModel();
    
    return () => {
      // Cleanup
      if (modelRef.current) {
        // In a real implementation, you might need to dispose of the model
        // modelRef.current.dispose();
      }
    };
  }, []);

  // Function to handle predictions (mock implementation for now)
  const handlePrediction = () => {
    if (!webcamRef.current || !isWebcamReady) return;
    
    // In a real implementation, you would:
    // 1. Capture an image from the webcam
    // 2. Preprocess it for the model
    // 3. Run it through the model
    // 4. Get the predictions
    
    // Mock implementation for demo purposes
    const mockPredictions: MLPrediction[] = [
      { className: 'A', probability: Math.random() * 0.5 + 0.3 },
      { className: 'B', probability: Math.random() * 0.3 },
      { className: 'C', probability: Math.random() * 0.3 },
    ];
    
    // Boost the probability for the target letter to simulate successful detection
    // This is just for demo purposes
    if (Math.random() > 0.3) {
      const targetIndex = mockPredictions.findIndex(p => p.className === targetLetter);
      if (targetIndex !== -1) {
        mockPredictions[targetIndex].probability = Math.random() * 0.3 + 0.7; // 70-100%
      }
    }
    
    // Sort predictions by probability
    mockPredictions.sort((a, b) => b.probability - a.probability);
    
    setPredictions(mockPredictions);
    
    // Check if the top prediction matches the target letter
    const topPrediction = mockPredictions[0];
    const isCorrectPrediction = topPrediction.className === targetLetter && topPrediction.probability > 0.7;
    
    setIsCorrect(isCorrectPrediction);
    
    if (isCorrectPrediction) {
      setConsecutiveCorrect(prev => prev + 1);
      
      // If correct for 3 consecutive frames, move to the next letter
      if (consecutiveCorrect >= 2) {
        const currentIndex = supportedLetters.indexOf(targetLetter);
        const nextIndex = (currentIndex + 1) % supportedLetters.length;
        setTargetLetter(supportedLetters[nextIndex]);
        setConsecutiveCorrect(0);
      }
    } else {
      setConsecutiveCorrect(0);
    }
  };
  
  // Run predictions continuously
  useEffect(() => {
    if (isModelLoading || !isWebcamReady || error) return;
    
    const interval = setInterval(() => {
      handlePrediction();
    }, 500);
    
    return () => clearInterval(interval);
  }, [isModelLoading, isWebcamReady, error, targetLetter, consecutiveCorrect]);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-3">Practice Sign Language</h1>
            <p className="text-gray-300">
              Use your webcam to practice signs with real-time feedback
            </p>
          </motion.div>

          {isModelLoading ? (
            <div className="max-w-2xl mx-auto">
              <Loader message="Loading sign language recognition model..." />
            </div>
          ) : error ? (
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle size={48} className="text-error" />
              </div>
              <h2 className="text-xl font-semibold mb-4">Error Loading Model</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/mode-selector')}
              >
                Go Back
              </Button>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-bg-medium p-4 rounded-xl border border-gray-700 mb-4">
                    <div className="mb-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <Video size={20} className="text-primary mr-2" />
                        <span className="font-medium">Camera Feed</span>
                      </div>
                      {isWebcamReady && (
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                          <span className="text-sm text-gray-300">Live</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                      {!isWebcamReady ? (
                        <div className="text-center p-6">
                          <Camera size={48} className="mx-auto mb-4 text-gray-500" />
                          <p className="text-gray-300 mb-4">Camera access required for practice mode</p>
                          <Button 
                            variant="primary" 
                            onClick={() => setIsWebcamReady(true)}
                          >
                            Enable Camera
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Webcam
                            ref={webcamRef}
                            audio={false}
                            mirrored={true}
                            className="w-full h-full object-cover"
                          />
                          {isCorrect && (
                            <div className="absolute inset-0 border-4 border-success rounded-lg animate-pulse"></div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-bg-medium p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center mb-4">
                      <Info size={20} className="text-primary mr-2" />
                      <span className="font-medium">Instructions</span>
                    </div>
                    
                    <div className="text-gray-300 space-y-2">
                      <p>1. Position yourself in front of the camera with good lighting</p>
                      <p>2. Make the sign for letter <span className="font-bold text-xl text-primary">{targetLetter}</span> with your hand</p>
                      <p>3. Hold the sign steady until it's recognized</p>
                      <p>4. Once recognized correctly, you'll move to the next letter</p>
                      <p className="text-sm text-gray-400 mt-4">Note: This model currently only recognizes signs for letters A, B, and C</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-bg-medium p-4 rounded-xl border border-gray-700 mb-4">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary bg-opacity-20 flex items-center justify-center mr-3">
                        <span className="text-xl font-bold text-primary">{targetLetter}</span>
                      </div>
                      <span className="font-medium">Current Target</span>
                    </div>
                    
                    {isCorrect && (
                      <div className="mb-4 p-3 bg-success bg-opacity-10 border border-success rounded-lg flex items-center">
                        <CheckCircle size={18} className="text-success mr-2" />
                        <span className="text-success">Correct sign detected!</span>
                      </div>
                    )}
                    
                    <div className="flex justify-center mb-4">
                      <img 
                        src={`https://media.giphy.com/media/${
                          targetLetter === 'A' ? 'SvFULQU5PXh4Nl1lnZ' :
                          targetLetter === 'B' ? 'SiKCphEBX2L4c4HxER' : 'UpDYdsO2lznH0FVkks'
                        }/giphy.gif`}
                        alt={`Sign for letter ${targetLetter}`}
                        className="h-32 object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-bg-medium p-4 rounded-xl border border-gray-700">
                    <div className="flex items-center mb-4">
                      <span className="font-medium">Recognition Results</span>
                    </div>
                    
                    {isWebcamReady ? (
                      <div className="space-y-3">
                        {predictions.map((prediction, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-lg bg-bg-light flex items-center justify-center mr-2">
                                <span className="font-medium">{prediction.className}</span>
                              </div>
                              <span className="text-gray-300">
                                {prediction.className === 'A' ? 'Alpha' :
                                prediction.className === 'B' ? 'Bravo' : 'Charlie'}
                              </span>
                            </div>
                            <div className="w-32">
                              <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div 
                                  className="h-2.5 rounded-full bg-primary"
                                  style={{ width: `${prediction.probability * 100}%` }}
                                ></div>
                              </div>
                              <div className="text-right text-xs text-gray-400 mt-1">
                                {Math.round(prediction.probability * 100)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        Enable camera to see recognition results
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/mode-selector')}
                      className="w-full"
                    >
                      Exit Practice
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PracticeMode;