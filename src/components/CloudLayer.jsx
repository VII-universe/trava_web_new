import React from 'react';
import { motion, useTransform } from 'framer-motion';
import CloudA from '../assets/cloud_a.png';
import CloudB from '../assets/cloud_b.png';

/**
 * CloudLayer — renders multiple parallax cloud images that part on scroll
 * to reveal the next section, creating a 3-D fly-through-clouds feel.
 *
 * Section boundaries in the 5-section 850vh app:
 *   0.20  Hero → About
 *   0.40  About → Icefall (flags)
 *   0.60  Icefall → Climb
 *   0.80  Climb → Summit
 */

// Each cloud descriptor:
// src, initialX (% from left), initialY (% from top), w (vw),
// flyX (how far it travels horizontally, + = right, - = left),
// flyY (vertical travel, vh), opacity, scrollIn, scrollOut, zIndex
const CLOUDS = [
    // ─── Transition 0.20: Hero → About ────────────────────────
    { src: CloudA, ix: -5, iy: 70, w: 75, fx: -55, fy: -10, op: 0.90, sIn: 0.14, sMid: 0.20, sOut: 0.26, z: 50 },
    { src: CloudB, ix: 55, iy: 62, w: 65, fx: 50, fy: -8, op: 0.85, sIn: 0.14, sMid: 0.20, sOut: 0.26, z: 50 },
    { src: CloudA, ix: 20, iy: 80, w: 50, fx: -40, fy: 5, op: 0.60, sIn: 0.16, sMid: 0.21, sOut: 0.27, z: 40 },
    { src: CloudB, ix: 40, iy: 55, w: 45, fx: 45, fy: 8, op: 0.55, sIn: 0.17, sMid: 0.21, sOut: 0.27, z: 40 },
    // small wispy background clouds
    { src: CloudA, ix: -15, iy: 60, w: 40, fx: -20, fy: -15, op: 0.35, sIn: 0.13, sMid: 0.20, sOut: 0.28, z: 30 },
    { src: CloudB, ix: 70, iy: 75, w: 35, fx: 20, fy: -5, op: 0.30, sIn: 0.15, sMid: 0.20, sOut: 0.28, z: 30 },

    // ─── Transition 0.40: About → Icefall ─────────────────────
    { src: CloudB, ix: -8, iy: 65, w: 80, fx: -60, fy: -12, op: 0.92, sIn: 0.34, sMid: 0.40, sOut: 0.46, z: 50 },
    { src: CloudA, ix: 50, iy: 58, w: 72, fx: 58, fy: -10, op: 0.88, sIn: 0.34, sMid: 0.40, sOut: 0.46, z: 50 },
    { src: CloudA, ix: 15, iy: 78, w: 55, fx: -42, fy: 6, op: 0.65, sIn: 0.35, sMid: 0.41, sOut: 0.47, z: 40 },
    { src: CloudB, ix: 55, iy: 50, w: 48, fx: 44, fy: 10, op: 0.58, sIn: 0.36, sMid: 0.41, sOut: 0.47, z: 40 },
    { src: CloudB, ix: -20, iy: 55, w: 38, fx: -18, fy: -18, op: 0.32, sIn: 0.33, sMid: 0.40, sOut: 0.48, z: 30 },
    { src: CloudA, ix: 75, iy: 70, w: 42, fx: 22, fy: -8, op: 0.28, sIn: 0.35, sMid: 0.40, sOut: 0.48, z: 30 },

    // ─── Transition 0.60: Icefall → Climb ─────────────────────
    { src: CloudA, ix: -10, iy: 68, w: 85, fx: -65, fy: -14, op: 0.93, sIn: 0.54, sMid: 0.60, sOut: 0.66, z: 50 },
    { src: CloudB, ix: 48, iy: 60, w: 78, fx: 62, fy: -12, op: 0.90, sIn: 0.54, sMid: 0.60, sOut: 0.66, z: 50 },
    { src: CloudB, ix: 10, iy: 82, w: 58, fx: -45, fy: 8, op: 0.68, sIn: 0.55, sMid: 0.61, sOut: 0.67, z: 40 },
    { src: CloudA, ix: 58, iy: 52, w: 52, fx: 48, fy: 12, op: 0.60, sIn: 0.56, sMid: 0.61, sOut: 0.67, z: 40 },
    { src: CloudA, ix: -18, iy: 50, w: 44, fx: -22, fy: -20, op: 0.38, sIn: 0.53, sMid: 0.60, sOut: 0.68, z: 30 },
    { src: CloudB, ix: 78, iy: 72, w: 40, fx: 24, fy: -10, op: 0.33, sIn: 0.55, sMid: 0.60, sOut: 0.68, z: 30 },

    // ─── Transition 0.80: Climb → Summit ──────────────────────
    { src: CloudB, ix: -6, iy: 62, w: 90, fx: -70, fy: -16, op: 0.95, sIn: 0.74, sMid: 0.80, sOut: 0.86, z: 50 },
    { src: CloudA, ix: 45, iy: 55, w: 82, fx: 65, fy: -14, op: 0.92, sIn: 0.74, sMid: 0.80, sOut: 0.86, z: 50 },
    { src: CloudA, ix: 12, iy: 76, w: 60, fx: -48, fy: 10, op: 0.70, sIn: 0.75, sMid: 0.81, sOut: 0.87, z: 40 },
    { src: CloudB, ix: 60, iy: 48, w: 55, fx: 50, fy: 14, op: 0.62, sIn: 0.76, sMid: 0.81, sOut: 0.87, z: 40 },
    { src: CloudB, ix: -22, iy: 48, w: 46, fx: -25, fy: -22, op: 0.40, sIn: 0.73, sMid: 0.80, sOut: 0.88, z: 30 },
    { src: CloudA, ix: 80, iy: 68, w: 42, fx: 26, fy: -12, op: 0.35, sIn: 0.75, sMid: 0.80, sOut: 0.88, z: 30 },
];

const Cloud = ({ c, scrollProgress }) => {
    // Opacity: fade in → full → fade out
    const opacity = useTransform(
        scrollProgress,
        [c.sIn, c.sMid - 0.02, c.sMid + 0.02, c.sOut],
        [0, c.op, c.op, 0]
    );

    // Horizontal travel: centre → split apart as scroll progresses mid→out
    const x = useTransform(
        scrollProgress,
        [c.sIn, c.sMid, c.sOut],
        ['0vw', '0vw', `${c.fx}vw`]
    );

    // Vertical travel
    const y = useTransform(
        scrollProgress,
        [c.sIn, c.sMid, c.sOut],
        ['0vh', '0vh', `${c.fy}vh`]
    );

    // Slight scale-up as clouds approach (depth feel)
    const scale = useTransform(
        scrollProgress,
        [c.sIn, c.sMid, c.sOut],
        [0.85, 1, 1.15]
    );

    return (
        <motion.img
            src={c.src}
            style={{
                opacity,
                x,
                y,
                scale,
                position: 'absolute',
                left: `${c.ix}%`,
                top: `${c.iy}%`,
                width: `${c.w}vw`,
                pointerEvents: 'none',
                userSelect: 'none',
                zIndex: c.z,
                willChange: 'transform, opacity',
            }}
            alt=""
        />
    );
};

const CloudLayer = ({ scrollProgress }) => {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 60,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {CLOUDS.map((c, i) => (
                <Cloud key={i} c={c} scrollProgress={scrollProgress} />
            ))}
        </div>
    );
};

export default CloudLayer;
