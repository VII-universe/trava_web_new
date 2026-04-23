import { useState, useEffect } from 'react';
import { Eye, X, ArrowLeft } from 'lucide-react';

export default function PreviewBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const flag = localStorage.getItem('trava_preview_active');
        if (flag === '1') setVisible(true);
    }, []);

    if (!visible) return null;

    const dismiss = () => {
        localStorage.removeItem('trava_preview_active');
        setVisible(false);
    };

    return (
        <div className="fixed top-0 inset-x-0 z-[9999] flex items-center justify-between gap-3 px-4 py-2.5 bg-amber-500 text-slate-900 text-sm font-bold shadow-lg">
            <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 shrink-0" />
                <span>NÁHLED — neuložené změny z adminu</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                <a
                    href="/admin"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/15 hover:bg-slate-900/25 transition-colors text-xs font-bold uppercase tracking-wider"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Zpět do adminu
                </a>
                <button
                    onClick={dismiss}
                    className="p-1 rounded-lg hover:bg-slate-900/20 transition-colors"
                    title="Zavřít"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
