
import React, { useState } from 'react';
import Background from './components/Background';
import AnalysisView from './components/AnalysisView';
import { UserData, CosmicAnalysis, AppState } from './types';
import { analyzeCosmicIdentity } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('BERANDA');
  const [mode, setMode] = useState<'DIRI_SENDIRI' | 'PASANGAN'>('DIRI_SENDIRI');
  const [relType, setRelType] = useState<'PACARAN' | 'MENIKAH'>('PACARAN');
  const [userData, setUserData] = useState<Omit<UserData, 'mode' | 'relationshipType'>>({ 
    name: '', 
    birthDate: '', 
    partnerName: '', 
    partnerBirthDate: '' 
  });
  const [analysis, setAnalysis] = useState<CosmicAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.birthDate) return;
    if (mode === 'PASANGAN' && (!userData.partnerName || !userData.partnerBirthDate)) return;

    setState('MENGANALISIS');
    setError(null);

    try {
      const result = await analyzeCosmicIdentity({ 
        ...userData, 
        mode, 
        relationshipType: mode === 'PASANGAN' ? relType : undefined 
      });
      setAnalysis(result);
      setState('HASIL');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Koneksi kosmik terputus. Silakan coba kembali.');
      setState('BERANDA');
    }
  };

  const reset = () => {
    setState('BERANDA');
    setAnalysis(null);
    setUserData({ name: '', birthDate: '', partnerName: '', partnerBirthDate: '' });
  };

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center bg-black selection:bg-indigo-500 selection:text-white">
      <Background />

      {state === 'BERANDA' && (
        <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center min-h-screen animate-reveal py-20">
          <div className="mb-14 text-center space-y-5">
            <div className="inline-block px-4 py-1.5 bg-white/5 text-neutral-500 rounded-full text-[8px] font-black uppercase tracking-[0.6em] mb-3 border border-white/5">
              SIAPA KAMU SEBENARNYA? • ANALISIS TAKDIR 5.0
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
              SIAPA KAMU <br/><span className="text-neutral-800">SEBENARNYA?</span>
            </h1>
            <p className="text-neutral-600 text-[11px] font-bold uppercase tracking-[0.3em] max-w-sm mx-auto">
              Perpaduan Metafisika, Psikologi Modern & Kearifan Lokal Nusantara
            </p>
          </div>

          <div className="flex flex-col gap-4 mb-10 w-full max-w-md">
            <div className="flex gap-3">
              <button 
                onClick={() => setMode('DIRI_SENDIRI')}
                className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-700 ${mode === 'DIRI_SENDIRI' ? 'bg-white text-black shadow-2xl scale-105' : 'bg-neutral-950 text-neutral-600 border border-white/5 opacity-50'}`}
              >
                Diri Sendiri
              </button>
              <button 
                onClick={() => setMode('PASANGAN')}
                className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all duration-700 ${mode === 'PASANGAN' ? 'bg-white text-black shadow-2xl scale-105' : 'bg-neutral-950 text-neutral-600 border border-white/5 opacity-50'}`}
              >
                Cek Pasangan
              </button>
            </div>

            {mode === 'PASANGAN' && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <button 
                  onClick={() => setRelType('PACARAN')}
                  className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${relType === 'PACARAN' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-neutral-950 text-neutral-600 border border-white/5'}`}
                >
                  Pacaran
                </button>
                <button 
                  onClick={() => setRelType('MENIKAH')}
                  className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${relType === 'MENIKAH' ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' : 'bg-neutral-950 text-neutral-600 border border-white/5'}`}
                >
                  Menikah
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="w-full bg-neutral-950/20 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/5 space-y-10">
            <div className={`grid ${mode === 'PASANGAN' ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8`}>
              <div className="space-y-5">
                <h3 className="text-neutral-600 font-black uppercase tracking-[0.25em] text-[9px]">Profil Anda</h3>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-800 font-bold text-white shadow-inner"
                />
                <input
                  type="date"
                  required
                  value={userData.birthDate}
                  onChange={(e) => setUserData({ ...userData, birthDate: e.target.value })}
                  className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-neutral-500 font-bold shadow-inner"
                />
              </div>

              {mode === 'PASANGAN' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-700">
                  <h3 className="text-neutral-600 font-black uppercase tracking-[0.25em] text-[9px]">Profil Pasangan</h3>
                  <input
                    type="text"
                    required
                    placeholder="Nama Pasangan"
                    value={userData.partnerName}
                    onChange={(e) => setUserData({ ...userData, partnerName: e.target.value })}
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-800 font-bold text-white shadow-inner"
                  />
                  <input
                    type="date"
                    required
                    value={userData.partnerBirthDate}
                    onChange={(e) => setUserData({ ...userData, partnerBirthDate: e.target.value })}
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all text-neutral-500 font-bold shadow-inner"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-white py-5 text-black font-black text-[11px] transition-all hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.5em] shadow-2xl"
            >
              BONGKAR TAKDIR SEKARANG
            </button>
          </form>

          {error && (
            <div className="mt-8 text-rose-500 font-black text-[9px] uppercase tracking-[0.3em] text-center animate-pulse">
              {error}
            </div>
          )}
        </div>
      )}

      {state === 'MENGANALISIS' && (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-6 space-y-10">
          <div className="w-16 h-16 border-2 border-white/5 border-t-indigo-500 rounded-full animate-spin shadow-2xl shadow-indigo-500/20" />
          <div className="space-y-3">
            <h2 className="text-xl font-black text-white tracking-[0.5em] uppercase">Sinkronisasi Kosmik...</h2>
            <p className="text-neutral-600 font-black text-[9px] uppercase tracking-[0.3em] animate-pulse">
              Memproses korelasi bintang, weton, dan psikologi batin
            </p>
          </div>
        </div>
      )}

      {state === 'HASIL' && analysis && (
        <AnalysisView 
          analysis={analysis} 
          userData={{ ...userData, mode, relationshipType: mode === 'PASANGAN' ? relType : undefined }} 
          onReset={reset}
        />
      )}
    </main>
  );
};

export default App;
