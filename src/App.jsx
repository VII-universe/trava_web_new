import React, { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import About from './components/About';
import Icefall from './components/Icefall';
import Climb from './components/Climb';
import Altimeter from './components/Altimeter';

function App() {
  const containerRef = useRef(null);

  // Track scroll over extended height for 4 sections
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="relative h-[650vh] bg-ivory selection:bg-gold-400 selection:text-white">

      <div className="fixed inset-0 overflow-hidden">

        {/* Global Altimeter */}
        <Altimeter scrollProgress={smoothProgress} />

        {/* Phase 1: Hero (0.0 - 0.25) */}
        <Hero scrollProgress={smoothProgress} />

        {/* Phase 2: About / Base Camp (0.25 - 0.50) */}
        <About scrollProgress={smoothProgress} />

        {/* Phase 3: The Icefall (0.50 - 0.75) */}
        <Icefall scrollProgress={smoothProgress} />

        {/* Phase 4: The Climb / Death Zone (0.75 - 1.0) */}
        <Climb scrollProgress={smoothProgress} />

      </div>

    </div>
  );
}

export default App;