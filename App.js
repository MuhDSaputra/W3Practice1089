import React, { useState, useEffect, use } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import KartuProfil from "./components/KartuProfil";

// export default class App extends Component {
export default function App() {

  const [kodeKelas, setKodeKelas] = useState("");
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState("");
  const [jamRealtime, setJamRealtime] = useState("Memuat jam...");

  const studentData = {
    nama: "Muhammad Dwi Saputra",
    nim: "0320240089",
    prodi: "TRPL - Politeknik Astra",
  };

  useEffect(() => {
    console.log("[MOUNTING] Aplikasi Dibuka(via useEffect). Jam menyala");
    
    const intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setJamRealtime(waktu);
    }, 1000);
    
    return () => {
      console.log("[UNMOUNTING] Aplikasi Ditutup(via useEffect). Membersihkan interval jam.");
      clearInterval(intervalJam);
    };
  },[]);

  useEffect(() => {
    if (isHadir === true) {
      console.log(`[UPDATING] Sukses Presensi pada pukul: ${waktuAbsen}`);
    }
  }, [isHadir]);

  const handleAbsen = () => {
    if (kodeKelas.trim() === '') {
      alert("Masukkan kode kelas terlebih dahulu!");
      return;
    }

    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
  };

    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* HEADER DENGAN JAM DIGITAL (Terhubung ke State) */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sistem Presensi</Text>
            {/* Panggil state langsung tanpa this.state */}
            <Text style={styles.clockText}>{jamRealtime}</Text>
          </View>

          {/* Panggil variabel langsung tanpa this.studentData */}
          <KartuProfil student={studentData} />

          {/* SEKSI PRESENSI (CONDITIONAL RENDERING) */}
          <View style={styles.actionSection}>
            {isHadir ? (
              <View style={styles.successCard}>
                <Image
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                  style={styles.successIcon}
                />
                <Text style={styles.successText}>Presensi Berhasil!</Text>
                <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
                <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
              </View>
            ) : (
              <View style={styles.inputCard}>
                <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
                <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: TRPL-03"
                  value={kodeKelas}
                  // Jauh lebih ringkas dari sebelumnya!
                  onChangeText={setKodeKelas}
                  autoCapitalize="characters"
                />

                {/* Panggil fungsi handle tanpa this */}
                <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                  <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  header: {
    backgroundColor: "#0056A0",
    padding: 20,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  clockText: {
    color: "#fff",
    marginTop: 5,
  },
  actionSection: {
    margin: 20,
  },
  inputCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginVertical: 15,
  },
  buttonSubmit: {
    backgroundColor: "#0056A0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  successCard: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  successIcon: {
    width: 80,
    height: 80,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  timeText: {
    marginTop: 10,
  },
  codeText: {
    marginTop: 5,
  },
});
