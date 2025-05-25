# ✋ SignLearn – Sign Language Learning Platform

> 🚀 Built in 24 hours at a Hackathon

*SignLearn* is a modern, multi-page React + TypeScript (.tsx) web application designed to help users learn basic American Sign Language (ASL). It provides an engaging learning experience through onboarding flows, interactive lessons, quizzes, a practice mode powered by machine learning, and a mini dictionary of essential signs.

---

## 🧠 Why SignLearn?

Millions of people rely on sign language to communicate — yet resources to learn it are often limited or unengaging. *SignLearn* aims to bridge that gap with a beginner-friendly, accessible, and fun platform built with the latest web technologies — all crafted in under 24 hours during a hackathon sprint.

---

## 🌟 Features

### 👋 Onboarding Flow
- *Get Started / Login* with seamless routing
- *Welcome Page* with animated hand GIF
- *Why Learn Page*: Select reason (stored in localStorage)
- *Benefits Page*: List of benefits to learn sign language
- *Goal Timer Page*: Choose 5, 10, or 15 mins → alert when done ✅

### 🔐 Auth
- *Signup/Login forms* (localStorage based)
- *Persisted user session* on refresh or reload

### 🧩 Categories
- Alphabet (Enabled)
- Communication (Coming Soon)
- Words (Coming Soon)

### 🔄 Modes
- *Learn Mode*: View A–Z signs with GIFs/videos
- *Quiz Mode*: 5 random multiple-choice questions
- *Practice Mode*: Real-time webcam-based sign detection using ML (A, B, C etc.)

### 🧠 ML-Powered Practice Mode
- Built using *Teachable Machine* + *TensorFlow.js*
- Recognizes signs for *Alphabets*
- Shows:
  - Webcam input
  - Detected sign label
  - Confidence score
  - Success feedback (e.g., green border)

### 📖 Dictionary
- Search A–Z signs or some common words like:
  Hello, Bye, Thank You, I Love You, Yes, No, Please, Good, Morning, Friend
- Clickable quick buttons for easy access
- Shows GIF or video for each

### 🎉 Final Page
- “Well done! You’re amazing!” message
- Restart or Logout

---

## ⚙ Tech Stack

| Tech               | Purpose                              |
| ------------------ | ------------------------------------ |
| React + TypeScript | Component logic & UI                 |
| React Router v6    | Page routing/navigation              |
| TailwindCSS        | Styling and responsive layout        |
| TensorFlow\.js     | Real-time sign detection             |
| Teachable Machine  | ML model creation                    |
| React Webcam       | Webcam feed in Practice Mode         |
| localStorage API   | Persisting user auth & session state |

---

## 📁 Folder Structure

SignLearn/
├── public/
│   └── _redirects
|
├── src/
│   ├── assets/
│   │   ├── videos/
│   │       ├── A.mp4
│   │       ├── B.mp4
│   │       └── ... 
│   │       
│   ├── components/
│   │   ├──layout/
│   │   |   ├── Footer.tsx
│   │   |   ├── Header.tsx
│   │   |   └── Layout.tsx
|   |   |
│   |   ├── learning/
│   │   |     ├── CategorySelector.tsx
|   |   |     ├── Dashboard.tsx
│   │   |     ├── Dictionary.tsx
│   │   |     ├── FinalPage.tsx
│   │   |     ├── LearnMode.tsx
|   |   |     ├── ModeSelector.tsx
|   |   |     ├── PracticeMode.tsx
|   |   |     ├── QuizMode.tsx
|   |   |     ├── QuizResults.tsx
|   |   |
|   |   |
|   |   ├── onboarding
|   |   |      ├── Benefits.tsx 
|   |   |      ├── GetStarted.tsx
|   |   |      ├── GoalTime.tsx
|   |   |      ├── Login.tsx
|   |   |      ├── Signup.tsx
|   |   |      ├── Welcome.tsx
|   |   |      ├── WhyLearning.tsx
|   |   |
|   |   ├── ui
|   |        ├── Button.tsx
|   |        ├── Card.tsx
|   |        ├── Input.tsx
|   |        ├── Loader.tsx
|   |   
|   |   
|   ├── context  
|   |      ├── AuthContext.tsx
|   |
|   |
|   ├── data
|   |     ├── alphabetSigns.ts
|   |     ├── quizQuestions.ts
|   |     ├── wordSigns.ts
|   |   
|   |   
|   ├── hooks
|   |      ├── useLocalStorage.tsx
|   |       
|   ├── types 
|   |       ├── index.ts
|   |   
│   │   
│   ├── App.tsx
│   ├── main.tsx
│   └── ...
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

_

## 🛠 How to Run Locally

``bash
# Clone the repo
git clone https://github.com/your-username/signlearn.git
cd signlearn

# Install dependencies
npm install

# Start the development server
npm start

_

🚀 Future Improvements
Full-word sign recognition (not just letters)

Daily streak tracking and rewards

Backend integration for storing progress

Dark mode and accessibility upgrades

Multiplayer or peer learning feature

—

👥 Built With Love (and No Sleep)
This project was designed, built, and deployed within 24 hours by a passionate team during a hackathon ❤‍🔥


🔗 Live Demo: [Click here to view the deployed app] (https://project-signlearn.netlify.app/)

—

MIT License | © 2025 SignLearn Team

—
