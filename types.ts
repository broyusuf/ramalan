
export interface UserData {
  name: string;
  birthDate: string;
  partnerName?: string;
  partnerBirthDate?: string;
  mode: 'DIRI_SENDIRI' | 'PASANGAN';
  relationshipType?: 'PACARAN' | 'MENIKAH';
}

export interface CosmicAnalysis {
  // 1-30 (Profil Umum / Personal)
  inti: { julukan: string; kekuatan: string; visi: string; emosi: number; ambisi: number; energi: string; intelektual: string; solusi: string; };
  gelap: { sisiSembunyi: string; redFlag: string; toxic: string; defensif: string; ketakutan: string; sumberStres: string; amarah: string; dosa: string; musuh: string; iri: string; solusi: string; };
  karir: { profesi: string; bakat: string; kepemimpinan: string; lingkungan: string; penghambat: string; kunciSukses: string; tipePekerja: string; hobiCuan: string; solusi: string; };
  kekayaan: { potensi: string; dnaUang: string; sumberRezeki: string; belanja: string; hoki: string; arah: string; usiaEmas: string; solusi: string; };
  asmaraSingle: { tipeIdeal: string; bahasaCinta: string; karakter: string; dayaTarik: string; tantangan: string; kesetiaan: number; kecocokan: string; alasanGagal: string; mantan: string; selingkuh: string; usiaCinta: string; inisial: string; gayaRibut: string; solusi: string; };
  sosial: { peran: string; kesanPertama: string; tipeHater: string; magnetDrama: string; trustIssue: string; komunikasi: string; lawanHaters: string; solusi: string; };
  mistik: { karma: string; kehidupanLalu: string; hutangKarma: string; intuisi: string; khodam: string; usiaJiwa: string; chakra: string; levelSpiritual: string; solusi: string; };
  gayaHidup: { estetik: string; kotaHoki: string; laguTema: string; makananHoki: string; fashion: string; kronotipe: string; solusi: string; };
  keberuntungan: { angka: number[]; hari: string; warna: string; arah: string; elemen: string; kristal: string; hewan: string; jimat: string; tanaman: string; solusi: string; };
  statistik: { hoki: number; eq: number; aura: number; sadis: number; bucin: number; kerasKepala: number; waras: number; };
  prediksiWaktu: { tema: string; bulanHoki: string; bulanWaspada: string; grafik: number[]; pesan: string; solusi: string; };
  triviaGimmick: { senjata: string; karakterFiksi: string; motto: string; judulFilm: string; aroma: string; solusi: string; };
  rpg: { kelas: string; mana: string; str: number; int: number; agi: number; luck: number; pasif: string; ulti: string; kelemahan: string; role: string; senjataLegenda: string; boss: string; solusi: string; };
  digital: { tipeNetizen: string; appBoros: string; kontenFyp: string; gayaChat: string; emoji: string; viral: string; nicheYoutube: string; wifi: string; meme: string; redFlagDigital: string; solusi: string; };
  horor: { zombie: string; peranHoror: string; matiKonyol: string; hantuTakut: string; barangKiamat: string; sembunyi: string; aliansi: string; skillSurvival: string; solusi: string; };
  kuliner: { comfortFood: string; minuman: string; pedas: number; camilan: string; dessert: string; sarapan: string; dietGagal: string; masak: string; solusi: string; };
  metafora: { cuaca: string; planet: string; bunga: string; aromaTubuh: string; geometri: string; jamBiologis: string; musim: string; solusi: string; };
  domestik: { gayaTidur: string; benciRumah: string; sofa: string; barangHilang: string; gayaMandi: string; tetangga: string; koleksi: string; solusi: string; };
  andai: { lotre: string; presiden: string; waktu: string; telepati: string; hewanAndai: string; penjahat: string; pulau: string; solusi: string; };
  kriminal: { psikopat: number; tipeKejahatan: string; penjara: string; geng: string; modus: string; kabur: string; solusi: string; };
  warisan: { kataTerakhir: string; laguPemakaman: string; nisan: string; warisan: string; sesal: string; ingatan: string; solusi: string; };
  kesehatan: { bagianMenarik: string; penyakit: string; stamina: string; organKuat: string; responStres: string; usiaBio: string; solusi: string; };
  variasi: { plat: string; kendaraan: string; liburan: string; buku: string; disney: string; murid: string; bp: string; lamun: string; solusi: string; };
  religius: { tipeJamaah: string; godaan: string; amalan: string; pahalaHangus: string; kesabaran: string; doaKabul: string; sedekah: string; gangguanIbadah: string; sinetronAzab: string; jalurSurga: string; solusi: string; };
  nusantara: { khodam: string; wetonMistik: string; pantangan: string; santetMental: string; lokasiAngker: string; susukAlami: string; mitosHidup: string; tandaRezeki: string; solusi: string; };
  keluarga: { peranKumpul: string; tipeTanteOm: string; jawabanNikah: string; kueLebaran: string; pewaris: string; mertuaBawel: string; anggotaCiong: string; solusi: string; };
  korporat: { tipeKaryawan: string; alasanResign: string; menuMaksi: string; temanDihindari: string; burnout: number; gayaPresentasi: string; posisiMeeting: string; tipeBos: string; solusi: string; };
  teknologi: { cyborg: string; kerjaMars: string; aiGanti: string; dataMahal: string; ufo: string; mesinWaktu: string; konspirasi: string; solusi: string; };
  absurd: { hantu: string; bauKentut: string; bendaMasaLalu: string; sambal: string; judulSinetron: string; wakilPresiden: string; alasanAlien: string; solusi: string; };
  mental: { overthinking: string; trauma: string; caraMenangis: string; bahagiaKecil: string; levelBodoAmat: string; tempatHealing: string; suaraHati: string; solusi: string; };

  // 31-38 (Dinamika Pasangan)
  pasanganMetrik?: { humor: number; finansial: number; chemistry: number; emosional: number; kesabaran: number; trust: number; nyambung: number; langgeng: number; solusi: string; };
  pasanganKonflik?: { pemicu: string; pemula: string; maaf: string; gaya: string; durasi: string; senjata: string; sogokan: string; mengalah: string; solusi: string; };
  pasanganKuasa?: { bucin: string; galak: string; manja: string; keputusan: string; remote?: string; keuangan?: string; luarNegeri?: string; keamanan?: string; solusi: string; };
  pasanganTidur?: { posisi: string; selimut: string; ngorok: string; kamarMandi: string; tugasRumah: string; bangun: string; ritual: string; solusi: string; };
  pasanganDigital?: { password: string; statusBio: string; stalker: string; postFoto: string; namaKontak: string; cemburu: string; dmLawanJenis: string; solusi: string; };
  pasanganParenting?: { gaya: string; disayangAnak: string; jumlahAnak: string; panikAnak: string; marahAnak: string; wajahAnak: string; hariTua: string; solusi: string; };
  pasanganUjian?: { ikea: number; maps: number; panikUang: string; ldr: string; gendut: string; bangkrut: string; solusi: string; };
  pasanganTrivia?: { suka: string; benci: string; julukan: string; kencan: string; lagu: string; lupaAnniversary: string; alasanBersama: string; solusi: string; };

  // 39-40 (Ekstra)
  traveling: { tipe: string; barangWajib: string; tujuan: string; gayaBudget: string; temanDihindari: string; drama: string; olehOleh: string; ritual: string; solusi: string; };
  nostalgia: { jajanSD: string; mainan: string; kartun: string; kebohongan: string; citaCita: string; kenakalan: string; laguAnak: string; musuh: string; solusi: string; };

  catatanAkhir: string;
  imageUrl: string;
}

export type AppState = 'BERANDA' | 'MENGANALISIS' | 'HASIL';
