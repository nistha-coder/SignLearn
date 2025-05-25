import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import {  ExternalLink } from 'lucide-react';
import Layout from '../layout/Layout';
import { alphabetSigns } from '../../data/alphabetSigns';
import { AlphabetSign } from '../../types';

const LearnMode: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentSign: AlphabetSign = alphabetSigns[currentIndex];

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < alphabetSigns.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Navigate to final page when reached the end
      navigate('/final');
    }
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
            <h1 className="text-3xl font-bold mb-3">Learn Alphabet Signs🔠</h1>
            <p className="text-gray-300">
              Study each sign and practice on your own
            </p>
          </motion.div>

          <motion.div
            key={currentSign.letter}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-bg-medium p-6 rounded-xl border border-gray-700 max-w-2xl mx-auto mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="w-full h-64 rounded-lg overflow-hidden mb-4 bg-gray-800 flex items-center justify-center">
                  <video 
                    src={currentSign.gifUrl} 
                    className="h-full object-contain" 
                    controls 
                    autoPlay 
                    loop 
                    muted 
                  />
                </div>
                <a 
                  href={currentSign.gifUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary flex items-center hover:underline"
                >
                  <ExternalLink size={14} className="mr-1" />
                  View full size
                </a>
              </div>
              
              <div>
                <div className="flex items-center justify-center md:justify-start mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-20 rounded-full">
                    <span className="text-3xl font-bold text-primary">{currentSign.letter}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-2">{currentSign.letter} - {currentSign.name}</h2>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">How to Sign:</h3>
                  <p className="text-gray-300">
                    Follow the demonstration in the video to form the sign for letter {currentSign.letter}.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Tips:</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Practice the hand position slowly at first</li>
                    <li>Pay attention to finger placement and orientation</li>
                    <li>Try forming the sign without looking at the example</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between max-w-2xl mx-auto">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentIndex === 0}
             
            >
              ← Previous
            </Button>
            
            <div className="text-center">
              <span className="text-gray-300">
                {currentIndex + 1} of {alphabetSigns.length}
              </span>
            </div>
            
            <Button 
              variant="primary" 
              onClick={handleNext}
              
              className="flex flex-row-reverse"
            >
              {currentIndex < alphabetSigns.length - 1 ? 'Next →' : 'Finish →'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LearnMode;