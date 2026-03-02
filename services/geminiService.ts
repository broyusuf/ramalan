
import { GoogleGenAI } from "@google/genai";
import { UserData, CosmicAnalysis } from "../types";

export const analyzeCosmicIdentity = async (userData: UserData): Promise<CosmicAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const isCouple = userData.mode === 'PASANGAN';
  const relType = userData.relationshipType || 'PACARAN';
  
  const subyek = isCouple 
    ? `PASANGAN ${relType} (${userData.name} & ${userData.partnerName})`
    : `INDIVIDU (${userData.name})`;

  const prompt = `
    Anda adalah Pakar Analisis Karakter, Astrolog, dan Konsultan Kehidupan yang bijak. Berikan analisis mendalam terhadap subyek: ${subyek}.
    
    ATURAN UTAMA:
    1. GUNAKAN BAHASA INDONESIA SEPENUHNYA. Dilarang menggunakan istilah asing untuk kunci maupun nilai hasil (kecuali nama kategori yang sudah ditentukan di JSON).
    2. TONE: Bijak, Serius namun Santai, Empatik, dan Memberdayakan. Hindari kata kasar.
    3. SOLUSI: Setiap bagian WAJIB menyertakan field "solusi" yang memberikan saran konkret atau langkah perbaikan.
    4. KESIMPULAN: "catatanAkhir" harus panjang, merangkum aspek Keuangan, Kesehatan, Percintaan, dan Karir secara menyeluruh.
    
    Wajib kembalikan JSON VALID dengan struktur 40 kategori sesuai variabel Master V2.
    
    STRUKTUR JSON (Ikuti persis):
    {
      "inti": {"julukan": "", "kekuatan": "", "visi": "", "emosi": 0-100, "ambisi": 0-100, "energi": "", "intelektual": "", "solusi": ""},
      "gelap": {"sisiSembunyi": "", "redFlag": "", "toxic": "", "defensif": "", "ketakutan": "", "sumberStres": "", "amarah": "", "dosa": "", "musuh": "", "iri": "", "solusi": ""},
      "karir": {"profesi": "", "bakat": "", "kepemimpinan": "", "lingkungan": "", "penghambat": "", "kunciSukses": "", "tipePekerja": "", "hobiCuan": "", "solusi": ""},
      "kekayaan": {"potensi": "", "dnaUang": "", "sumberRezeki": "", "belanja": "", "hoki": "", "arah": "", "usiaEmas": "", "solusi": ""},
      "asmaraSingle": {"tipeIdeal": "", "bahasaCinta": "", "karakter": "", "dayaTarik": "", "tantangan": "", "kesetiaan": 0-100, "kecocokan": "", "alasanGagal": "", "mantan": "", "selingkuh": "", "usiaCinta": "", "inisial": "", "gayaRibut": "", "solusi": ""},
      "sosial": {"peran": "", "kesanPertama": "", "tipeHater": "", "magnetDrama": "", "trustIssue": "", "komunikasi": "", "lawanHaters": "", "solusi": ""},
      "mistik": {"karma": "", "kehidupanLalu": "", "hutangKarma": "", "intuisi": "", "khodam": "", "usiaJiwa": "", "chakra": "", "levelSpiritual": "", "solusi": ""},
      "gayaHidup": {"estetik": "", "kotaHoki": "", "laguTema": "", "makananHoki": "", "fashion": "", "kronotipe": "", "solusi": ""},
      "keberuntungan": {"angka": [1, 2, 3], "hari": "", "warna": "", "arah": "", "elemen": "", "kristal": "", "hewan": "", "jimat": "", "tanaman": "", "solusi": ""},
      "statistik": {"hoki": 0-100, "eq": 0-100, "aura": 0-100, "sadis": 0-100, "bucin": 0-100, "kerasKepala": 0-100, "waras": 0-100},
      "prediksiWaktu": {"tema": "", "bulanHoki": "", "bulanWaspada": "", "grafik": [1,2,3,4,5,6,7,8,9,10,11,12], "pesan": "", "solusi": ""},
      "triviaGimmick": {"senjata": "", "karakterFiksi": "", "motto": "", "judulFilm": "", "aroma": "", "solusi": ""},
      "rpg": {"kelas": "", "mana": "", "str": 0-100, "int": 0-100, "agi": 0-100, "luck": 0-100, "pasif": "", "ulti": "", "kelemahan": "", "role": "", "senjataLegenda": "", "boss": "", "solusi": ""},
      "digital": {"tipeNetizen": "", "appBoros": "", "kontenFyp": "", "gayaChat": "", "emoji": "", "viral": "", "nicheYoutube": "", "wifi": "", "meme": "", "redFlagDigital": "", "solusi": ""},
      "horor": {"zombie": "", "peranHoror": "", "matiKonyol": "", "hantuTakut": "", "barangKiamat": "", "sembunyi": "", "aliansi": "", "skillSurvival": "", "solusi": ""},
      "kuliner": {"comfortFood": "", "minuman": "", "pedas": 1-10, "camilan": "", "dessert": "", "sarapan": "", "dietGagal": "", "masak": "", "solusi": ""},
      "metafora": {"cuaca": "", "planet": "", "bunga": "", "aromaTubuh": "", "geometri": "", "jamBiologis": "", "musim": "", "solusi": ""},
      "domestik": {"gayaTidur": "", "benciRumah": "", "sofa": "", "barangHilang": "", "gayaMandi": "", "tetangga": "", "koleksi": "", "solusi": ""},
      "andai": {"lotre": "", "presiden": "", "waktu": "", "telepati": "", "hewanAndai": "", "penjahat": "", "pulau": "", "solusi": ""},
      "kriminal": {"psikopat": 0-100, "tipeKejahatan": "", "penjara": "", "geng": "", "modus": "", "kabur": "", "solusi": ""},
      "warisan": {"kataTerakhir": "", "laguPemakaman": "", "nisan": "", "warisan": "", "sesal": "", "ingatan": "", "solusi": ""},
      "kesehatan": {"bagianMenarik": "", "penyakit": "", "stamina": "", "organKuat": "", "responStres": "", "usiaBio": "", "solusi": ""},
      "variasi": {"plat": "", "kendaraan": "", "liburan": "", "buku": "", "disney": "", "murid": "", "bp": "", "lamun": "", "solusi": ""},
      "religius": {"tipeJamaah": "", "godaan": "", "amalan": "", "pahalaHangus": "", "kesabaran": "", "doaKabul": "", "sedekah": "", "gangguanIbadah": "", "sinetronAzab": "", "jalurSurga": "", "solusi": ""},
      "nusantara": {"khodam": "", "wetonMistik": "", "pantangan": "", "santetMental": "", "lokasiAngker": "", "susukAlami": "", "mitosHidup": "", "tandaRezeki": "", "solusi": ""},
      "keluarga": {"peranKumpul": "", "tipeTanteOm": "", "jawabanNikah": "", "kueLebaran": "", "pewaris": "", "mertuaBawel": "", "anggotaCiong": "", "solusi": ""},
      "korporat": {"tipeKaryawan": "", "alasanResign": "", "menuMaksi": "", "temanDihindari": "", "burnout": 0-100, "gayaPresentasi": "", "posisiMeeting": "", "tipeBos": "", "solusi": ""},
      "teknologi": {"cyborg": "", "kerjaMars": "", "aiGanti": "", "dataMahal": "", "ufo": "", "mesinWaktu": "", "konspirasi": "", "solusi": ""},
      "absurd": {"hantu": "", "bauKentut": "", "bendaMasaLalu": "", "sambal": "", "judulSinetron": "", "wakilPresiden": "", "alasanAlien": "", "solusi": ""},
      "mental": {"overthinking": "", "trauma": "", "caraMenangis": "", "bahagiaKecil": "", "levelBodoAmat": "", "tempatHealing": "", "suaraHati": "", "solusi": ""},
      
      "pasanganMetrik": {"humor": 0-100, "finansial": 0-100, "chemistry": 0-100, "emosional": 0-100, "kesabaran": 0-100, "trust": 0-100, "nyambung": 0-100, "langgeng": 0-100, "solusi": ""},
      "pasanganKonflik": {"pemicu": "", "pemula": "", "maaf": "", "gaya": "", "durasi": "", "senjata": "", "sogokan": "", "mengalah": "", "solusi": ""},
      "pasanganKuasa": {"bucin": "", "galak": "", "manja": "", "keputusan": "", "remote": "", "keuangan": "", "luarNegeri": "", "keamanan": "", "solusi": ""},
      "pasanganTidur": {"posisi": "", "selimut": "", "ngorok": "", "kamarMandi": "", "tugasRumah": "", "bangun": "", "ritual": "", "solusi": ""},
      "pasanganDigital": {"password": "", "statusBio": "", "stalker": "", "postFoto": "", "namaKontak": "", "cemburu": "", "dmLawanJenis": "", "solusi": ""},
      "pasanganParenting": {"gaya": "", "disayangAnak": "", "jumlahAnak": "", "panikAnak": "", "marahAnak": "", "wajahAnak": "", "hariTua": "", "solusi": ""},
      "pasanganUjian": {"ikea": 0-100, "maps": 0-100, "panikUang": "", "ldr": "", "gendut": "", "bangkrut": "", "solusi": ""},
      "pasanganTrivia": {"suka": "", "benci": "", "julukan": "", "kencan": "", "lagu": "", "lupaAnniversary": "", "alasanBersama": "", "solusi": ""},
      
      "traveling": {"tipe": "", "barangWajib": "", "tujuan": "", "gayaBudget": "", "temanDihindari": "", "drama": "", "olehOleh": "", "ritual": "", "solusi": ""},
      "nostalgia": {"jajanSD": "", "mainan": "", "kartun": "", "kebohongan": "", "citaCita": "", "kenakalan": "", "laguAnak": "", "musuh": "", "solusi": ""},
      
      "catatanAkhir": ""
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const data = JSON.parse(response.text || "{}");
    const imageUrl = `https://picsum.photos/seed/${userData.name + (userData.partnerName || '')}/1200/800?grayscale&blur=2`;

    return { ...data, imageUrl };
  } catch (err) {
    console.error(err);
    throw new Error("Sinyal kosmik terganggu. Mohon coba beberapa saat lagi.");
  }
};
