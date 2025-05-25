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
