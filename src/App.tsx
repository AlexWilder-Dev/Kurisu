import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { BookBar } from './components/BookBar';
import { Home } from './pages/Home';
import { BeforeYouBook } from './pages/BeforeYouBook';
import { StoryPage } from './pages/StoryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HashRouter>
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <TopBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/before-you-book" element={<BeforeYouBook />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <BookBar />
      </MotionConfig>
    </HashRouter>
  );
}
