import React from 'react';
import { motion, useTransform } from 'framer-motion';

const Media = ({ scrollProgress }) => {
    // PHASE 7: 0.68 -> 0.84 with hold (slightly closer)
    const containerOpacity = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.84], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [0.68, 0.72, 0.80, 0.84], ["-120%", "0%", "0%", "130%"]);

    const items = [
        {
            title: 'Blog',
            text: 'Cíl: nezávislost na sociálních sítích. Obsah: expedice, Nepál, příběhy, zákulisí, osobní rovina.'
        },
        {
            title: 'YouTube',
            text: 'Máte obsah, je potřeba systematicky publikovat. Formáty: vlogy, expedice, rozhovory, behind the scenes.'
        },
        {
            title: 'Podcast (příprava 2027)',
            text: 'Cestovatelská témata, zajímavé světové lokality, hosté z komunity.'
        }
    ];

    return (
        <motion.div
            style={{ opacity: containerOpacity, y }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-ivory via-white/60 to-ivory/80" />

            <motion.div className="relative z-10 max-w-6xl w-full px-6 md:px-12 py-24">
                <div className="text-center mb-12">
                    <h4 className="text-gold-600 font-sans uppercase tracking-[0.3em] text-[10px] font-bold mb-3">
                        07 — Média & Obsah
                    </h4>
                    <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">
                        Příběhy, které se do batohu nevešly
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {items.map((item) => (
                        <motion.div
                            key={item.title}
                            className="glass-card p-8 h-full flex flex-col pointer-events-auto"
                            whileHover={{ y: -6 }}
                        >
                            <h3 className="font-serif text-2xl text-slate-900 mb-3">{item.title}</h3>
                            <p className="font-sans text-slate-800 leading-relaxed text-base flex-1">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Media;
