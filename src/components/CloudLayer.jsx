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

// Each band: 4 rows × 2 clouds. Left cloud flies left, right cloud flies right.
// Rows tightly packed vertically to form a solid wall that parts dramatically.
// Row tops: ~5%, ~30%, ~55%, ~78% — close enough to overlap, wide enough to span full height.
const BANDS = [
    // ── Hero → About ──────────────────────────────────────────────────────
    { sIn: 0.065, sFull: 0.082, sHold: 0.092, sOut: 0.128, cls: [
        { s: 'ca', l: -38, t:  4, w: 220, fx: -188, fy: -5, op: 1.0  }, // row1 L — giant
        { s: 'cb', l:  30, t:  7, w: 215, fx:  185, fy: -7, op: 1.0  }, // row1 R — giant
        { s: 'cb', l: -32, t: 30, w: 195, fx: -165, fy:  4, op: 1.0  }, // row2 L
        { s: 'ca', l:  34, t: 33, w: 190, fx:  162, fy:  3, op: 1.0  }, // row2 R
        { s: 'ca', l: -28, t: 55, w: 175, fx: -148, fy:  6, op: 0.97 }, // row3 L
        { s: 'cb', l:  32, t: 58, w: 170, fx:  144, fy:  5, op: 0.97 }, // row3 R
        { s: 'cb', l: -34, t: 78, w: 155, fx: -128, fy:  8, op: 0.93 }, // row4 L
        { s: 'ca', l:  30, t: 80, w: 150, fx:  124, fy:  7, op: 0.93 }, // row4 R
    ]},

    // ── About → Icefall ───────────────────────────────────────────────────
    { sIn: 0.178, sFull: 0.191, sHold: 0.215, sOut: 0.238, cls: [
        { s: 'cb', l: -36, t:  6, w: 218, fx: -186, fy: -6, op: 1.0  },
        { s: 'ca', l:  32, t:  9, w: 212, fx:  182, fy: -8, op: 1.0  },
        { s: 'ca', l: -30, t: 32, w: 200, fx: -170, fy:  3, op: 1.0  },
        { s: 'cb', l:  36, t: 35, w: 194, fx:  165, fy:  4, op: 1.0  },
        { s: 'cb', l: -26, t: 57, w: 178, fx: -150, fy:  5, op: 0.97 },
        { s: 'ca', l:  33, t: 60, w: 172, fx:  146, fy:  6, op: 0.97 },
        { s: 'ca', l: -32, t: 80, w: 158, fx: -132, fy:  7, op: 0.93 },
        { s: 'cb', l:  31, t: 82, w: 152, fx:  126, fy:  8, op: 0.93 },
    ]},

    // ── Icefall → Expeditions ─────────────────────────────────────────────
    { sIn: 0.255, sFull: 0.270, sHold: 0.276, sOut: 0.293, cls: [
        { s: 'ca', l: -40, t:  5, w: 222, fx: -190, fy: -5, op: 1.0  },
        { s: 'cb', l:  31, t:  8, w: 216, fx:  184, fy: -7, op: 1.0  },
        { s: 'cb', l: -33, t: 48, w: 198, fx: -168, fy:  4, op: 0.95 },
        { s: 'ca', l:  35, t: 51, w: 192, fx:  163, fy:  3, op: 0.95 },
    ]},

    // ── Expeditions → Hotel ────────────────────────────────────────────────
    { sIn: 0.345, sFull: 0.360, sHold: 0.375, sOut: 0.398, cls: [
        { s: 'cb', l: -37, t:  5, w: 220, fx: -188, fy: -6, op: 1.0  },
        { s: 'ca', l:  31, t:  8, w: 214, fx:  183, fy: -8, op: 1.0  },
        { s: 'ca', l: -31, t: 31, w: 196, fx: -166, fy:  4, op: 1.0  },
        { s: 'cb', l:  36, t: 34, w: 190, fx:  161, fy:  3, op: 1.0  },
        { s: 'cb', l: -27, t: 56, w: 177, fx: -150, fy:  5, op: 0.97 },
        { s: 'ca', l:  33, t: 59, w: 171, fx:  145, fy:  6, op: 0.97 },
        { s: 'ca', l: -33, t: 79, w: 157, fx: -130, fy:  7, op: 0.93 },
        { s: 'cb', l:  30, t: 81, w: 151, fx:  125, fy:  8, op: 0.93 },
    ]},

    // ── Hotel → Pub ───────────────────────────────────────────────────────
    { sIn: 0.415, sFull: 0.430, sHold: 0.444, sOut: 0.468, cls: [
        { s: 'ca', l: -39, t:  6, w: 218, fx: -186, fy: -5, op: 1.0  },
        { s: 'cb', l:  32, t:  9, w: 213, fx:  182, fy: -7, op: 1.0  },
        { s: 'cb', l: -30, t: 50, w: 197, fx: -167, fy:  3, op: 0.95 },
        { s: 'ca', l:  35, t: 53, w: 191, fx:  162, fy:  4, op: 0.95 },
    ]},

    // ── Pub → Eshop ───────────────────────────────────────────────────────
    { sIn: 0.515, sFull: 0.530, sHold: 0.547, sOut: 0.572, cls: [
        { s: 'cb', l: -36, t:  6, w: 220, fx: -188, fy: -6, op: 1.0  },
        { s: 'ca', l:  30, t:  9, w: 215, fx:  184, fy: -8, op: 1.0  },
        { s: 'ca', l: -32, t: 31, w: 199, fx: -169, fy:  4, op: 1.0  },
        { s: 'cb', l:  37, t: 34, w: 193, fx:  164, fy:  3, op: 1.0  },
        { s: 'cb', l: -28, t: 56, w: 178, fx: -151, fy:  6, op: 0.97 },
        { s: 'ca', l:  34, t: 59, w: 172, fx:  147, fy:  5, op: 0.97 },
        { s: 'ca', l: -35, t: 80, w: 158, fx: -131, fy:  7, op: 0.93 },
        { s: 'cb', l:  31, t: 82, w: 152, fx:  127, fy:  8, op: 0.93 },
    ]},

    // ── Eshop → Lectures ──────────────────────────────────────────────────
    { sIn: 0.605, sFull: 0.620, sHold: 0.634, sOut: 0.660, cls: [
        { s: 'ca', l: -38, t:  4, w: 222, fx: -190, fy: -5, op: 1.0  },
        { s: 'cb', l:  31, t:  7, w: 216, fx:  185, fy: -7, op: 1.0  },
        { s: 'cb', l: -31, t: 30, w: 200, fx: -170, fy:  3, op: 1.0  },
        { s: 'ca', l:  36, t: 33, w: 194, fx:  165, fy:  4, op: 1.0  },
        { s: 'ca', l: -27, t: 55, w: 177, fx: -150, fy:  5, op: 0.97 },
        { s: 'cb', l:  33, t: 58, w: 171, fx:  145, fy:  6, op: 0.97 },
        { s: 'cb', l: -33, t: 78, w: 157, fx: -130, fy:  8, op: 0.93 },
        { s: 'ca', l:  30, t: 80, w: 151, fx:  125, fy:  7, op: 0.93 },
    ]},

    // ── Lectures → Projects ───────────────────────────────────────────────
    { sIn: 0.680, sFull: 0.693, sHold: 0.722, sOut: 0.748, cls: [
        { s: 'cb', l: -37, t:  5, w: 219, fx: -187, fy: -6, op: 1.0  },
        { s: 'ca', l:  32, t:  8, w: 213, fx:  182, fy: -8, op: 1.0  },
        { s: 'ca', l: -29, t: 32, w: 198, fx: -168, fy:  4, op: 1.0  },
        { s: 'cb', l:  35, t: 35, w: 192, fx:  163, fy:  3, op: 1.0  },
        { s: 'cb', l: -26, t: 57, w: 176, fx: -149, fy:  6, op: 0.97 },
        { s: 'ca', l:  34, t: 60, w: 170, fx:  144, fy:  5, op: 0.97 },
        { s: 'ca', l: -34, t: 79, w: 156, fx: -129, fy:  7, op: 0.93 },
        { s: 'cb', l:  31, t: 81, w: 150, fx:  124, fy:  8, op: 0.93 },
    ]},

    // ── Projects → Media ──────────────────────────────────────────────────
    { sIn: 0.755, sFull: 0.766, sHold: 0.778, sOut: 0.812, cls: [
        { s: 'ca', l: -40, t: 10, w: 218, fx: -188, fy: -5, op: 1.0  },
        { s: 'cb', l:  30, t: 13, w: 212, fx:  182, fy: -7, op: 1.0  },
        { s: 'cb', l: -34, t: 52, w: 200, fx: -170, fy:  5, op: 0.95 },
    ]},

    // ── Media → Contact ───────────────────────────────────────────────────
    { sIn: 0.875, sFull: 0.890, sHold: 0.908, sOut: 0.932, cls: [
        { s: 'cb', l: -37, t:  8, w: 220, fx: -188, fy: -6, op: 0.90 },
        { s: 'ca', l:  31, t: 11, w: 214, fx:  183, fy: -8, op: 0.90 },
        { s: 'ca', l: -30, t: 48, w: 198, fx: -168, fy:  4, op: 0.85 },
        { s: 'cb', l:  32, t: 80, w: 190, fx:  163, fy:  7, op: 0.85 },
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
                width: `${cl.w}vmax`,
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
