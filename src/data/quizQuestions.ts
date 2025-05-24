import { QuizQuestion } from '../types';

// Import videos
import A from '../assests/videos/A.mp4';
import B from '../assests/videos/B.mp4';
import C from '../assests/videos/C.mp4';
import D from '../assests/videos/D.mp4';
import E from '../assests/videos/E.mp4';
import F from '../assests/videos/F.mp4';
import G from '../assests/videos/G.mp4';
import H from '../assests/videos/H.mp4';
import I from '../assests/videos/I.mp4';
import J from '../assests/videos/J.mp4';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What letter is this sign?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'A',
    imageUrl: A,
  },
  {
    id: 2,
    question: 'What letter is this sign?',
    options: ['B', 'D', 'F', 'P'],
    correctAnswer: 'B',
    imageUrl: B,
  },
  {
    id: 3,
    question: 'What letter is this sign?',
    options: ['E', 'C', 'O', 'G'],
    correctAnswer: 'C',
    imageUrl: C,
  },
  {
    id: 4,
    question: 'What letter is this sign?',
    options: ['K', 'D', 'P', 'G'],
    correctAnswer: 'D',
    imageUrl: D,
  },
  {
    id: 5,
    question: 'What letter is this sign?',
    options: ['C', 'E', 'S', 'M'],
    correctAnswer: 'E',
    imageUrl: E,
  },
  {
    id: 6,
    question: 'What letter is this sign?',
    options: ['F', 'T', 'D', 'W'],
    correctAnswer: 'F',
    imageUrl: F,
  },
  {
    id: 7,
    question: 'What letter is this sign?',
    options: ['P', 'K', 'G', 'H'],
    correctAnswer: 'G',
    imageUrl: G,
  },
  {
    id: 8,
    question: 'What letter is this sign?',
    options: ['N', 'U', 'R', 'H'],
    correctAnswer: 'H',
    imageUrl: H,
  },
  {
    id: 9,
    question: 'What letter is this sign?',
    options: ['J', 'I', 'L', 'Y'],
    correctAnswer: 'I',
    imageUrl: I,
  },
  {
    id: 10,
    question: 'What letter is this sign?',
    options: ['I', 'Z', 'J', 'T'],
    correctAnswer: 'J',
    imageUrl: J,
  },
];
