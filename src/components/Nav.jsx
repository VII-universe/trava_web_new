import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import LogoColor from '../assets/svg/honza_trava_logo_V1.svg';
import LogoWhite from '../assets/svg/honza_trava_logo_negativni_V1.svg';

const navItems = [
    { label: 'Úvod',               progress: 0.00 },
    { label: 'O Honzovi',          progress: 0.13 },
    { label: 'Partneři',           progress: 0.23 },
    { label: 'Expedice & 14 Summits', progress: 0.33 },
    { label: 'Hotel Káthmándú',     progress: 0.41 },
    { label: 'Czech Pub Nepal',     progress: 0.50 },
    { label: 'E-shop',             progress: 0.59 },
    { label: 'Přednášky',          progress: 0.67 },
    { label: 'Projekty',           progress: 0.752 },
    { label: 'Média & Obsah',      progress: 0.87 },
    { label: 'Kontakt',            progress: 0.94 },
];

// Dark background sections → white logo; light sections → black logo
// Using hysteresis: slightly different in/out thresholds to prevent spring-bounce flickering
const DARK_ZONES = [
    { enter: 0.285, exit: 0.535 },  // Expeditions / Hotel / Pub
    { enter: 0.635, exit: 0.805 },  // Lectures / Projects
    { enter: 0.895, exit: 1.001 },  // Contact
];

const Nav = ({ scrollProgress }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Logo opacity: hidden 0-0.08 (hero logo visible), fades in by 0.12
    const logoOpacity = scrollProgress
        ? useTransform(scrollProgress, [0, 0.08, 0.12], [0, 0, 1])
        : 1;

    // Colour switch via React state + hysteresis — immune to spring oscillation
    useEffect(() => {
        if (!scrollProgress) return;
        let current = false;
        return scrollProgress.on('change', (v) => {
            let next = current;
            if (!current) {
                // currently light → switch to dark only when clearly past enter threshold
                next = DARK_ZONES.some(z => v >= z.enter && v <= z.exit);
            } else {
                // currently dark → switch back to light only when clearly past exit threshold
                next = DARK_ZONES.some(z => v >= z.enter && v <= z.exit);
            }
            if (next !== current) {
                current = next;
                setIsDark(next);
            }
        });
    }, [scrollProgress]);

    // Close menu on escape key
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Track real scroll position for burger button style
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const lenis = useLenis();

    const handleNavClick = (progress) => {
        setIsOpen(false);
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        lenis?.scrollTo(totalHeight * progress, { duration: 1.4 });
    };

    return (
        <>
            {/* Main Sticky Logo - Top Left */}
            <div
                className="fixed top-4 left-4 md:top-8 md:left-8 z-[100] cursor-pointer"
                onClick={() => handleNavClick(0.0)}
            >
                <div className={`transition-transform duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100 hover:scale-105'} origin-top-left`}>
                    {/* Wrapper handles scroll fade-in; children handle color switch via CSS */}
                    <motion.div style={{ opacity: logoOpacity }} className="relative">
                        <img
                            src={LogoColor}
                            alt="Honza Tráva"
                            className="h-12 md:h-16 lg:h-20 w-auto"
                            style={{ opacity: isDark ? 0 : 1, transition: 'opacity 0.15s ease', willChange: 'opacity' }}
                        />
                        <img
                            src={LogoWhite}
                            alt="Honza Tráva"
                            className="absolute top-0 left-0 h-12 md:h-16 lg:h-20 w-auto"
                            style={{ opacity: isDark ? 1 : 0, transition: 'opacity 0.15s ease', willChange: 'opacity' }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Burger Button - Top Right */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-4 right-4 md:top-8 md:right-8 z-[100] p-3 md:p-4 rounded-full transition-all duration-300 ${
                    scrolled
                        ? 'bg-slate-900/80 backdrop-blur-md text-white shadow-lg'
                        : 'bg-white/10 backdrop-blur-md text-slate-900 hover:bg-white/30 border border-slate-900/10'
                }`}
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3.5rem) 3.5rem)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl overflow-y-auto isolate"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05)_0%,transparent_50%)] pointer-events-none" />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="fixed top-4 right-4 md:top-10 md:right-10 z-10 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="min-h-full flex flex-col items-center justify-center py-20 px-6">
                            <nav className="flex flex-col gap-2 sm:gap-3 md:gap-4 [@media(min-height:780px)]:gap-6 [@media(min-height:960px)]:gap-8 text-center w-full max-w-2xl">
                                <h4 className="text-gold-500 font-sans uppercase tracking-[0.4em] text-xs font-bold mb-2 md:mb-4">
                                    Navigace Výpravou
                                </h4>
                                {navItems.map((item, index) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                                        onClick={() => handleNavClick(item.progress)}
                                        className="group relative inline-flex items-center justify-center font-serif text-2xl sm:text-3xl [@media(min-height:780px)]:md:text-4xl [@media(min-height:960px)]:md:text-5xl text-slate-400 hover:text-white transition-colors duration-300 py-0.5"
                                    >
                                        <span className="relative z-10">{item.label}</span>
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-1/2 transition-all duration-300" />
                                        <span className="absolute -left-12 opacity-0 group-hover:opacity-20 text-gold-500 font-sans text-sm tracking-widest transition-opacity duration-300">
                                            0{index + 1}
                                        </span>
                                    </motion.button>
                                ))}
                            </nav>

                            <p className="mt-10 text-slate-600 font-mono text-xs tracking-widest uppercase">
                                8848 M N.M. — Cesta na vrchol
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;
