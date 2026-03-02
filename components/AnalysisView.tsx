
import React, { useEffect } from 'react';
import { CosmicAnalysis, UserData } from '../types';

interface Props {
  analysis: CosmicAnalysis;
  userData: UserData;
  onReset: () => void;
}

const ProgressBar: React.FC<{ label: string; value: number | undefined; color?: string; max?: number }> = ({ label, value = 0, color = "bg-indigo-500", max = 100 }) => (
  <div className="w-full space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
      <span>{label}</span>
      <span>{value}{max === 10 ? '/10' : '%'}</span>
    </div>
    <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden border border-white/5">
      <div 
        className={`h-full ${color} rounded-full transition-all duration-[2500ms] ease-out`} 
        style={{ width: `${(Math.min(value || 0, max) / max) * 100}%` }} 
      />
    </div>
  </div>
);

const Card: React.FC<{ title: string; icon: string; children: React.ReactNode; highlighted?: boolean; solusi?: string }> = ({ title, icon, children, highlighted, solusi }) => (
  <div className={`bg-neutral-950/40 backdrop-blur-md border ${highlighted ? 'border-indigo-500/30 shadow-lg shadow-indigo-500/5' : 'border-white/5'} rounded-3xl p-6 flex flex-col gap-5 hover:border-white/10 transition-all duration-500 h-full group`}>
    <div className="flex items-center gap-4 border-b border-white/5 pb-4">
      <div className="text-2xl opacity-70 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">{title}</h3>
    </div>
    <div className="space-y-4 text-neutral-300 text-sm leading-relaxed font-light">
      {children}
    </div>
    {solusi && (
      <div className="mt-auto pt-5 border-t border-white/5">
        <div className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Saran Strategis</div>
        <p className="text-[11px] text-neutral-500 italic leading-relaxed">{solusi}</p>
      </div>
    )}
  </div>
);

const InfoLine: React.FC<{ label: string; value: any; color?: string; note?: string }> = ({ label, value, color = "text-neutral-100", note }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[8px] font-black uppercase tracking-[0.25em] text-neutral-600">{label}</span>
    <span className={`font-medium text-sm ${color} leading-snug`}>
      {Array.isArray(value) ? value.join(', ') : (value || '-')}
    </span>
    {note && <span className="text-[9px] italic text-neutral-500 mt-0.5">{note}</span>}
  </div>
);

const AnalysisView: React.FC<Props> = ({ analysis, userData, onReset }) => {
  const d = analysis;
  const isCouple = userData.mode === 'PASANGAN';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20 space-y-20 animate-in fade-in duration-1000 relative z-10">
      
      {/* Header Utama */}
      <div className="flex flex-col items-center text-center space-y-8 mb-20">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 shadow-3xl bg-black">
          <img src={d.imageUrl} className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700" alt="Cosmic Avatar" />
        </div>
        <div className="space-y-5">
          <div className="inline-block px-5 py-1.5 bg-white/5 text-neutral-400 rounded-full text-[9px] font-black uppercase tracking-[0.5em] border border-white/5">
            MANIFESTASI TAKDIR & ENERGI
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white leading-none">
            {isCouple ? `${userData.name} & ${userData.partnerName}` : userData.name}
          </h1>
          <p className="text-neutral-500 text-xs md:text-sm font-medium italic max-w-2xl mx-auto leading-relaxed uppercase tracking-[0.2em]">
            {d.prediksiWaktu?.pesan || "Menyelaraskan frekuensi alam semesta..."}
          </p>
        </div>
      </div>

      {/* Statistik Pasangan (Jika ada) */}
      {isCouple && d.pasanganMetrik && (
        <div className="bg-neutral-900/20 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 border border-white/5 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-black text-white uppercase tracking-[0.6em]">SINERGI HUBUNGAN</h2>
            <p className="text-[10px] text-neutral-600 italic tracking-widest">Kalkulasi harmonisasi dua jiwa</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <ProgressBar label="Humor" value={d.pasanganMetrik.humor} color="bg-indigo-500" />
            <ProgressBar label="Finansial" value={d.pasanganMetrik.finansial} color="bg-emerald-500" />
            <ProgressBar label="Chemistry" value={d.pasanganMetrik.chemistry} color="bg-rose-500" />
            <ProgressBar label="Emosional" value={d.pasanganMetrik.emosional} color="bg-blue-500" />
            <ProgressBar label="Kesabaran" value={d.pasanganMetrik.kesabaran} color="bg-purple-500" />
            <ProgressBar label="Kepercayaan" value={d.pasanganMetrik.trust} color="bg-cyan-500" />
            <ProgressBar label="Obrolan" value={d.pasanganMetrik.nyambung} color="bg-orange-500" />
            <ProgressBar label="Masa Depan" value={d.pasanganMetrik.langgeng} color="bg-white" />
          </div>
          <div className="pt-8 border-t border-white/5 text-center">
             <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-3">Pesan Kebijaksanaan Hubungan</span>
             <p className="text-sm text-neutral-400 max-w-3xl mx-auto italic leading-relaxed font-light">{d.pasanganMetrik.solusi}</p>
          </div>
        </div>
      )}

      {/* Grid Kartu Analisis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        
        <Card title="Pola Dasar Diri" icon="🧬" solusi={d.inti?.solusi}>
          <InfoLine label="Julukan Karakter" value={d.inti?.julukan} />
          <InfoLine label="Kekuatan Utama" value={d.inti?.kekuatan} color="text-indigo-400" />
          <InfoLine label="Visi & Misi" value={d.inti?.visi} />
          <InfoLine label="Kematangan Intelektual" value={d.inti?.intelektual} />
          <ProgressBar label="Keseimbangan Emosi" value={d.inti?.emosi} color="bg-blue-400" />
        </Card>

        <Card title="Sisi Gelap" icon="🌑" solusi={d.gelap?.solusi}>
          <InfoLine label="Red Flag Terbesar" value={d.gelap?.redFlag} color="text-rose-500" />
          <InfoLine label="Sifat Toxic" value={d.gelap?.toxic} />
          <InfoLine label="Ketakutan Terbesar" value={d.gelap?.ketakutan} />
          <InfoLine label="Mekanisme Pertahanan" value={d.gelap?.defensif} />
        </Card>

        <Card title="Karir & Masa Depan" icon="💼" solusi={d.karir?.solusi}>
          <InfoLine label="Profesi Ideal" value={d.karir?.profesi} />
          <InfoLine label="Bakat Terpendam" value={d.karir?.bakat} />
          <InfoLine label="Kunci Sukses" value={d.karir?.kunciSukses} />
          <InfoLine label="Gaya Memimpin" value={d.karir?.kepemimpinan} />
        </Card>

        <Card title="Finansial & Cuan" icon="💰" solusi={d.kekayaan?.solusi}>
          <InfoLine label="DNA Keuangan" value={d.kekayaan?.dnaUang} color="text-emerald-400" />
          <InfoLine label="Puncak Kejayaan" value={d.kekayaan?.usiaEmas} />
          <InfoLine label="Sumber Rezeki" value={d.kekayaan?.sumberRezeki} />
          <InfoLine label="Kebiasaan Belanja" value={d.kekayaan?.belanja} />
        </Card>

        {isCouple ? (
          <>
            <Card title="Konflik & Damai" icon="⚖️" highlighted solusi={d.pasanganKonflik?.solusi}>
              <InfoLine label="Pemicu Utama" value={d.pasanganKonflik?.pemicu} />
              <InfoLine label="Gaya Bertengkar" value={d.pasanganKonflik?.gaya} />
              <InfoLine label="Siapa Minta Maaf?" value={d.pasanganKonflik?.maaf} />
              <InfoLine label="Durasi Marahan" value={d.pasanganKonflik?.durasi} />
            </Card>
            <Card title="Dinamika Kuasa" icon="👑" solusi={d.pasanganKuasa?.solusi}>
              <InfoLine label="Siapa Lebih Bucin?" value={d.pasanganKuasa?.bucin} />
              <InfoLine label="Siapa Lebih Galak?" value={d.pasanganKuasa?.galak} />
              <InfoLine label="Pengambil Keputusan" value={d.pasanganKuasa?.keputusan} />
              {userData.relationshipType === 'MENIKAH' && (
                <InfoLine label="Menteri Keuangan" value={d.pasanganKuasa?.keuangan} />
              )}
            </Card>
            <Card title="Digital & Sosmed" icon="📱" solusi={d.pasanganDigital?.solusi}>
              <InfoLine label="Keamanan Password" value={d.pasanganDigital?.password} />
              <InfoLine label="Nama Kontak" value={d.pasanganDigital?.namaKontak} />
              <InfoLine label="Respon Pesan Asing" value={d.pasanganDigital?.dmLawanJenis} />
              <InfoLine label="Tingkat Cemburu" value={d.pasanganDigital?.cemburu} />
            </Card>
            {userData.relationshipType === 'MENIKAH' && (
              <>
                <Card title="Domestik & Tidur" icon="🏡" solusi={d.pasanganTidur?.solusi}>
                  <InfoLine label="Posisi Tidur" value={d.pasanganTidur?.posisi} />
                  <InfoLine label="Level Ngorok" value={d.pasanganTidur?.ngorok} />
                  <InfoLine label="Tugas Rumah" value={d.pasanganTidur?.tugasRumah} />
                  <InfoLine label="Kebiasaan Kamar Mandi" value={d.pasanganTidur?.kamarMandi} />
                </Card>
                <Card title="Parenting" icon="👨‍👩‍👧" solusi={d.pasanganParenting?.solusi}>
                  <InfoLine label="Gaya Mengasuh" value={d.pasanganParenting?.gaya} />
                  <InfoLine label="Jumlah Anak Ideal" value={d.pasanganParenting?.jumlahAnak} />
                  <InfoLine label="Wajah Anak Mirip..." value={d.pasanganParenting?.wajahAnak} />
                </Card>
              </>
            )}
            <Card title="Trivia Pasangan" icon="🧡" solusi={d.pasanganTrivia?.solusi}>
              <InfoLine label="Lagu Kebangsaan" value={d.pasanganTrivia?.lagu} />
              <InfoLine label="Alasan Bersama" value={d.pasanganTrivia?.alasanBersama} />
              <InfoLine label="Hal Paling Dibenci" value={d.pasanganTrivia?.benci} />
              <InfoLine label="Julukan Sayang" value={d.pasanganTrivia?.julukan} />
            </Card>
          </>
        ) : (
          <Card title="Visi Asmara" icon="🕯️" solusi={d.asmaraSingle?.solusi}>
            <InfoLine label="Pasangan Ideal" value={d.asmaraSingle?.tipeIdeal} />
            <InfoLine label="Bahasa Cinta" value={d.asmaraSingle?.bahasaCinta} />
            <InfoLine label="Daya Tarik Utama" value={d.asmaraSingle?.dayaTarik} />
            <InfoLine label="Alasan Sering Gagal" value={d.asmaraSingle?.alasanGagal} />
          </Card>
        )}

        <Card title="Mistik Nusantara" icon="🏮" solusi={d.nusantara?.solusi}>
          <InfoLine label="Energi Khodam" value={d.nusantara?.khodam} color="text-orange-400" />
          <InfoLine label="Weton Mistik" value={d.nusantara?.wetonMistik} />
          <InfoLine label="Susuk Alami" value={d.nusantara?.susukAlami} />
          <InfoLine label="Pantangan Leluhur" value={d.nusantara?.pantangan} />
        </Card>

        <Card title="RPG Stats" icon="🎮" solusi={d.rpg?.solusi}>
          <InfoLine label="Kelas Karakter" value={d.rpg?.kelas} />
          <InfoLine label="Skill Pasif" value={d.rpg?.pasif} />
          <InfoLine label="Jurus Ultimate" value={d.rpg?.ulti} color="text-purple-400" />
          <ProgressBar label="Kekuatan (STR)" value={d.rpg?.str} color="bg-red-500" />
          <ProgressBar label="Kecerdasan (INT)" value={d.rpg?.int} color="bg-blue-500" />
        </Card>

        <Card title="Statistik Jiwa" icon="📊">
          <ProgressBar label="Keberuntungan" value={d.statistik?.hoki} color="bg-green-500" />
          <ProgressBar label="Aura Dominan" value={d.statistik?.aura} color="bg-yellow-500" />
          <ProgressBar label="Kewarasan" value={d.statistik?.waras} color="bg-blue-400" />
          <ProgressBar label="Daya Tarik" value={d.statistik?.eq} color="bg-indigo-500" />
        </Card>

        <Card title="Kesehatan Fisik" icon="🌱" solusi={d.kesehatan?.solusi}>
          <InfoLine label="Organ Terkuat" value={d.kesehatan?.organKuat} />
          <InfoLine label="Respon Stres" value={d.kesehatan?.responStres} />
          <InfoLine label="Usia Biologis" value={d.kesehatan?.usiaBio} />
          <InfoLine label="Stamina Dasar" value={d.kesehatan?.stamina} />
        </Card>

        <Card title="Prediksi Waktu" icon="📅" solusi={d.prediksiWaktu?.solusi}>
          <InfoLine label="Tema Besar Tahun Ini" value={d.prediksiWaktu?.tema} />
          <InfoLine label="Bulan Keberuntungan" value={d.prediksiWaktu?.bulanHoki} />
          <InfoLine label="Bulan Harus Waspada" value={d.prediksiWaktu?.bulanWaspada} />
        </Card>

        <Card title="Mental & Emosi" icon="🧠" solusi={d.mental?.solusi}>
          <InfoLine label="Penyebab Overthinking" value={d.mental?.overthinking} />
          <InfoLine label="Healing Terbaik" value={d.mental?.tempatHealing} />
          <InfoLine label="Trauma Masa Kecil" value={d.mental?.trauma} />
          <InfoLine label="Suara Hati" value={d.mental?.suaraHati} />
        </Card>

        <Card title="Gaya Hidup" icon="✨" solusi={d.gayaHidup?.solusi}>
          <InfoLine label="Estetika Pribadi" value={d.gayaHidup?.estetik} />
          <InfoLine label="Kota Hoki" value={d.gayaHidup?.kotaHoki} />
          <InfoLine label="Lagu Tema Hidup" value={d.gayaHidup?.laguTema} />
        </Card>

        <Card title="Digital Persona" icon="🌐" solusi={d.digital?.solusi}>
          <InfoLine label="Tipe Netizen" value={d.digital?.tipeNetizen} />
          <InfoLine label="Gaya Chatting" value={d.digital?.gayaChat} />
          <InfoLine label="Konten FYP Dominan" value={d.digital?.kontenFyp} />
        </Card>

      </div>

      {/* Catatan Akhir Section - Dibuat Lebih Panjang & Komprehensif */}
      <div className="bg-neutral-900/10 rounded-[3rem] p-12 md:p-16 border border-white/5 space-y-10">
        <div className="text-center space-y-3">
          <div className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em]">KESIMPULAN TAKDIR KOMPREHENSIF</div>
          <h2 className="text-2xl font-black text-white uppercase tracking-[0.2em]">PANDUAN JALAN HIDUP</h2>
        </div>
        <div className="prose prose-invert max-w-4xl mx-auto">
          <p className="text-neutral-300 text-base md:text-lg font-light leading-relaxed italic text-center">
            {d.catatanAkhir}
          </p>
        </div>
      </div>

      {/* Footer Minimalis */}
      <div className="flex flex-col items-center gap-12 pt-10 border-t border-white/5 pb-20">
        <button
          onClick={onReset}
          className="px-12 py-4 bg-white text-black font-black uppercase tracking-[0.4em] rounded-full hover:bg-neutral-200 transition-all text-xs shadow-2xl hover:scale-105 active:scale-95"
        >
          MULAI ULANG ANALISIS
        </button>
        <div className="flex flex-col items-center gap-2">
          <div className="text-[7px] font-black uppercase tracking-[0.7em] text-neutral-800">
            SISTEM ANALISIS KOSMIK VERSI 5.0 ULTIMATE
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">
            apps by broyusuf
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
