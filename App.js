import React, { Component } from "react";
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

// Class Component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kodeKelas: "",
      isHadir: false,
      waktuAbsen: "",
      jamRealtime: "Memuat jam...",
    };

    this.studentData = {
      nama: "Muhammad Dwi Saputra",
      nim: "0320240089",
      prodi: "TRPL - Politeknik Astra",
    };
  }

  componentDidMount() {
    console.log("[MOUNTING] Aplikasi Dibuka");

    this.intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString("id-ID");
      this.setState({ jamRealtime: waktu });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isHadir && !prevState.isHadir) {
      console.log(`[UPDATING] Presensi pada: ${this.state.waktuAbsen}`);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalJam);
  }

  handleAbsen = () => {
    if (this.state.kodeKelas.trim() === "") {
      alert("Masukkan kode kelas dulu!");
      return;
    }

    this.setState({
      isHadir: true,
      waktuAbsen: this.state.jamRealtime,
    });
  };

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sistem Presensi</Text>
            <Text style={styles.clockText}>{this.state.jamRealtime}</Text>
          </View>

          {/* PROFILE */}
          <KartuProfil student={this.studentData} />

          {/* PRESENSI */}
          <View style={styles.actionSection}>
            {this.state.isHadir ?
              <View style={styles.successCard}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
                  }}
                  style={styles.successIcon}
                />
                <Text style={styles.successText}>Presensi Berhasil!</Text>
                <Text style={styles.timeText}>
                  Tercatat: {this.state.waktuAbsen}
                </Text>
                <Text style={styles.codeText}>
                  Kode: {this.state.kodeKelas}
                </Text>
              </View>
            : <View style={styles.inputCard}>
                <Text style={styles.instructionText}>Masukkan kode kelas:</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Contoh: TRPL-03"
                  value={this.state.kodeKelas}
                  onChangeText={(text) => this.setState({ kodeKelas: text })}
                />

                <TouchableOpacity
                  style={styles.buttonSubmit}
                  onPress={this.handleAbsen}
                >
                  <Text style={styles.buttonText}>Konfirmasi</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
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