import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import LogoWhite from '../assets/svg/honza_trava_logo_negativni_V1.svg';
import LogoBlack from '../assets/svg/honza_trava_logo_V1.svg';

const navItems = [
    { label: 'Úvod',               progress: 0.00 },
    { label: 'O Honzovi',          progress: 0.13 },
    { label: 'Partneři',           progress: 0.23 },
    { label: 'Expedice & 14 Summits', progress: 0.33 },
    { label: 'Hotel Káthmándú',     progress: 0.41 },
    { label: 'Czech Pub Nepal',     progress: 0.50 },
    { label: 'E-shop',             progress: 0.59 },
    { label: 'Přednášky',          progress: 0.68 },
    { label: 'Projekty',           progress: 0.77 },
    { label: 'Média & Obsah',      progress: 0.87 },
    { label: 'Kontakt',            progress: 0.94 },
];

const Nav = ({ scrollProgress }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Logo color: LIGHT bg (black logo) → DARK bg (white logo)
    // Light: Hero/About/Icefall (0-0.30), Eshop (0.54-0.63), Media (0.81-0.90)
    // Dark:  Expeditions/Hotel/Pub (0.27-0.57), Lectures/Projects (0.63-0.83), Contact (0.90-1.0)
    const whiteOpacity = scrollProgress ? useTransform(
        scrollProgress,
        [0, 0.27, 0.30, 0.54, 0.57, 0.63, 0.66, 0.81, 0.84, 0.90, 0.93, 1.0],
        [0,  0,   1,    1,    0,    0,    1,    1,    0,    0,    1,    1  ]
    ) : 1;

    const blackOpacity = scrollProgress ? useTransform(
        scrollProgress,
        [0, 0.27, 0.30, 0.54, 0.57, 0.63, 0.66, 0.81, 0.84, 0.90, 0.93, 1.0],
        [1,  1,   0,    0,    1,    1,    0,    0,    1,    1,    0,    0  ]
    ) : 0;

    // Close menu on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Track real scroll position to change burger color/bg if needed
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
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
            <div className="fixed top-6 left-6 md:top-10 md:left-10 z-[100] cursor-pointer" onClick={() => handleNavClick(0.0)}>
                <div className={`relative flex items-start transition-transform duration-300 ${scrolled ? 'scale-90 opacity-90' : 'scale-100 opacity-100 hover:scale-105'} origin-top-left`}>
                    <motion.img 
                        src={LogoWhite} 
                        alt="Honza Tráva Logo (White)" 
                        style={{ opacity: whiteOpacity }}
                        className="h-24 md:h-36 lg:h-44 w-auto drop-shadow-md relative z-10"
                    />
                    <motion.img
                        src={LogoBlack}
                        alt="Honza Tráva Logo (Black)"
                        style={{ opacity: blackOpacity }}
                        className="absolute top-0 left-0 h-24 md:h-36 lg:h-44 w-auto z-20"
                    />
                </div>
            </div>

            {/* Burger Button - Top Right */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed top-6 right-6 md:top-10 md:right-10 z-[100] p-4 rounded-full transition-all duration-300 ${
                    scrolled ? 'bg-slate-900/80 backdrop-blur-md text-white shadow-lg' : 'bg-white/10 backdrop-blur-md text-slate-900 hover:bg-white/30 border border-slate-900/10'
                }`}
                aria-label="Open menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Fullscreen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3.5rem) 3.5rem)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3.5rem) 3.5rem)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center isolate"
                    >
                        {/* Background subtle elements */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.05)_0%,transparent_50%)]" />
                        
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 md:top-10 md:right-10 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <nav className="flex flex-col gap-6 md:gap-8 text-center relative z-10 w-full max-w-2xl px-6">
                            <h4 className="text-gold-500 font-sans uppercase tracking-[0.4em] text-xs font-bold mb-4 md:mb-8">
                                Navigace Výpravou
                            </h4>
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                                    onClick={() => handleNavClick(item.progress)}
                                    className="group relative inline-flex items-center justify-center font-serif text-3xl md:text-5xl text-slate-400 hover:text-white transition-colors duration-300"
                                >
                                    <span className="relative z-10">
                                        {item.label}
                                    </span>
                                    {/* Hover line indicator */}
                                    <span className="absolute -bottom-2 md:-bottom-4 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-500 group-hover:w-1/2 transition-all duration-300" />
                                    
                                    {/* Number indicator (subtle) */}
                                    <span className="absolute -left-12 opacity-0 group-hover:opacity-20 text-gold-500 font-sans text-sm tracking-widest transition-opacity duration-300">
                                        0{index + 1}
                                    </span>
                                </motion.button>
                            ))}
                        </nav>
                        
                        {/* Decorative bottom text */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute bottom-10 left-0 w-full text-center text-slate-600 font-mono text-xs tracking-widest uppercase"
                        >
                            8848 M N.M. — Cesta na vrchol
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Nav;
