import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cookie_consent';

const CookieConsent = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const t = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem(STORAGE_KEY, 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem(STORAGE_KEY, 'declined');
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 120, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 120, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-[420px] z-[300] pointer-events-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950/92 backdrop-blur-xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]">

                        {/* Gold top line */}
                        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

                        {/* Subtle radial glow top-right */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_0%,rgba(212,175,55,0.07)_0%,transparent_60%)] pointer-events-none" />

                        <div className="relative p-5 md:p-6">
                            {/* Header */}
                            <div className="flex items-start gap-3 mb-3">
                                <div className="mt-0.5 w-8 h-8 rounded-xl bg-gold-500/15 border border-gold-400/20 flex items-center justify-center shrink-0">
                                    <Cookie className="w-4 h-4 text-gold-400" />
                                </div>
                                <div>
                                    <h3 className="font-serif text-white text-base leading-snug mb-0.5">
                                        Soubory cookie
                                    </h3>
                                    <p className="font-sans text-slate-400 text-[12px] leading-relaxed">
                                        Používáme cookies pro analýzu návštěvnosti a zlepšení vašeho zážitku na webu. Vaše data jsou v bezpečí.
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-px bg-white/6 mb-4" />

                            {/* Buttons */}
                            <div className="flex items-center gap-2.5">
                                <button
                                    onClick={accept}
                                    className="flex-1 py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold uppercase tracking-[0.15em] text-[11px] transition-all duration-200 shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.5)] active:scale-95"
                                >
                                    Přijmout
                                </button>
                                <button
                                    onClick={decline}
                                    className="flex-1 py-2.5 px-4 rounded-xl border border-white/12 text-slate-400 hover:text-white hover:border-white/25 font-bold uppercase tracking-[0.15em] text-[11px] transition-all duration-200 active:scale-95"
                                >
                                    Odmítnout
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
