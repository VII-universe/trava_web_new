import React, { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Icefall from './components/Icefall';
import Expeditions from './components/Expeditions';
import Nepal from './components/Nepal';
import Lectures from './components/Lectures';
import Summit from './components/Summit';
import Contact from './components/Contact';
import Altimeter from './components/Altimeter';
import ProgressBar from './components/ProgressBar';
import SnowOverlay from './components/SnowOverlay';
import CloudLayer from './components/CloudLayer';
import Media from './components/Media';
import Nav from './components/Nav';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

function App() {
  const containerRef = useRef(null);

  // Track scroll over extended height for 9 sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Updated spring settings: slightly softer for more "floaty" feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.001 });

  return (
    <ReactLenis root>
      <div ref={containerRef} className="relative h-[1600vh] bg-ivory selection:bg-gold-400 selection:text-white">

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

          {/* Phase 1: Hero (0.0 - 0.2) */}
          <Hero scrollProgress={smoothProgress} />

          {/* Phase 2: About / Base Camp (0.2 - 0.4) */}
          <About scrollProgress={smoothProgress} />

          {/* Phase 3: Partneři — flags rope (0.32 - 0.50) */}
          <Icefall scrollProgress={smoothProgress} />

          {/* Phase 4: Expedice & 14Summits (0.48 - 0.66) */}
          <Expeditions scrollProgress={smoothProgress} />

          {/* Phase 5: Nepal — Pub & Hotel (0.64 - 0.80) */}
          <Nepal scrollProgress={smoothProgress} />

          {/* Phase 6: Projekty & Přednášky (0.78 - 0.90) */}
          <Lectures scrollProgress={smoothProgress} />

          {/* Phase 7: Média & Obsah (0.86 - 0.96) */}
          <Media scrollProgress={smoothProgress} />

          {/* Phase 8: Zdravotní osvěta (0.90 - 0.98) */}
          <Summit scrollProgress={smoothProgress} />

          {/* Phase 9: Kontakt (0.96 - 1.0) */}
          <Contact scrollProgress={smoothProgress} />
        </div>
      </div>

    </div>
    </ReactLenis>
  );
}

export default App;
