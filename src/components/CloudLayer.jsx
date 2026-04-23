import { useState, useEffect } from 'react';
import { motion, useTransform } from 'framer-motion';
import CloudA from '../assets/cloud_a.png';
import CloudB from '../assets/cloud_b.png';
import Cloud3 from '../assets/cloud3.png';
import LogoMain  from '../assets/svg/honza_trava_logo_V1.svg';
import Logo14    from '../assets/svg/honza_trava_logo_14_V1.svg';
import LogoHotel from '../assets/svg/honza_trava_logo_hotel_V1.svg';
import LogoPub   from '../assets/svg/honza_trava_logo_pub_V1.svg';

const SRC = { ca: CloudA, cb: CloudB, c3: Cloud3 };

/**
 * CloudLayer — timing designed so every section has a cloud-free stable zone.
 *
 * Nav/Altimeter targets (cloud-free):
 *   About       0.13   Icefall  0.23   Expeditions 0.33
 *   Hotel       0.41   Pub      0.50   Eshop        0.59
 *   Lectures    0.67   Projects 0.752  Media        0.87   Contact 0.94
 *
 * Each band sOut < next target, each sIn > prev target:
 *   Band 1  sOut 0.115  Band 2  sIn 0.155 → gap 0.040  (About target: 0.13)
 *   Band 2  sOut 0.210  Band 3  sIn 0.255 → gap 0.045  (Icefall target: 0.23)
 *   Band 3  sOut 0.308  Band 4  sIn 0.345 → gap 0.037  (Expeditions target: 0.33)
 *   Band 4  sOut 0.398  Band 5  sIn 0.415 → gap 0.017  (Hotel target: 0.41)
 *   Band 5  sOut 0.468  Band 6  sIn 0.515 → gap 0.047  (Pub target: 0.50)
 *   Band 6  sOut 0.572  Band 7  sIn 0.605 → gap 0.033  (Eshop target: 0.59)
 *   Band 7  sOut 0.660  Band 8  sIn 0.680 → gap 0.020  (Lectures target: 0.67)
 *   Band 8  sOut 0.748  Band 9  sIn 0.755 → gap 0.007  (Projects target: 0.752)
 *   Band 9  sOut 0.812  Band 10 sIn 0.875 → gap 0.063  (Media target: 0.87)
 *   Band 10 sOut 0.932                                  (Contact target: 0.94)
 */

// wm=mobile width(vw), om=mobile opacity, tm=mobile top(%)
// mh/mx: smaller spread = more simultaneous movement with parallax depth
// One giant cloud per band (right-side, marked **GIANT**) at ~2× wm
const BANDS = [
    // ── Hero → About ──────────────────────────────────────────────────────
    { sIn: 0.065, sFull: 0.082, sHold: 0.092, sOut: 0.128, cls: [
        { s: 'ca', l: -38, t:  4, tm:  2, w: 220, wm: 220, fx: -188, fy: -5, op: 1.0,  om: 1.0,  mh: -0.006, mx: -0.009 },
        { s: 'cb', l:  30, t:  7, tm:  5, w: 215, wm: 380, fx:  185, fy: -7, op: 1.0,  om: 1.0,  mh: -0.004, mx: -0.006 }, // GIANT
        { s: 'cb', l: -32, t: 30, tm: 26, w: 195, wm: 145, fx: -165, fy:  4, op: 1.0,  om: 0.72, mh:  0,      mx:  0      },
        { s: 'ca', l:  34, t: 33, tm: 30, w: 190, wm: 122, fx:  162, fy:  3, op: 1.0,  om: 0.65, mh: +0.003, mx: +0.005 },
        { s: 'ca', l: -28, t: 55, tm: 52, w: 175, wm: 185, fx: -148, fy:  6, op: 0.97, om: 0.88, mh: -0.003, mx: -0.005 },
        { s: 'cb', l:  32, t: 58, tm: 56, w: 170, wm: 108, fx:  144, fy:  5, op: 0.97, om: 0.55, mh: +0.004, mx: +0.008 },
        { s: 'cb', l: -34, t: 78, tm: 74, w: 155, wm: 150, fx: -128, fy:  8, op: 0.93, om: 0.70, mh: +0.001, mx: +0.003 },
        { s: 'ca', l:  30, t: 80, tm: 78, w: 150, wm: 100, fx:  124, fy:  7, op: 0.93, om: 0.52, mh: +0.006, mx: +0.012 },
    ]},

    // ── About → Icefall ───────────────────────────────────────────────────
    { sIn: 0.178, sFull: 0.191, sHold: 0.215, sOut: 0.238, cls: [
        { s: 'cb', l: -36, t:  6, tm:  0, w: 218, wm: 225, fx: -186, fy: -6, op: 1.0,  om: 1.0,  mh: -0.005, mx: -0.008 },
        { s: 'ca', l:  32, t:  9, tm:  4, w: 212, wm: 400, fx:  182, fy: -8, op: 1.0,  om: 1.0,  mh: -0.004, mx: -0.005 }, // GIANT
        { s: 'ca', l: -30, t: 32, tm: 18, w: 200, wm: 195, fx: -170, fy:  3, op: 1.0,  om: 0.90, mh: -0.002, mx: -0.003 },
        { s: 'cb', l:  36, t: 35, tm: 22, w: 194, wm: 178, fx:  165, fy:  4, op: 1.0,  om: 0.82, mh: -0.001, mx: -0.002 },
        { s: 'cb', l: -26, t: 57, tm: 55, w: 178, wm: 120, fx: -150, fy:  5, op: 0.97, om: 0.60, mh: +0.002, mx: +0.004 },
        { s: 'ca', l:  33, t: 60, tm: 60, w: 172, wm: 105, fx:  146, fy:  6, op: 0.97, om: 0.55, mh: +0.003, mx: +0.005 },
        { s: 'ca', l: -32, t: 80, tm: 78, w: 158, wm: 138, fx: -132, fy:  7, op: 0.93, om: 0.65, mh: +0.002, mx: +0.004 },
        { s: 'cb', l:  31, t: 82, tm: 82, w: 152, wm:  95, fx:  126, fy:  8, op: 0.93, om: 0.48, mh: +0.004, mx: +0.006 },
    ]},

    // ── Icefall → Expeditions ─────────────────────────────────────────────
    { sIn: 0.255, sFull: 0.270, sHold: 0.276, sOut: 0.293, cls: [
        { s: 'ca', l: -40, t:  5, tm:  0, w: 222, wm: 250, fx: -190, fy: -5, op: 1.0,  om: 1.0,  mh: -0.007, mx: -0.010 },
        { s: 'cb', l:  31, t:  8, tm:  8, w: 216, wm: 420, fx:  184, fy: -7, op: 1.0,  om: 1.0,  mh: -0.004, mx: -0.006 }, // GIANT
        { s: 'cb', l: -33, t: 48, tm: 42, w: 198, wm: 215, fx: -168, fy:  4, op: 0.95, om: 0.88, mh: +0.003, mx: +0.007 },
        { s: 'ca', l:  35, t: 51, tm: 50, w: 192, wm: 195, fx:  163, fy:  3, op: 0.95, om: 0.80, mh: +0.006, mx: +0.013 },
    ]},

    // ── Expeditions → Hotel ────────────────────────────────────────────────
    { sIn: 0.345, sFull: 0.360, sHold: 0.375, sOut: 0.398, cls: [
        { s: 'cb', l: -37, t:  5, tm:  3, w: 220, wm: 175, fx: -188, fy: -6, op: 1.0,  om: 0.80, mh: -0.004, mx: -0.006 },
        { s: 'ca', l:  31, t:  8, tm:  8, w: 214, wm: 155, fx:  183, fy: -8, op: 1.0,  om: 0.75, mh: -0.003, mx: -0.004 },
        { s: 'ca', l: -31, t: 31, tm: 35, w: 196, wm: 210, fx: -166, fy:  4, op: 1.0,  om: 1.0,  mh:  0,      mx:  0      },
        { s: 'cb', l:  36, t: 34, tm: 40, w: 190, wm: 380, fx:  161, fy:  3, op: 1.0,  om: 0.95, mh: +0.001, mx: +0.002 }, // GIANT
        { s: 'cb', l: -27, t: 56, tm: 55, w: 177, wm: 230, fx: -150, fy:  5, op: 0.97, om: 1.0,  mh: +0.002, mx: +0.004 },
        { s: 'ca', l:  33, t: 59, tm: 60, w: 171, wm: 215, fx:  145, fy:  6, op: 0.97, om: 0.95, mh: +0.003, mx: +0.005 },
        { s: 'ca', l: -33, t: 79, tm: 72, w: 157, wm: 200, fx: -130, fy:  7, op: 0.93, om: 0.90, mh: +0.003, mx: +0.005 },
        { s: 'cb', l:  30, t: 81, tm: 78, w: 151, wm: 185, fx:  125, fy:  8, op: 0.93, om: 0.85, mh: +0.004, mx: +0.006 },
    ]},

    // ── Hotel → Pub ───────────────────────────────────────────────────────
    { sIn: 0.415, sFull: 0.430, sHold: 0.444, sOut: 0.468, cls: [
        { s: 'ca', l: -39, t:  6, tm:  2, w: 218, wm: 220, fx: -186, fy: -5, op: 1.0,  om: 1.0,  mh: -0.005, mx: -0.009 },
        { s: 'cb', l:  32, t:  9, tm:  7, w: 213, wm: 205, fx:  182, fy: -7, op: 1.0,  om: 1.0,  mh: -0.003, mx: -0.006 },
        { s: 'cb', l: -30, t: 50, tm: 52, w: 197, wm: 215, fx: -167, fy:  3, op: 0.95, om: 0.92, mh: +0.004, mx: +0.009 },
        { s: 'ca', l:  35, t: 53, tm: 57, w: 191, wm: 380, fx:  162, fy:  4, op: 0.95, om: 0.86, mh: +0.006, mx: +0.013 }, // GIANT
    ]},

    // ── Pub → Eshop ───────────────────────────────────────────────────────
    { sIn: 0.515, sFull: 0.530, sHold: 0.547, sOut: 0.572, cls: [
        { s: 'cb', l: -36, t:  6, tm:  0, w: 220, wm: 245, fx: -188, fy: -6, op: 1.0,  om: 1.0,  mh: -0.006, mx: -0.010 },
        { s: 'ca', l:  30, t:  9, tm:  5, w: 215, wm: 420, fx:  184, fy: -8, op: 1.0,  om: 1.0,  mh: -0.004, mx: -0.007 }, // GIANT
        { s: 'ca', l: -32, t: 31, tm: 17, w: 199, wm: 218, fx: -169, fy:  4, op: 1.0,  om: 0.95, mh: -0.002, mx: -0.004 },
        { s: 'cb', l:  37, t: 34, tm: 22, w: 193, wm: 200, fx:  164, fy:  3, op: 1.0,  om: 0.88, mh:  0,      mx: -0.001 },
        { s: 'cb', l: -28, t: 56, tm: 44, w: 178, wm: 238, fx: -151, fy:  6, op: 0.97, om: 1.0,  mh: +0.002, mx: +0.004 },
        { s: 'ca', l:  34, t: 59, tm: 50, w: 172, wm: 185, fx:  147, fy:  5, op: 0.97, om: 0.82, mh: +0.004, mx: +0.008 },
        { s: 'ca', l: -35, t: 80, tm: 68, w: 158, wm: 210, fx: -131, fy:  7, op: 0.93, om: 0.90, mh: +0.005, mx: +0.009 },
        { s: 'cb', l:  31, t: 82, tm: 74, w: 152, wm: 170, fx:  127, fy:  8, op: 0.93, om: 0.75, mh: +0.007, mx: +0.013 },
    ]},

    // ── Eshop → Lectures ──────────────────────────────────────────────────
    { sIn: 0.625, sFull: 0.637, sHold: 0.648, sOut: 0.665, cls: [
        { s: 'ca', l: -38, t:  4, tm:  0, w: 222, wm: 235, fx: -190, fy: -5, op: 1.0,  om: 1.0,  mh: -0.005, mx: -0.008 },
        { s: 'cb', l:  31, t:  7, tm: 10, w: 216, wm: 320, fx:  185, fy: -7, op: 1.0,  om: 0.70, mh: +0.004, mx: +0.008 }, // GIANT
        { s: 'cb', l: -31, t: 30, tm: 25, w: 200, wm: 225, fx: -170, fy:  3, op: 1.0,  om: 0.95, mh: -0.003, mx: -0.005 },
        { s: 'ca', l:  36, t: 33, tm: 38, w: 194, wm: 135, fx:  165, fy:  4, op: 1.0,  om: 0.65, mh: +0.003, mx: +0.006 },
        { s: 'ca', l: -27, t: 55, tm: 50, w: 177, wm: 215, fx: -150, fy:  5, op: 0.97, om: 0.92, mh: -0.002, mx: -0.003 },
        { s: 'cb', l:  33, t: 58, tm: 60, w: 171, wm: 118, fx:  145, fy:  6, op: 0.97, om: 0.58, mh: +0.002, mx: +0.005 },
        { s: 'cb', l: -33, t: 78, tm: 72, w: 157, wm: 195, fx: -130, fy:  8, op: 0.93, om: 0.80, mh:  0,      mx: -0.002 },
        { s: 'ca', l:  30, t: 80, tm: 80, w: 151, wm: 105, fx:  125, fy:  7, op: 0.93, om: 0.52, mh: +0.003, mx: +0.007 },
    ]},

    // ── Lectures → Projects ───────────────────────────────────────────────
    { sIn: 0.680, sFull: 0.693, sHold: 0.722, sOut: 0.748, cls: [
        { s: 'cb', l: -14, t:  6, tm:  4, w:  72, wm:  80, fx:  -88, fy: -3, op: 0.55, om: 0.50, mh: -0.003, mx: -0.002 }, // tiny/far
        { s: 'ca', l:  26, t:  2, tm:  1, w: 340, wm: 420, fx:  295, fy: -8, op: 1.0,  om: 1.0,  mh: +0.001, mx: +0.002 }, // GIANT foreground
        { s: 'ca', l: -33, t: 34, tm: 27, w: 175, wm: 188, fx: -162, fy:  4, op: 0.95, om: 0.90, mh: -0.002, mx: -0.001 }, // medium
        { s: 'cb', l:  40, t: 26, tm: 20, w:  92, wm:  98, fx:   82, fy:  2, op: 0.65, om: 0.60, mh: +0.001, mx: +0.002 }, // small
        { s: 'cb', l: -28, t: 57, tm: 51, w: 255, wm: 285, fx: -218, fy:  6, op: 1.0,  om: 0.95, mh: -0.001, mx:  0      }, // large
        { s: 'ca', l:  44, t: 14, tm: 11, w:  62, wm:  68, fx:   58, fy: -2, op: 0.50, om: 0.45, mh: +0.001, mx: +0.002 }, // tiny/very far
        { s: 'ca', l: -37, t: 76, tm: 71, w: 142, wm: 152, fx: -128, fy:  7, op: 0.85, om: 0.80, mh:  0,      mx: +0.001 }, // medium-small
        { s: 'cb', l:  24, t: 71, tm: 66, w: 225, wm: 248, fx:  192, fy:  8, op: 0.90, om: 0.85, mh: +0.001, mx: +0.002 }, // large bottom
    ]},

    // ── Projects → Media ──────────────────────────────────────────────────
    { sIn: 0.755, sFull: 0.766, sHold: 0.778, sOut: 0.812, cls: [
        { s: 'ca', l: -40, t: 10, tm:  3, w: 218, wm: 230, fx: -188, fy: -5, op: 1.0,  om: 1.0,  mh: -0.008, mx: -0.011 },
        { s: 'cb', l:  30, t: 13, tm:  9, w: 212, wm: 420, fx:  182, fy: -7, op: 1.0,  om: 0.95, mh: -0.003, mx: -0.005 }, // GIANT
        { s: 'cb', l: -34, t: 52, tm: 55, w: 200, wm: 190, fx: -170, fy:  5, op: 0.95, om: 0.85, mh: +0.008, mx: +0.015 },
    ]},

    // ── Media → Contact ───────────────────────────────────────────────────
    { sIn: 0.875, sFull: 0.890, sHold: 0.908, sOut: 0.932, cls: [
        { s: 'cb', l: -37, t:  8, tm:  5, w: 220, wm: 185, fx: -188, fy: -6, op: 0.90, om: 0.82, mh: -0.005, mx: -0.009 },
        { s: 'ca', l:  31, t: 11, tm: 12, w: 214, wm: 340, fx:  183, fy: -8, op: 0.90, om: 0.75, mh: -0.003, mx: -0.005 }, // GIANT
        { s: 'ca', l: -30, t: 48, tm: 48, w: 198, wm: 215, fx: -168, fy:  4, op: 0.85, om: 0.90, mh: +0.004, mx: +0.010 },
        { s: 'cb', l:  32, t: 80, tm: 68, w: 190, wm: 200, fx:  163, fy:  7, op: 0.85, om: 0.88, mh: +0.007, mx: +0.015 },
    ]},
];

const CloudImg = ({ band, cl, scrollProgress, isMobile }) => {
    const effOp = isMobile && cl.om !== undefined ? cl.om : cl.op;

    // Per-cloud mobile parallax timing — mh shifts when parting starts, mx when it ends
    const mh = isMobile && cl.mh !== undefined ? cl.mh : 0;
    const mx = isMobile && cl.mx !== undefined ? cl.mx : 0;
    const effHold = isMobile ? Math.max(band.sFull + 0.003, band.sHold + mh) : band.sHold;
    const effOut  = isMobile ? Math.max(effHold  + 0.006, band.sOut  + mx) : band.sOut;

    const opacity = useTransform(
        scrollProgress,
        [band.sIn, band.sFull, effHold, effOut],
        [0,        effOp,      effOp,   0      ]
    );

    const effFx = isMobile ? cl.fx * 1.35 : cl.fx;
    const x = useTransform(
        scrollProgress,
        [band.sIn, effHold, effOut],
        ['0vw',    '0vw',   `${effFx}vw`]
    );

    const y = useTransform(
        scrollProgress,
        [band.sIn, effHold, effOut],
        ['0vh',    '0vh',   `${cl.fy}vh`]
    );

    const scale = useTransform(
        scrollProgress,
        [band.sIn, effHold, effOut],
        [0.93,     1.0,     1.05   ]
    );

    return (
        <motion.img
            src={SRC[cl.s]}
            style={{
                opacity, x, y, scale,
                position: 'absolute',
                left:  `${cl.l}%`,
                top:   isMobile && cl.tm !== undefined ? `${cl.tm}%` : `${cl.t}%`,
                width: isMobile && cl.wm !== undefined ? `${cl.wm}vw` : `${cl.w}vmax`,
                pointerEvents: 'none',
                userSelect:    'none',
                willChange:    'transform, opacity',
            }}
            alt=""
            draggable={false}
        />
    );
};

const LOGOS = [
    { src: LogoMain,  label: 'Honza Tráva' },
    { src: Logo14,    label: '14 Summits'  },
    { src: LogoHotel, label: 'Hotel KBC'   },
    { src: LogoPub,   label: 'Czech Pub'   },
];

const LogoShowcase = ({ scrollProgress }) => {
    const opacity = useTransform(scrollProgress, [0.693, 0.700, 0.712, 0.725], [0, 1, 1, 0]);
    return (
        <motion.div
            style={{ opacity, position: 'fixed', inset: 0, zIndex: 80, pointerEvents: 'none' }}
            className="flex items-center justify-center"
        >
            <div className="grid grid-cols-2 gap-5 px-10">
                {LOGOS.map(({ src, label }) => (
                    <div key={label} className="flex flex-col items-center justify-center gap-2 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                        <img src={src} alt={label} className="h-14 w-auto object-contain" draggable={false} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const CloudLayer = ({ scrollProgress }) => {
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 75, pointerEvents: 'none', overflow: 'hidden' }}>
            {BANDS.map((band) =>
                band.cls.map((cl, i) => (
                    <CloudImg key={`${band.sIn}-${i}`} band={band} cl={cl} scrollProgress={scrollProgress} isMobile={isMobile} />
                ))
            )}
            <LogoShowcase scrollProgress={scrollProgress} />
        </div>
    );
};

export default CloudLayer;
