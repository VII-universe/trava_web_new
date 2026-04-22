import React from 'react';
import { motion, useTransform } from 'framer-motion';
import CloudA from '../assets/cloud_a.png';
import CloudB from '../assets/cloud_b.png';

/**
 * CloudLayer — renders multiple parallax cloud images that part on scroll
 * to reveal the next section, creating a 3-D fly-through-clouds feel.
 *
 * Section boundaries in the 11-section 1760vh app:
 *   0.09  Hero → About
 *   0.18  About → Icefall (Partners)
 *   0.27  Icefall → Expeditions
 *   0.36  Expeditions → Hotel
 *   0.45  Hotel → Pub
 *   0.54  Pub → Eshop
 *   0.63  Eshop → Lectures
 *   0.72  Lectures → Projects
 *   0.81  Projects → Media
 *   0.90  Media → Contact
 */

// Each cloud descriptor:
// src, initialX (% from left), initialY (% from top), w (vw),
// flyX (how far it travels horizontally, + = right, - = left),
// flyY (vertical travel, vh), opacity, scrollIn, scrollOut, zIndex
const CLOUDS = [
    // ─── Transition 0.18: About → Icefall ─────────────────────
    { src: CloudA, ix: -5, iy: 70, w: 75, fx: -55, fy: -10, op: 0.90, sIn: 0.12, sMid: 0.18, sOut: 0.24, z: 50 },
    { src: CloudB, ix: 55, iy: 62, w: 65, fx: 50, fy: -8, op: 0.85, sIn: 0.12, sMid: 0.18, sOut: 0.24, z: 50 },
    { src: CloudA, ix: 20, iy: 80, w: 50, fx: -40, fy: 5, op: 0.60, sIn: 0.14, sMid: 0.19, sOut: 0.25, z: 40 },
    { src: CloudB, ix: 40, iy: 55, w: 45, fx: 45, fy: 8, op: 0.55, sIn: 0.15, sMid: 0.19, sOut: 0.25, z: 40 },
    { src: CloudA, ix: -15, iy: 60, w: 40, fx: -20, fy: -15, op: 0.35, sIn: 0.11, sMid: 0.18, sOut: 0.26, z: 30 },
    { src: CloudB, ix: 70, iy: 75, w: 35, fx: 20, fy: -5, op: 0.30, sIn: 0.13, sMid: 0.18, sOut: 0.26, z: 30 },
    { src: CloudA, ix: 8, iy: 64, w: 42, fx: -28, fy: -6, op: 0.42, sIn: 0.13, sMid: 0.18, sOut: 0.26, z: 35 },
    { src: CloudB, ix: 62, iy: 66, w: 40, fx: 26, fy: -4, op: 0.40, sIn: 0.13, sMid: 0.18, sOut: 0.26, z: 35 },

    // ─── Transition 0.27: Icefall → Expeditions ───────────────
    { src: CloudB, ix: -8, iy: 65, w: 80, fx: -60, fy: -12, op: 0.92, sIn: 0.21, sMid: 0.27, sOut: 0.33, z: 50 },
    { src: CloudA, ix: 50, iy: 58, w: 72, fx: 58, fy: -10, op: 0.88, sIn: 0.21, sMid: 0.27, sOut: 0.33, z: 50 },
    { src: CloudA, ix: 15, iy: 78, w: 55, fx: -42, fy: 6, op: 0.65, sIn: 0.22, sMid: 0.28, sOut: 0.34, z: 40 },
    { src: CloudB, ix: 55, iy: 50, w: 48, fx: 44, fy: 10, op: 0.58, sIn: 0.23, sMid: 0.28, sOut: 0.34, z: 40 },
    { src: CloudB, ix: -20, iy: 55, w: 38, fx: -18, fy: -18, op: 0.32, sIn: 0.20, sMid: 0.27, sOut: 0.35, z: 30 },
    { src: CloudA, ix: 75, iy: 70, w: 42, fx: 22, fy: -8, op: 0.28, sIn: 0.22, sMid: 0.27, sOut: 0.35, z: 30 },
    { src: CloudB, ix: 6, iy: 63, w: 44, fx: -30, fy: -5, op: 0.44, sIn: 0.22, sMid: 0.27, sOut: 0.35, z: 35 },
    { src: CloudA, ix: 66, iy: 64, w: 42, fx: 28, fy: -3, op: 0.41, sIn: 0.22, sMid: 0.27, sOut: 0.35, z: 35 },

    // ─── Transition 0.45: Hotel → Pub ─────────────────────────
    { src: CloudA, ix: -8, iy: 66, w: 82, fx: -62, fy: -13, op: 0.91, sIn: 0.39, sMid: 0.45, sOut: 0.51, z: 50 },
    { src: CloudB, ix: 50, iy: 58, w: 75, fx: 60, fy: -11, op: 0.88, sIn: 0.39, sMid: 0.45, sOut: 0.51, z: 50 },
    { src: CloudB, ix: 12, iy: 80, w: 56, fx: -44, fy: 7, op: 0.66, sIn: 0.40, sMid: 0.46, sOut: 0.52, z: 40 },
    { src: CloudA, ix: 56, iy: 52, w: 50, fx: 46, fy: 11, op: 0.58, sIn: 0.41, sMid: 0.46, sOut: 0.52, z: 40 },
    { src: CloudA, ix: -16, iy: 52, w: 42, fx: -20, fy: -19, op: 0.37, sIn: 0.38, sMid: 0.45, sOut: 0.53, z: 30 },
    { src: CloudB, ix: 76, iy: 70, w: 38, fx: 22, fy: -9, op: 0.32, sIn: 0.40, sMid: 0.45, sOut: 0.53, z: 30 },
    { src: CloudA, ix: 9, iy: 63, w: 44, fx: -30, fy: -5, op: 0.44, sIn: 0.40, sMid: 0.45, sOut: 0.53, z: 35 },
    { src: CloudB, ix: 65, iy: 64, w: 42, fx: 28, fy: -4, op: 0.41, sIn: 0.40, sMid: 0.45, sOut: 0.53, z: 35 },

    // ─── Transition 0.54: Pub → Eshop ─────────────────────────
    { src: CloudB, ix: -10, iy: 64, w: 86, fx: -66, fy: -13, op: 0.92, sIn: 0.48, sMid: 0.54, sOut: 0.60, z: 50 },
    { src: CloudA, ix: 46, iy: 58, w: 79, fx: 63, fy: -11, op: 0.89, sIn: 0.48, sMid: 0.54, sOut: 0.60, z: 50 },
    { src: CloudB, ix: 11, iy: 80, w: 58, fx: -45, fy: 8, op: 0.67, sIn: 0.49, sMid: 0.55, sOut: 0.61, z: 40 },
    { src: CloudA, ix: 57, iy: 52, w: 52, fx: 47, fy: 12, op: 0.60, sIn: 0.50, sMid: 0.55, sOut: 0.61, z: 40 },
    { src: CloudA, ix: -17, iy: 50, w: 43, fx: -21, fy: -20, op: 0.37, sIn: 0.47, sMid: 0.54, sOut: 0.62, z: 30 },
    { src: CloudB, ix: 77, iy: 71, w: 39, fx: 23, fy: -10, op: 0.32, sIn: 0.49, sMid: 0.54, sOut: 0.62, z: 30 },
    { src: CloudA, ix: 8, iy: 63, w: 45, fx: -31, fy: -5, op: 0.44, sIn: 0.49, sMid: 0.54, sOut: 0.62, z: 35 },
    { src: CloudB, ix: 63, iy: 65, w: 43, fx: 29, fy: -4, op: 0.41, sIn: 0.49, sMid: 0.54, sOut: 0.62, z: 35 },

    // ─── Transition 0.63: Eshop → Lectures ────────────────────
    { src: CloudA, ix: -10, iy: 68, w: 85, fx: -65, fy: -14, op: 0.93, sIn: 0.57, sMid: 0.63, sOut: 0.69, z: 50 },
    { src: CloudB, ix: 48, iy: 60, w: 78, fx: 62, fy: -12, op: 0.90, sIn: 0.57, sMid: 0.63, sOut: 0.69, z: 50 },
    { src: CloudB, ix: 10, iy: 82, w: 58, fx: -45, fy: 8, op: 0.68, sIn: 0.58, sMid: 0.64, sOut: 0.70, z: 40 },
    { src: CloudA, ix: 58, iy: 52, w: 52, fx: 48, fy: 12, op: 0.60, sIn: 0.59, sMid: 0.64, sOut: 0.70, z: 40 },
    { src: CloudA, ix: -18, iy: 50, w: 44, fx: -22, fy: -20, op: 0.38, sIn: 0.56, sMid: 0.63, sOut: 0.71, z: 30 },
    { src: CloudB, ix: 78, iy: 72, w: 40, fx: 24, fy: -10, op: 0.33, sIn: 0.58, sMid: 0.63, sOut: 0.71, z: 30 },
    { src: CloudA, ix: 7, iy: 64, w: 46, fx: -32, fy: -5, op: 0.45, sIn: 0.58, sMid: 0.63, sOut: 0.71, z: 35 },
    { src: CloudB, ix: 64, iy: 65, w: 44, fx: 30, fy: -4, op: 0.42, sIn: 0.58, sMid: 0.63, sOut: 0.71, z: 35 },

    // ─── Transition 0.81: Projects → Media ────────────────────
    { src: CloudB, ix: -6, iy: 62, w: 90, fx: -70, fy: -16, op: 0.95, sIn: 0.75, sMid: 0.81, sOut: 0.87, z: 50 },
    { src: CloudA, ix: 45, iy: 55, w: 82, fx: 65, fy: -14, op: 0.92, sIn: 0.75, sMid: 0.81, sOut: 0.87, z: 50 },
    { src: CloudA, ix: 12, iy: 76, w: 60, fx: -48, fy: 10, op: 0.70, sIn: 0.76, sMid: 0.82, sOut: 0.88, z: 40 },
    { src: CloudB, ix: 60, iy: 48, w: 55, fx: 50, fy: 14, op: 0.62, sIn: 0.77, sMid: 0.82, sOut: 0.88, z: 40 },
    { src: CloudB, ix: -22, iy: 48, w: 46, fx: -25, fy: -22, op: 0.40, sIn: 0.74, sMid: 0.81, sOut: 0.89, z: 30 },
    { src: CloudA, ix: 80, iy: 68, w: 42, fx: 26, fy: -12, op: 0.35, sIn: 0.76, sMid: 0.81, sOut: 0.89, z: 30 },
    { src: CloudB, ix: 8, iy: 61, w: 48, fx: -34, fy: -6, op: 0.46, sIn: 0.76, sMid: 0.81, sOut: 0.89, z: 35 },
    { src: CloudA, ix: 62, iy: 63, w: 45, fx: 32, fy: -4, op: 0.43, sIn: 0.76, sMid: 0.81, sOut: 0.89, z: 35 },

    // ═══════════════════════════════════════════════════════════
    // EDGE CLOUDS — mask sharp photo borders during each section
    // ═══════════════════════════════════════════════════════════

    // ─── About (0.08 – 0.18): BOTTOM + TOP edge masks ─────────
    { src: CloudA, ix: -10, iy: 84, w: 75, fx: 0, fy: 0, op: 0.80, sIn: 0.08, sMid: 0.11, sOut: 0.17, z: 55 },
    { src: CloudB, ix: 30, iy: 88, w: 65, fx: 0, fy: 0, op: 0.72, sIn: 0.08, sMid: 0.11, sOut: 0.17, z: 55 },
    { src: CloudA, ix: 60, iy: 82, w: 55, fx: 0, fy: 0, op: 0.60, sIn: 0.09, sMid: 0.12, sOut: 0.17, z: 45 },
    { src: CloudB, ix: -8, iy: -8, w: 70, fx: 0, fy: 0, op: 0.65, sIn: 0.08, sMid: 0.11, sOut: 0.17, z: 45 },
    { src: CloudA, ix: 40, iy: -5, w: 60, fx: 0, fy: 0, op: 0.55, sIn: 0.09, sMid: 0.12, sOut: 0.17, z: 45 },
    { src: CloudB, ix: 68, iy: -8, w: 46, fx: 0, fy: 0, op: 0.48, sIn: 0.09, sMid: 0.12, sOut: 0.17, z: 45 },

    // ─── Icefall (0.18 – 0.27): BOTTOM + TOP edge masks ───────
    { src: CloudB, ix: -12, iy: 82, w: 80, fx: 0, fy: 0, op: 0.82, sIn: 0.18, sMid: 0.21, sOut: 0.26, z: 55 },
    { src: CloudA, ix: 25, iy: 86, w: 70, fx: 0, fy: 0, op: 0.75, sIn: 0.18, sMid: 0.21, sOut: 0.26, z: 55 },
    { src: CloudB, ix: 62, iy: 80, w: 58, fx: 0, fy: 0, op: 0.62, sIn: 0.19, sMid: 0.22, sOut: 0.26, z: 45 },
    { src: CloudA, ix: -5, iy: -10, w: 72, fx: 0, fy: 0, op: 0.60, sIn: 0.18, sMid: 0.21, sOut: 0.26, z: 45 },
    { src: CloudB, ix: 45, iy: -6, w: 62, fx: 0, fy: 0, op: 0.52, sIn: 0.19, sMid: 0.22, sOut: 0.26, z: 45 },
    { src: CloudA, ix: 72, iy: -8, w: 48, fx: 0, fy: 0, op: 0.46, sIn: 0.19, sMid: 0.22, sOut: 0.26, z: 45 },

    // ─── Eshop (0.54 – 0.63): BOTTOM + TOP edge masks ─────────
    { src: CloudA, ix: -8, iy: 82, w: 82, fx: 0, fy: 0, op: 0.80, sIn: 0.54, sMid: 0.57, sOut: 0.62, z: 55 },
    { src: CloudB, ix: 28, iy: 88, w: 72, fx: 0, fy: 0, op: 0.73, sIn: 0.54, sMid: 0.57, sOut: 0.62, z: 55 },
    { src: CloudA, ix: 65, iy: 85, w: 56, fx: 0, fy: 0, op: 0.60, sIn: 0.55, sMid: 0.58, sOut: 0.62, z: 45 },
    { src: CloudB, ix: -6, iy: -8, w: 74, fx: 0, fy: 0, op: 0.62, sIn: 0.54, sMid: 0.57, sOut: 0.62, z: 45 },
    { src: CloudA, ix: 42, iy: -5, w: 65, fx: 0, fy: 0, op: 0.50, sIn: 0.55, sMid: 0.58, sOut: 0.62, z: 45 },
    { src: CloudB, ix: 70, iy: -7, w: 50, fx: 0, fy: 0, op: 0.44, sIn: 0.55, sMid: 0.58, sOut: 0.62, z: 45 },

    // ─── Media (0.81 – 0.90): BOTTOM + TOP edge masks ─────────
    { src: CloudB, ix: -10, iy: 85, w: 85, fx: 0, fy: 0, op: 0.78, sIn: 0.81, sMid: 0.84, sOut: 0.89, z: 55 },
    { src: CloudA, ix: 30, iy: 88, w: 75, fx: 0, fy: 0, op: 0.70, sIn: 0.81, sMid: 0.84, sOut: 0.89, z: 55 },
    { src: CloudB, ix: 65, iy: 80, w: 60, fx: 0, fy: 0, op: 0.58, sIn: 0.82, sMid: 0.85, sOut: 0.89, z: 45 },
    { src: CloudA, ix: -4, iy: -10, w: 76, fx: 0, fy: 0, op: 0.65, sIn: 0.81, sMid: 0.84, sOut: 0.89, z: 45 },
    { src: CloudB, ix: 38, iy: -6, w: 66, fx: 0, fy: 0, op: 0.55, sIn: 0.82, sMid: 0.85, sOut: 0.89, z: 45 },
    { src: CloudA, ix: 68, iy: -8, w: 52, fx: 0, fy: 0, op: 0.47, sIn: 0.82, sMid: 0.85, sOut: 0.89, z: 45 },
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
