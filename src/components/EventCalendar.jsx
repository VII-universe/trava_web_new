import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { loadContent } from '../data/adminStore';

const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
const MONTHS = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
const MONTHS_GEN = ['ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOffset(year, month) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
}

const DEF_LECTURES = [];
const DEF_PROJECTS = [];

export default function EventCalendar({ onClose }) {
    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());
    const [filter, setFilter] = useState('all');
    const [hoveredDay, setHoveredDay] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const lectures = loadContent('lectures', DEF_LECTURES);
    const projects = loadContent('projects', DEF_PROJECTS);

    const allEvents = useMemo(() => {
        const lectureEvs = (lectures || [])
            .filter(l => l.date)
            .map(l => ({ id: l.id, title: l.title, subtitle: l.subtitle || '', date: l.date, type: 'lecture', location: l.location || '', description: l.desc || '', link: l.link || '' }));
        const projectEvs = (projects || [])
            .filter(p => p.date)
            .map(p => ({ id: p.id, title: p.title, subtitle: p.subtitle || '', date: p.date, type: 'project', location: p.location || '', description: p.description || '', link: p.link || '' }));
        return [...lectureEvs, ...projectEvs].sort((a, b) => a.date.localeCompare(b.date));
    }, []);

    const filtered = filter === 'all' ? allEvents : allEvents.filter(e => e.type === filter);

    const byDate = useMemo(() => {
        const m = {};
        filtered.forEach(ev => { if (!m[ev.date]) m[ev.date] = []; m[ev.date].push(ev); });
        return m;
    }, [filtered]);

    const monthPfx = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = filtered.filter(e => e.date.startsWith(monthPfx));

    const daysInMonth = getDaysInMonth(year, month);
    const offset = getFirstDayOffset(year, month);

    const prevMonth = () => {
        setSelectedDay(null); setHoveredDay(null);
        if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
    };
    const nextMonth = () => {
        setSelectedDay(null); setHoveredDay(null);
        if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
    };

    const dateStr = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const today = new Date();
    const isToday = (d) => d && year === today.getFullYear() && month === today.getMonth() && d === today.getDate();

    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const FILTERS = [
        { key: 'all',     label: 'Vše',        dot: null,          active: 'bg-white/15 text-white border-white/40',     idle: 'text-slate-400 border-white/10 hover:border-white/25' },
        { key: 'lecture', label: 'Přednášky',   dot: 'bg-gold-400', active: 'bg-gold-500/20 text-gold-300 border-gold-500/50', idle: 'text-slate-500 border-white/10 hover:border-gold-500/30 hover:text-gold-400' },
        { key: 'project', label: 'Projekty',    dot: 'bg-blue-400', active: 'bg-blue-500/20 text-blue-300 border-blue-500/50',  idle: 'text-slate-500 border-white/10 hover:border-blue-500/30 hover:text-blue-400' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-3 md:p-8 bg-slate-950/88 backdrop-blur-2xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ type: 'spring', damping: 30, stiffness: 340 }}
                onClick={e => e.stopPropagation()}
                className="bg-slate-900/95 border border-white/10 rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.6)] w-full max-w-lg max-h-[94vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/8 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold-500/12 border border-gold-500/25 rounded-2xl flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-base leading-none">Kalendář akcí</h2>
                            <p className="text-slate-500 text-xs mt-0.5">{allEvents.length} naplánovaných akcí</p>
                        </div>
                    </div>
                    <button onClick={onClose}
                        className="p-2 text-slate-500 hover:text-white hover:bg-white/8 rounded-xl transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto flex-1" data-lenis-prevent>
                    <div className="px-5 py-5">

                        {/* Filter chips */}
                        <div className="flex gap-2 mb-5">
                            {FILTERS.map(f => (
                                <button key={f.key} onClick={() => { setFilter(f.key); setSelectedDay(null); }}
                                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${filter === f.key ? f.active : f.idle}`}>
                                    {f.dot && <span className={`w-1.5 h-1.5 rounded-full ${f.dot}`} />}
                                    {f.label}
                                </button>
                            ))}
                        </div>

                        {/* Month nav */}
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={prevMonth}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/8 rounded-xl transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <h3 className="text-white font-bold text-lg tracking-tight">
                                {MONTHS[month]} {year}
                            </h3>
                            <button onClick={nextMonth}
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/8 rounded-xl transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Day labels */}
                        <div className="grid grid-cols-7 mb-1">
                            {DAYS.map(d => (
                                <div key={d} className="text-center text-[10px] font-bold text-slate-600 uppercase tracking-wider py-1">
                                    {d}
                                </div>
                            ))}
                        </div>

                        {/* Calendar grid */}
                        <div className="grid grid-cols-7 gap-px">
                            {cells.map((day, i) => {
                                if (!day) return <div key={i} className="aspect-square" />;
                                const ds = dateStr(day);
                                const evs = byDate[ds] || [];
                                const hasL = evs.some(e => e.type === 'lecture');
                                const hasP = evs.some(e => e.type === 'project');
                                const isSel = selectedDay === day;
                                const isCur = isToday(day);

                                return (
                                    <div key={i} className="relative">
                                        <button
                                            onClick={() => { setSelectedDay(isSel ? null : (evs.length ? day : null)); }}
                                            onMouseEnter={() => evs.length && setHoveredDay(day)}
                                            onMouseLeave={() => setHoveredDay(null)}
                                            className={`relative w-full aspect-square flex flex-col items-center justify-center rounded-xl transition-all duration-150
                                                ${evs.length ? 'cursor-pointer hover:bg-white/8' : 'cursor-default'}
                                                ${isSel ? 'bg-white/12 ring-1 ring-white/25' : ''}
                                                ${isCur && !isSel ? 'ring-1 ring-gold-500/50' : ''}`}
                                        >
                                            <span className={`text-sm font-semibold leading-none ${isCur ? 'text-gold-400' : evs.length ? 'text-white' : 'text-slate-600'}`}>
                                                {day}
                                            </span>
                                            {evs.length > 0 && (
                                                <div className="flex gap-0.5 mt-1">
                                                    {hasL && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                                                    {hasP && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                                                </div>
                                            )}
                                        </button>

                                        {/* Hover tooltip — desktop only */}
                                        <AnimatePresence>
                                            {hoveredDay === day && evs.length > 0 && !isSel && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 6, scale: 0.94 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 4, scale: 0.94 }}
                                                    transition={{ duration: 0.14 }}
                                                    className="absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block"
                                                    style={{ width: 210 }}
                                                >
                                                    <div className="bg-slate-800 border border-white/12 rounded-2xl p-3.5 shadow-2xl">
                                                        <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-slate-800 border-r border-b border-white/12 rotate-45" />
                                                        {evs.map((ev, idx) => (
                                                            <div key={ev.id} className={idx > 0 ? 'mt-2.5 pt-2.5 border-t border-white/8' : ''}>
                                                                <div className="flex items-center gap-1.5 mb-1">
                                                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ev.type === 'lecture' ? 'bg-gold-400' : 'bg-blue-400'}`} />
                                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${ev.type === 'lecture' ? 'text-gold-500' : 'text-blue-400'}`}>
                                                                        {ev.type === 'lecture' ? 'Přednáška' : 'Projekt'}
                                                                    </span>
                                                                </div>
                                                                <p className="text-white text-xs font-semibold leading-snug">{ev.title}</p>
                                                                {ev.location && (
                                                                    <p className="text-slate-500 text-[10px] flex items-center gap-1 mt-0.5">
                                                                        <MapPin className="w-2.5 h-2.5" />{ev.location}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Selected day detail — mobile + desktop click */}
                        <AnimatePresence>
                            {selectedDay && (() => {
                                const evs = byDate[dateStr(selectedDay)] || [];
                                if (!evs.length) return null;
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/8">
                                            {evs.map(ev => (
                                                <div key={ev.id} className="flex items-start gap-3 p-4">
                                                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${ev.type === 'lecture' ? 'bg-gold-400' : 'bg-blue-400'}`} />
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[10px] font-bold uppercase tracking-wider mb-0.5 ${ev.type === 'lecture' ? 'text-gold-500' : 'text-blue-400'}`}>
                                                            {ev.type === 'lecture' ? 'Přednáška' : 'Projekt'}
                                                        </p>
                                                        <h4 className="text-white font-semibold text-sm leading-snug">{ev.title}</h4>
                                                        {ev.subtitle && <p className="text-slate-400 text-xs mt-0.5">{ev.subtitle}</p>}
                                                        {ev.location && (
                                                            <p className="text-slate-500 text-xs flex items-center gap-1 mt-1">
                                                                <MapPin className="w-3 h-3" />{ev.location}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {ev.link && (
                                                        <a href={ev.link} target="_blank" rel="noopener noreferrer"
                                                            className="shrink-0 p-1.5 text-slate-500 hover:text-gold-400 transition-colors">
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })()}
                        </AnimatePresence>

                        {/* Month event list */}
                        {monthEvents.length > 0 && (
                            <div className="mt-6">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-3">
                                    Akce v {MONTHS_GEN[month]}
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {monthEvents.map(ev => {
                                        const d = new Date(ev.date + 'T00:00:00');
                                        return (
                                            <div key={ev.id}
                                                className="flex items-center gap-3 px-4 py-3 bg-white/4 hover:bg-white/8 border border-white/6 hover:border-white/12 rounded-2xl transition-all group cursor-default">
                                                <div className={`text-center shrink-0 w-9 ${ev.type === 'lecture' ? 'text-gold-400' : 'text-blue-400'}`}>
                                                    <p className="text-base font-black leading-none">{String(d.getDate()).padStart(2, '0')}</p>
                                                    <p className="text-[9px] uppercase font-bold opacity-60 mt-0.5">{MONTHS[d.getMonth()].slice(0, 3)}</p>
                                                </div>
                                                <span className={`w-px h-8 rounded-full ${ev.type === 'lecture' ? 'bg-gold-500/40' : 'bg-blue-500/40'}`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className={`text-[9px] font-bold uppercase tracking-wider ${ev.type === 'lecture' ? 'text-gold-500' : 'text-blue-400'}`}>
                                                            {ev.type === 'lecture' ? 'Přednáška' : 'Projekt'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-white text-xs font-semibold leading-snug group-hover:text-gold-300 transition-colors truncate">{ev.title}</h4>
                                                    {ev.location && (
                                                        <p className="text-slate-600 text-[10px] flex items-center gap-1 mt-0.5">
                                                            <MapPin className="w-2.5 h-2.5" />{ev.location}
                                                        </p>
                                                    )}
                                                </div>
                                                {ev.link && (
                                                    <a href={ev.link} target="_blank" rel="noopener noreferrer"
                                                        className="shrink-0 p-1.5 text-slate-600 hover:text-gold-400 transition-colors opacity-0 group-hover:opacity-100">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {monthEvents.length === 0 && (
                            <div className="mt-6 text-center py-10">
                                <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                                <p className="text-slate-600 text-sm">Žádné akce v tomto měsíci</p>
                                <p className="text-slate-700 text-xs mt-1">Zkus jiný měsíc nebo přidej akce v adminu</p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
