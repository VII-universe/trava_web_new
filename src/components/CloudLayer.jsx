import { motion, useTransform } from 'framer-motion';
import CloudA from '../assets/cloud_a.png';
import CloudB from '../assets/cloud_b.png';
import Cloud3 from '../assets/cloud3.png';

const SRC = { ca: CloudA, cb: CloudB, c3: Cloud3 };

/**
 * CloudLayer — timing designed so every section has a cloud-free stable zone.
 *
 * Nav/Altimeter targets (cloud-free):
 *   About       0.13   Icefall  0.23   Expeditions 0.33
 *   Hotel       0.41   Pub      0.50   Eshop        0.59
 *   Lectures    0.68   Projects 0.77   Media        0.87   Contact 0.94
 *
 * Each band sOut < next target, each sIn > prev target:
 *   Band 1  sOut 0.115  Band 2  sIn 0.155 → gap 0.040  (About target: 0.13)
 *   Band 2  sOut 0.210  Band 3  sIn 0.255 → gap 0.045  (Icefall target: 0.23)
 *   Band 3  sOut 0.308  Band 4  sIn 0.345 → gap 0.037  (Expeditions target: 0.33)
 *   Band 4  sOut 0.398  Band 5  sIn 0.415 → gap 0.017  (Hotel target: 0.41)
 *   Band 5  sOut 0.468  Band 6  sIn 0.515 → gap 0.047  (Pub target: 0.50)
 *   Band 6  sOut 0.572  Band 7  sIn 0.605 → gap 0.033  (Eshop target: 0.59)
 *   Band 7  sOut 0.660  Band 8  sIn 0.695 → gap 0.035  (Lectures target: 0.68)
 *   Band 8  sOut 0.752  Band 9  sIn 0.785 → gap 0.033  (Projects target: 0.77)
 *   Band 9  sOut 0.848  Band 10 sIn 0.875 → gap 0.027  (Media target: 0.87)
 *   Band 10 sOut 0.932                                  (Contact target: 0.94)
 */

const BANDS = [
    // ── Hero → About ──────────────────────────────────────────────────────
    { sIn: 0.065, sFull: 0.082, sHold: 0.095, sOut: 0.115, cls: [
        { s: 'ca', l: -30, t: 28, w: 125, fx: -105, fy: -6,  op: 1.0  },
        { s: 'cb', l: 44,  t: 36, w: 120, fx:  108, fy: -8,  op: 1.0  },
        { s: 'cb', l:  5,  t: 48, w: 108, fx:  -88, fy:  5,  op: 1.0  },
        { s: 'ca', l: 58,  t: 44, w: 96,  fx:   90, fy:  4,  op: 0.98 },
        { s: 'ca', l: -15, t: 60, w: 90,  fx:  -70, fy:  8,  op: 0.95 },
        { s: 'cb', l: 50,  t: 56, w: 84,  fx:   78, fy:  6,  op: 0.92 },
        { s: 'cb', l: -10, t: 18, w: 78,  fx:  -58, fy: -14, op: 0.88 },
        { s: 'ca', l: 48,  t: 16, w: 72,  fx:   64, fy: -12, op: 0.84 },
    ]},

    // ── About → Icefall ───────────────────────────────────────────────────
    { sIn: 0.155, sFull: 0.172, sHold: 0.185, sOut: 0.210, cls: [
        { s: 'cb', l: -32, t: 30, w: 128, fx: -108, fy: -7,  op: 1.0  },
        { s: 'ca', l: 42,  t: 38, w: 122, fx:  110, fy: -9,  op: 1.0  },
        { s: 'ca', l:  6,  t: 50, w: 110, fx:  -90, fy:  6,  op: 1.0  },
        { s: 'cb', l: 60,  t: 46, w: 98,  fx:   92, fy:  4,  op: 0.98 },
        { s: 'cb', l: -18, t: 62, w: 92,  fx:  -72, fy:  9,  op: 0.96 },
        { s: 'ca', l: 52,  t: 58, w: 86,  fx:   80, fy:  7,  op: 0.93 },
        { s: 'ca', l: -12, t: 16, w: 80,  fx:  -60, fy: -16, op: 0.90 },
        { s: 'cb', l: 46,  t: 14, w: 74,  fx:   66, fy: -14, op: 0.86 },
    ]},

    // ── Icefall → Expeditions ─────────────────────────────────────────────
    { sIn: 0.255, sFull: 0.270, sHold: 0.283, sOut: 0.308, cls: [
        { s: 'ca', l: -28, t: 34, w: 126, fx: -106, fy: -6,  op: 1.0  },
        { s: 'cb', l: 44,  t: 40, w: 120, fx:  108, fy: -8,  op: 1.0  },
        { s: 'cb', l:  4,  t: 52, w: 108, fx:  -88, fy:  7,  op: 1.0  },
        { s: 'ca', l: 60,  t: 48, w: 96,  fx:   90, fy:  5,  op: 0.98 },
        { s: 'ca', l: -16, t: 64, w: 90,  fx:  -70, fy:  9,  op: 0.95 },
        { s: 'cb', l: 52,  t: 60, w: 84,  fx:   78, fy:  6,  op: 0.92 },
        { s: 'cb', l: -10, t: 18, w: 78,  fx:  -58, fy: -14, op: 0.88 },
        { s: 'ca', l: 48,  t: 16, w: 72,  fx:   64, fy: -12, op: 0.84 },
    ]},

    // ── Expeditions → Hotel — arrive WITH Hotel ────────────────────────────
    { sIn: 0.345, sFull: 0.360, sHold: 0.375, sOut: 0.398, cls: [
        { s: 'cb', l: -30, t: 32, w: 128, fx: -108, fy: -7,  op: 1.0  },
        { s: 'ca', l: 42,  t: 40, w: 122, fx:  110, fy: -9,  op: 1.0  },
        { s: 'ca', l:  5,  t: 52, w: 110, fx:  -90, fy:  6,  op: 1.0  },
        { s: 'cb', l: 60,  t: 46, w: 98,  fx:   92, fy:  4,  op: 0.98 },
        { s: 'cb', l: -18, t: 64, w: 92,  fx:  -72, fy:  9,  op: 0.96 },
        { s: 'ca', l: 52,  t: 58, w: 86,  fx:   80, fy:  7,  op: 0.93 },
        { s: 'ca', l: -12, t: 16, w: 80,  fx:  -60, fy: -16, op: 0.90 },
        { s: 'cb', l: 46,  t: 14, w: 74,  fx:   66, fy: -13, op: 0.86 },
    ]},

    // ── Hotel → Pub ───────────────────────────────────────────────────────
    { sIn: 0.415, sFull: 0.430, sHold: 0.444, sOut: 0.468, cls: [
        { s: 'ca', l: -30, t: 30, w: 126, fx: -106, fy: -6,  op: 1.0  },
        { s: 'cb', l: 44,  t: 38, w: 120, fx:  108, fy: -8,  op: 1.0  },
        { s: 'cb', l:  5,  t: 50, w: 108, fx:  -88, fy:  6,  op: 1.0  },
        { s: 'ca', l: 60,  t: 44, w: 96,  fx:   90, fy:  4,  op: 0.98 },
        { s: 'ca', l: -16, t: 62, w: 90,  fx:  -70, fy:  8,  op: 0.96 },
        { s: 'cb', l: 52,  t: 58, w: 84,  fx:   78, fy:  6,  op: 0.93 },
        { s: 'cb', l: -10, t: 16, w: 78,  fx:  -58, fy: -14, op: 0.90 },
        { s: 'ca', l: 48,  t: 14, w: 72,  fx:   64, fy: -12, op: 0.86 },
    ]},

    // ── Pub → Eshop — arrive WITH Eshop ───────────────────────────────────
    { sIn: 0.515, sFull: 0.530, sHold: 0.547, sOut: 0.572, cls: [
        { s: 'cb', l: -32, t: 32, w: 128, fx: -108, fy: -7,  op: 1.0  },
        { s: 'ca', l: 42,  t: 40, w: 122, fx:  110, fy: -9,  op: 1.0  },
        { s: 'ca', l:  4,  t: 52, w: 110, fx:  -90, fy:  7,  op: 1.0  },
        { s: 'cb', l: 60,  t: 46, w: 98,  fx:   92, fy:  5,  op: 0.98 },
        { s: 'cb', l: -18, t: 64, w: 92,  fx:  -72, fy:  9,  op: 0.96 },
        { s: 'ca', l: 52,  t: 58, w: 86,  fx:   80, fy:  7,  op: 0.93 },
        { s: 'ca', l: -12, t: 16, w: 80,  fx:  -62, fy: -16, op: 0.90 },
        { s: 'cb', l: 46,  t: 14, w: 74,  fx:   68, fy: -14, op: 0.86 },
    ]},

    // ── Eshop → Lectures ──────────────────────────────────────────────────
    { sIn: 0.605, sFull: 0.620, sHold: 0.634, sOut: 0.660, cls: [
        { s: 'ca', l: -30, t: 34, w: 126, fx: -106, fy: -6,  op: 1.0  },
        { s: 'cb', l: 44,  t: 42, w: 120, fx:  108, fy: -8,  op: 1.0  },
        { s: 'cb', l:  5,  t: 54, w: 108, fx:  -88, fy:  7,  op: 1.0  },
        { s: 'ca', l: 60,  t: 48, w: 96,  fx:   90, fy:  5,  op: 0.98 },
        { s: 'ca', l: -16, t: 66, w: 90,  fx:  -70, fy:  9,  op: 0.96 },
        { s: 'cb', l: 52,  t: 60, w: 84,  fx:   78, fy:  7,  op: 0.93 },
        { s: 'cb', l: -10, t: 18, w: 78,  fx:  -58, fy: -14, op: 0.90 },
        { s: 'ca', l: 48,  t: 16, w: 72,  fx:   64, fy: -12, op: 0.86 },
    ]},

    // ── Lectures → Projects — arrive WITH Projects ─────────────────────────
    { sIn: 0.695, sFull: 0.710, sHold: 0.727, sOut: 0.752, cls: [
        { s: 'cb', l: -30, t: 36, w: 128, fx: -108, fy: -7,  op: 1.0  },
        { s: 'ca', l: 42,  t: 42, w: 122, fx:  110, fy: -9,  op: 1.0  },
        { s: 'ca', l:  4,  t: 54, w: 110, fx:  -90, fy:  7,  op: 1.0  },
        { s: 'cb', l: 60,  t: 50, w: 98,  fx:   92, fy:  5,  op: 0.98 },
        { s: 'cb', l: -18, t: 66, w: 92,  fx:  -72, fy:  9,  op: 0.96 },
        { s: 'ca', l: 52,  t: 60, w: 86,  fx:   80, fy:  7,  op: 0.93 },
        { s: 'ca', l: -12, t: 18, w: 80,  fx:  -60, fy: -16, op: 0.90 },
        { s: 'cb', l: 46,  t: 16, w: 74,  fx:   66, fy: -14, op: 0.86 },
    ]},

    // ── Projects → Media ──────────────────────────────────────────────────
    { sIn: 0.785, sFull: 0.800, sHold: 0.818, sOut: 0.848, cls: [
        { s: 'ca', l: -32, t: 32, w: 130, fx: -110, fy: -8,  op: 1.0  },
        { s: 'cb', l: 40,  t: 40, w: 124, fx:  112, fy: -10, op: 1.0  },
        { s: 'cb', l:  4,  t: 52, w: 112, fx:  -92, fy:  7,  op: 1.0  },
        { s: 'ca', l: 62,  t: 46, w: 100, fx:   94, fy:  5,  op: 0.98 },
        { s: 'ca', l: -18, t: 64, w: 94,  fx:  -74, fy:  9,  op: 0.96 },
        { s: 'cb', l: 52,  t: 60, w: 88,  fx:   82, fy:  7,  op: 0.93 },
        { s: 'cb', l: -12, t: 16, w: 82,  fx:  -62, fy: -16, op: 0.90 },
        { s: 'ca', l: 46,  t: 14, w: 76,  fx:   68, fy: -14, op: 0.86 },
    ]},

    // ── Media → Contact — arrive WITH Contact ──────────────────────────────
    { sIn: 0.875, sFull: 0.890, sHold: 0.908, sOut: 0.932, cls: [
        { s: 'cb', l: -30, t: 34, w: 128, fx: -108, fy: -7,  op: 1.0  },
        { s: 'ca', l: 42,  t: 42, w: 122, fx:  110, fy: -9,  op: 1.0  },
        { s: 'ca', l:  5,  t: 54, w: 110, fx:  -90, fy:  6,  op: 1.0  },
        { s: 'cb', l: 60,  t: 48, w: 98,  fx:   92, fy:  4,  op: 0.98 },
        { s: 'cb', l: -16, t: 66, w: 92,  fx:  -72, fy:  8,  op: 0.96 },
        { s: 'ca', l: 52,  t: 60, w: 86,  fx:   80, fy:  6,  op: 0.93 },
        { s: 'ca', l: -10, t: 18, w: 80,  fx:  -60, fy: -14, op: 0.90 },
        { s: 'cb', l: 46,  t: 16, w: 74,  fx:   66, fy: -12, op: 0.86 },
    ]},
];

const CloudImg = ({ band, cl, scrollProgress }) => {
    const opacity = useTransform(
        scrollProgress,
        [band.sIn, band.sFull, band.sHold, band.sOut],
        [0,        cl.op,      cl.op,       0         ]
    );

    const x = useTransform(
        scrollProgress,
        [band.sIn, band.sHold, band.sOut],
        ['0vw',    '0vw',      `${cl.fx}vw`]
    );

    const y = useTransform(
        scrollProgress,
        [band.sIn, band.sHold, band.sOut],
        ['0vh',    '0vh',      `${cl.fy}vh`]
    );

    const scale = useTransform(
        scrollProgress,
        [band.sIn, band.sHold, band.sOut],
        [0.93,     1.0,        1.05       ]
    );

    return (
        <motion.img
            src={SRC[cl.s]}
            style={{
                opacity, x, y, scale,
                position: 'absolute',
                left:  `${cl.l}%`,
                top:   `${cl.t}%`,
                width: `${cl.w}vw`,
                pointerEvents: 'none',
                userSelect:    'none',
                willChange:    'transform, opacity',
            }}
            alt=""
            draggable={false}
        />
    );
};

const CloudLayer = ({ scrollProgress }) => (
    <div style={{ position: 'fixed', inset: 0, zIndex: 75, pointerEvents: 'none', overflow: 'hidden' }}>
        {BANDS.map((band) =>
            band.cls.map((cl, i) => (
                <CloudImg key={`${band.sIn}-${i}`} band={band} cl={cl} scrollProgress={scrollProgress} />
            ))
        )}
    </div>
);

export default CloudLayer;
