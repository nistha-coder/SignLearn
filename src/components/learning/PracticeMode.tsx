import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Loader from '../ui/Loader';
import { AlertTriangle, Camera, Info, Video, SkipForward } from 'lucide-react';
import Layout from '../layout/Layout';
import Webcam from 'react-webcam';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/ZAivzygee/";

type Prediction = {
  className: string;
  probability: number;
};

const PracticeMode: React.FC = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [error, setError] = useState('');
  const [recentPredictions, setRecentPredictions] = useState<string[]>([]);
  const [targetLetter, setTargetLetter] = useState('A');
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const labels = ["No sign", "A", "B", "C", "E", "D", "ILoveYou", "same"];
  const supportedLetters = ["A", "B", "C", "E", "D", "ILoveYou", "same"];

  // Load the Teachable Machine model
  useEffect(() => {
    async function loadModel() {
      try {
        setIsModelLoading(true);
        const loadedModel = await tmImage.load(MODEL_URL + 'model.json', MODEL_URL + 'metadata.json');
        setModel(loadedModel);
        setIsModelLoading(false);
      } catch (err) {
        console.error('Model load error:', err);
        setError('Unable to load model. Please try again.');
        setIsModelLoading(false);
      }
    }
    loadModel();
  }, []);

  // Predict using webcam
  const handlePrediction = async () => {
    if (!model || !webcamRef.current?.video || webcamRef.current.video.readyState !== 4) return;

    try {
      const prediction = await model.predict(webcamRef.current.video) as Prediction[];
      const bestMatch = prediction.reduce((prev, curr) =>
        prev.probability > curr.probability ? prev : curr
      );

      // Feedback logic
      if (bestMatch.className === "No sign") {
        setFeedbackMessage("⚠️ Unable to detect");
      } else if (bestMatch.className === targetLetter) {
        setFeedbackMessage("✅ Correct!");
      } else {
        setFeedbackMessage("❌ Incorrect!");
      }

      // Store recent predictions for majority check
      setRecentPredictions(prev => {
        const updated = [...prev, bestMatch.className];
        if (updated.length > 5) updated.shift();
        return updated;
      });
    } catch (e) {
      console.error('Prediction error:', e);
      setFeedbackMessage("⚠️ Unable to detect");
    }
  };

  // Check majority match
  useEffect(() => {
    const countMap: Record<string, number> = {};
    for (const label of recentPredictions) {
      countMap[label] = (countMap[label] || 0) + 1;
    }
    const majority = Object.entries(countMap).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0]);

    if (
      majority[0] !== "No sign" &&
      majority[0] === targetLetter &&
      majority[1] >= 3
    ) {
      setIsCorrect(true);
      const currentIndex = supportedLetters.indexOf(targetLetter);
      const nextIndex = (currentIndex + 1) % supportedLetters.length;
      setTimeout(() => {
        setTargetLetter(supportedLetters[nextIndex]);
        setIsCorrect(false);
        setRecentPredictions([]);
        setFeedbackMessage('');
      }, 1000);
    }
  }, [recentPredictions, targetLetter]);

  // Interval prediction
  useEffect(() => {
    if (isModelLoading || !isWebcamReady || error) return;
    const interval = setInterval(() => {
      handlePrediction();
    }, 500);
    return () => clearInterval(interval);
  }, [isModelLoading, isWebcamReady, error]);

  const handleSkip = () => {
    const currentIndex = supportedLetters.indexOf(targetLetter);
    const nextIndex = (currentIndex + 1) % supportedLetters.length;
    setTargetLetter(supportedLetters[nextIndex]);
    setRecentPredictions([]);
    setIsCorrect(false);
    setFeedbackMessage('');
  };

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
            <h1 className="text-3xl font-bold mb-3">Practice Sign Language🤟</h1>
            <p className="text-gray-300 ">
              Use your webcam to practice signs with real-time feedback
            </p>
          </motion.div>

          {isModelLoading ? (
            <Loader message="Loading sign language recognition model..." />
          ) : error ? (
            <div className="text-center">
              <AlertTriangle size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-4">Error Loading Model</h2>
              <p className="text-gray-300 mb-6">{error}</p>
              <Button onClick={() => navigate('/mode-selector')}>Go Back</Button>
            </div>
          ) : (
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
                        <Button onClick={() => setIsWebcamReady(true)}>Enable Camera</Button>
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
                          <div className="absolute inset-0 border-4 border-green-500 rounded-lg animate-pulse" />
                        )}
                      </>
                    )}
                  </div>
                  {isWebcamReady && feedbackMessage && (
                    <div className="mt-3 text-center">
                      <p className={`text-lg font-semibold ${
                        feedbackMessage.includes("Correct") ? "text-green-400"
                        : feedbackMessage.includes("Incorrect") ? "text-red-400"
                        : "text-yellow-400"
                      }`}>
                        {feedbackMessage}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-bg-medium p-4 rounded-xl border border-gray-700">
                  <div className="flex items-center mb-4">
                    <Info size={20} className="text-primary mr-2" />
                    <span className="font-medium">Instructions</span>
                  </div>
                  <div className="text-gray-300 space-y-2">
                    <p>1. Position yourself in front of the camera with good lighting</p>
                    <p>
                      2. Make the sign for letter{' '}
                      <span className="font-bold text-xl text-primary">{targetLetter}</span>
                    </p>
                    <p>3. Hold the sign steady until it's recognized</p>
                    <p>4. Once recognized correctly, you'll move to the next sign</p>
                    <p>
  5. Show your hands only</p>
  <p>6. For better detection try moving your hands and showing them at different angles
</p>
                    <p className="text-sm text-gray-400 mt-4">
                      This model recognizes: A, B, C, D, E, ILoveYou, same
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-bg-medium p-4 rounded-xl border border-gray-700 mb-4 text-center">
                  <h2 className="text-lg font-semibold mb-3">Stuck?</h2>
                  <p className="text-gray-300 mb-4">If you're unable to make the sign correctly, skip to the next one.</p>
                  <Button variant="secondary" onClick={handleSkip}>
                    ⏭️ Skip Sign
                  </Button>
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
