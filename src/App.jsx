import React, { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Icefall from './components/Icefall';
import Climb from './components/Climb';
import Summit from './components/Summit';
import Altimeter from './components/Altimeter';
import ProgressBar from './components/ProgressBar';
import SnowOverlay from './components/SnowOverlay';
import CloudLayer from './components/CloudLayer';

function App() {
  const containerRef = useRef(null);

  // Track scroll over extended height for 5 sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Updated spring settings: slightly softer for more "floaty" feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 40, damping: 25, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[850vh] bg-ivory selection:bg-gold-400 selection:text-white">

      <div className="fixed inset-0 overflow-hidden">
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

        {/* Phase 3: The Icefall (0.4 - 0.6) */}
        <Icefall scrollProgress={smoothProgress} />

        {/* Phase 4: The Climb / Death Zone (0.6 - 0.8) */}
        <Climb scrollProgress={smoothProgress} />

        {/* Phase 5: The Summit (0.8 - 1.0) */}
        <Summit scrollProgress={smoothProgress} />

      </div>

    </div>
  );
}

export default App;