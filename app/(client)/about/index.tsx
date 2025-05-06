// app/(client)/about/index.tsx
import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Linking
} from "react-native";
import Navbar from "../../../components/Navbar";
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

export default function About() {
  // Company values/principles
  const values = [
    {
      title: "Kualitas",
      description: "Kami hanya menyediakan produk kuliner terbaik dan berkualitas tinggi.",
      icon : "checkmark-outline"

    },
    {
      title: "Keberagaman",
      description: "Menghargai keberagaman kuliner Indonesia dari Sabang sampai Merauke.",
      icon : "walk-outline"
    },
    {
      title: "Inovasi",
      description: "Terus berinovasi untuk memberikan pengalaman kuliner terbaik.",
      icon : "rocket-outline"

    },
    {
      title: "Kepuasan Pelanggan",
      description: "Fokus utama kami adalah memberikan kepuasan maksimal kepada setiap pelanggan.",
      icon : "stats-chart-outline"

    }
  ];

  // Services offered
  const services = [
    {
      title: "Katalog Kuliner",
    },
    {
      title: "Pengiriman Cepat",
    },
    {
      title: "Pembayaran Mudah",
    },
    {
      title: "Layanan Pelanggan",
    }
  ];

  const handleInsta = () =>{
    Linking.openURL('https://instagram.com')
  }
  const handleLinkedin = () =>{
    Linking.openURL('https://linkedin.com')
  }
  const handleFacebook = () =>{
    Linking.openURL('https://facebook.com')
  }
  const handleGithub = () =>{
    Linking.openURL('https://github.com')
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Tentang Jajanin</Text>
          <Text style={styles.heroSubtitle}>
            Platform Kuliner Terlengkap di Indonesia
          </Text>
        </View>

        {/* Our Story Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Kami</Text>
          <View style={styles.storyContainer}>
            <View style={styles.storyContent}>
              <Text style={styles.storyText}>
                Jajanin adalah platform kuliner digital yang menghubungkan penikmat kuliner 
                dengan berbagai pilihan makanan dan minuman terbaik dari seluruh Indonesia. Sebagai 
                katalog kuliner komprehensif, kami menyediakan akses mudah ke ratusan menu berkualitas.
              </Text>
              
              <Text style={styles.storyText}>
                Saat ini, Jajanin telah menjadi platform kuliner terpercaya yang menyediakan 
                pengalaman berbelanja kuliner terbaik dengan sistem pemesanan yang mudah dan aman.
              </Text>
            </View>
          </View>
        </View>

        {/* Our Vision & Mission */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visi & Misi</Text>
          <View style={styles.visionMissionContainer}>
            <View style={styles.visionContainer}>
              <Text style={styles.subSectionTitle}>Visi</Text>
              <Text style={styles.visionMissionText}>
                Menjadi platform kuliner terdepan dan terpercaya di Indonesia yang menghubungkan penikmat 
                kuliner dengan beragam pilihan makanan dan minuman berkualitas.
              </Text>
            </View>
            
            <View style={styles.missionContainer}>
              <Text style={styles.subSectionTitle}>Misi</Text>
              <View style={styles.missionList}>
                <Text style={styles.missionItem}>• Menyediakan akses mudah ke berbagai pilihan kuliner berkualitas tinggi</Text>
                <Text style={styles.missionItem}>• Mendukung dan mempromosikan UMKM kuliner lokal di seluruh Indonesia</Text>
                <Text style={styles.missionItem}>• Memberikan pengalaman berbelanja yang aman, nyaman, dan memuaskan</Text>
                <Text style={styles.missionItem}>• Terus berinovasi dalam teknologi dan layanan untuk memenuhi kebutuhan pelanggan</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Our Values */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nilai-Nilai Kami</Text>
          <View style={styles.valuesGrid}>
            {values.map((value, index) => (
              <View key={index} style={styles.valueCard}>
                <Ionicons style={styles.icons} name={value.icon}></Ionicons>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            ))}
          </View>
        </View>


        {/* Call to action */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Jelajahi Jajanin Sekarang</Text>
          <Text style={styles.ctaText}>
            Temukan beragam pilihan kuliner terbaik untuk memuaskan selera Anda. 
            Nikmati kemudahan berbelanja dan pengalaman kuliner yang tak terlupakan.
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push("/(client)/home")}
          >
            <Text style={styles.ctaButtonText}>Mulai Menjelajah</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerTop}>
            {/* Kolom 1 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Jajanin</Text>
              <Text style={styles.footerText}>
                Katalog kuliner terlengkap di Indonesia dengan berbagai pilihan makanan dan minuman berkualitas.
              </Text>
            </View>

            {/* Kolom 2 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Informasi</Text>
              <TouchableOpacity onPress={() => router.push("/(client)/about")}>
                <Text style={styles.footerLink}>Tentang Kami</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(client)/contact")}>
                <Text style={styles.footerLink}>Kontak Kami</Text>
              </TouchableOpacity>
            </View>

            {/* Kolom 3 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Ikuti Kami</Text>
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialButton} onPress={handleInsta}>
                <Ionicons style={styles.iconss} name="logo-instagram"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleLinkedin}>
                <Ionicons style={styles.iconss} name="logo-linkedin"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleFacebook}>
                <Ionicons style={styles.iconss} name="logo-facebook"></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleGithub}>
                <Ionicons style={styles.iconss} name="logo-github"></Ionicons>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>© 2025 Jajanin. Hak Cipta Dilindungi.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#4CAF50",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  icons: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 12,
    textAlign: "center",
  },
  iconss: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    opacity: 0.9,
  },
  section: {
    padding: 24,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  storyContainer: {
    flexDirection: windowWidth > 768 ? "row" : "column",
    alignItems: "center",
  },
  storyContent: {
    flex: 1,
  },
  storyText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 16,
    textAlign: "justify",
  },
  visionMissionContainer: {
    marginVertical: 20,
  },
  visionContainer: {
    marginBottom: 30,
  },
  missionContainer: {
    marginBottom: 20,
  },
  subSectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  visionMissionText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  missionList: {
    marginTop: 10,
  },
  missionItem: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 8,
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  valueCard: {
    width: windowWidth > 768 ? "23%" : windowWidth > 500 ? "48%" : "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  valueIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0e0e0",
    marginBottom: 16,
  },
  valueTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  valueDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16, 
    marginTop: 24,
  },
  serviceCard: {
    width: windowWidth > 768 ? "48%" : "100%",
    backgroundColor: "#ffffff", 
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, 
  },
  serviceIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1E90FF", 
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 15,
    color: "#555",
    flexShrink: 1, 
  },
  
  ctaSection: {
    padding: 40,
    backgroundColor: "#f0f8ff",
    alignItems: "center",
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  ctaText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 24,
    maxWidth: 600,
  },
  ctaButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "#333",
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: 'auto',
  },
  footerCol: {
    width: windowWidth > 768 ? "30%" : "48%",
    marginBottom: 20,
  },
  footerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  footerColTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 10,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  copyright: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
  },
});