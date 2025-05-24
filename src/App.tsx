import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Onboarding components
import GetStarted from './components/onboarding/GetStarted';
import Welcome from './components/onboarding/Welcome';
import WhyLearning from './components/onboarding/WhyLearning';
import Benefits from './components/onboarding/Benefits';
import GoalTime from './components/onboarding/GoalTime';
import Signup from './components/onboarding/Signup';
import Login from './components/onboarding/Login';

// Learning components
import Dashboard from './components/learning/Dashboard';
import CategorySelector from './components/learning/CategorySelector';
import ModeSelector from './components/learning/ModeSelector';
import LearnMode from './components/learning/LearnMode';
import QuizMode from './components/learning/QuizMode';
import QuizResults from './components/learning/QuizResults';
import PracticeMode from './components/learning/PracticeMode';
import Dictionary from './components/learning/Dictionary';
import FinalPage from './components/learning/FinalPage';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// App component with routes
const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    // This effect intentionally left empty to avoid redirects on mount
    // The redirection is handled in the route definitions
  }, [isAuthenticated]);

  return (
    <Routes>
      {/* Onboarding routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <GetStarted />} />
      <Route path="/onboarding/welcome" element={<Welcome />} />
      <Route path="/onboarding/why-learning" element={<WhyLearning />} />
      <Route path="/onboarding/benefits" element={<Benefits />} />
      <Route path="/onboarding/goal-time" element={<GoalTime />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/category-selector" element={
        <ProtectedRoute>
          <CategorySelector />
        </ProtectedRoute>
      } />
      <Route path="/mode-selector" element={
        <ProtectedRoute>
          <ModeSelector />
        </ProtectedRoute>
      } />
      <Route path="/learn" element={
        <ProtectedRoute>
          <LearnMode />
        </ProtectedRoute>
      } />
      <Route path="/quiz" element={
        <ProtectedRoute>
          <QuizMode />
        </ProtectedRoute>
      } />
      <Route path="/quiz-results" element={
        <ProtectedRoute>
          <QuizResults />
        </ProtectedRoute>
      } />
      <Route path="/practice" element={
        <ProtectedRoute>
          <PracticeMode />
        </ProtectedRoute>
      } />
      <Route path="/dictionary" element={
        <ProtectedRoute>
          <Dictionary />
        </ProtectedRoute>
      } />
      <Route path="/final" element={
        <ProtectedRoute>
          <FinalPage />
        </ProtectedRoute>
      } />
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;