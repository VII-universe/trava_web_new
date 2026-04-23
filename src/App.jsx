import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
// Force redeploy to 69a0781 state
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import { fetchAllFromSupabase } from './data/adminStore';
import Hero from './components/Hero';
import About from './components/About';
import Icefall from './components/Icefall';
import Expeditions from './components/Expeditions';
import Hotel from './components/Hotel';
import Pub from './components/Pub';
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
import CookieConsent from './components/CookieConsent';
import { ReactLenis } from 'lenis/react';
import { ScrollLockHandler } from './hooks/useScrollLock';
import 'lenis/dist/lenis.css';

function App() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [contentReady, setContentReady] = useState(false);

  // Reset scroll synchronously before every paint where contentReady changes.
  // The browser restores scroll position asynchronously during the loading spinner phase,
  // so we must reset again right before ReactLenis mounts (when contentReady flips to true).
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [contentReady]);

  useEffect(() => {
    fetchAllFromSupabase().finally(() => setContentReady(true));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll over extended height for 11 sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Snappier spring on mobile so sections track finger immediately
  const smoothProgress = useSpring(scrollYProgress, isMobile
    ? { stiffness: 160, damping: 32, restDelta: 0.001 }
    : { stiffness: 120, damping: 28, restDelta: 0.001 }
  );

  // Dark bridge covering Projects + Media transition so ivory never shows through
  const projectsMediaBridge = useTransform(smoothProgress, [0.69, 0.72, 0.88, 0.90], [0, 1, 1, 0]);
  // Dark bridge covering Media + Contact transition
  const mediaContactBridge = useTransform(smoothProgress, [0.85, 0.87, 1.0, 1.0], [0, 1, 1, 1]);

  if (!contentReady) return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <ReactLenis root options={{ smoothTouch: true, lerp: 0.08, touchMultiplier: 0.7 }}>
      <ScrollLockHandler />
      <div ref={containerRef} className="relative h-[1400vh] bg-ivory selection:bg-gold-400 selection:text-white">

        {/* Mobile scroll-snap anchors — 11 sections */}
        {[0.00, 0.09, 0.18, 0.27, 0.36, 0.45, 0.54, 0.63, 0.72, 0.81, 0.90].map((pct, i) => (
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

          {/* Phase 5: Hotel (0.36 - 0.47) */}
          <Hotel scrollProgress={smoothProgress} />

          {/* Phase 6: Czech Pub (0.45 - 0.56) */}
          <Pub scrollProgress={smoothProgress} />

          {/* Phase 7: E-shop (0.54 - 0.65) */}
          <Eshop scrollProgress={smoothProgress} />

          {/* Phase 8: Přednášky (0.63 - 0.74) */}
          <Lectures scrollProgress={smoothProgress} />

          {/* Dark bridge: prevents ivory showing through Projects→Media transition */}
          <motion.div
            style={{ opacity: projectsMediaBridge, zIndex: 35 }}
            className="absolute inset-0 bg-gradient-to-b from-[#1A202C] to-[#0F172A] pointer-events-none"
          />

          {/* Phase 9: Projekty (0.72 - 0.83) */}
          <Projects scrollProgress={smoothProgress} />

          {/* Phase 10: Média & Obsah (0.81 - 0.93) */}
          <Media scrollProgress={smoothProgress} />

          {/* Dark bridge: prevents ivory showing through Media→Contact transition */}
          <motion.div
            style={{ opacity: mediaContactBridge, zIndex: 35 }}
            className="absolute inset-0 bg-slate-900 pointer-events-none"
          />

          {/* Phase 11: Kontakt (0.90 - 1.0) */}
          <Contact scrollProgress={smoothProgress} />
        </div>
      </div>

    </div>
      <CookieConsent />
    </ReactLenis>
  );
}

export default App;
