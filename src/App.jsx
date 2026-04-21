import React, { useRef, useState, useEffect } from 'react';
// Force redeploy to 69a0781 state
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Icefall from './components/Icefall';
import Expeditions from './components/Expeditions';
import Nepal from './components/Nepal';
import Eshop from './components/Eshop';
import Lectures from './components/Lectures';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Altimeter from './components/Altimeter';
import ProgressBar from './components/ProgressBar';
import SnowOverlay from './components/SnowOverlay';
import CloudLayer from './components/CloudLayer';
import Media from './components/Media';
import Nav from './components/Nav';
import { ReactLenis } from 'lenis/react';
import { ScrollLockHandler } from './hooks/useScrollLock';
import 'lenis/dist/lenis.css';

function App() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll over extended height for 9 sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Snappier spring on mobile so sections track finger immediately
  const smoothProgress = useSpring(scrollYProgress, isMobile
    ? { stiffness: 500, damping: 60, restDelta: 0.001 }
    : { stiffness: 40, damping: 25, restDelta: 0.001 }
  );

  return (
    <ReactLenis root options={{ smoothTouch: false, syncTouch: true }}>
      <ScrollLockHandler />
      <div ref={containerRef} className="relative h-[1600vh] bg-ivory selection:bg-gold-400 selection:text-white">

        {/* Mobile scroll-snap anchors — 10 sections */}
        {[0.00, 0.08, 0.18, 0.27, 0.38, 0.49, 0.59, 0.68, 0.77, 0.87].map((pct, i) => (
          <div
            key={i}
            className="absolute w-full h-0 scroll-snap-anchor-start"
            style={{ top: `${pct * 100}%` }}
          />
        ))}

      {/* Sticky viewport (camera frame) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          {/* Navigation Overlay */}
          <Nav scrollProgress={smoothProgress} />

          {/* Global Progress Indicators */}
          <ProgressBar scrollProgress={smoothProgress} />
          <Altimeter scrollProgress={smoothProgress} />
          <SnowOverlay scrollProgress={smoothProgress} />

          {/* Cloud transitions between sections */}
          <CloudLayer scrollProgress={smoothProgress} />

          {/* Phase 1: Hero (0.00 - 0.11) */}
          <Hero scrollProgress={smoothProgress} />

          {/* Phase 2: O Honzovi (0.08 - 0.21) */}
          <About scrollProgress={smoothProgress} />

          {/* Phase 3: Partneři (0.18 - 0.30) */}
          <Icefall scrollProgress={smoothProgress} />

          {/* Phase 4: Expedice & 14Summits (0.27 - 0.41) */}
          <Expeditions scrollProgress={smoothProgress} />

          {/* Phase 5: Nepal — Pub & Hotel (0.38 - 0.52) */}
          <Nepal scrollProgress={smoothProgress} />

          {/* Phase 6: E-shop (0.49 - 0.62) */}
          <Eshop scrollProgress={smoothProgress} />

          {/* Phase 7: Přednášky (0.59 - 0.71) */}
          <Lectures scrollProgress={smoothProgress} />

          {/* Phase 8: Projekty (0.68 - 0.80) */}
          <Projects scrollProgress={smoothProgress} />

          {/* Phase 9: Média & Obsah (0.77 - 0.90) */}
          <Media scrollProgress={smoothProgress} />

          {/* Phase 10: Kontakt (0.87 - 1.0) */}
          <Contact scrollProgress={smoothProgress} />
        </div>
      </div>

    </div>
    </ReactLenis>
  );
}

export default App;
