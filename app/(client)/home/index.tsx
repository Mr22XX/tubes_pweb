import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image, Linking } from "react-native";
import Navbar from "../../../components/Navbar";
import { router } from "expo-router";
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;

export default function Home() {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [promo, setPromo] = useState<Promo[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Menyimpan status login
  const [userName, setUserName] = useState<string>(''); // Menyimpan nama pengguna


  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const storedUserName = await AsyncStorage.getItem("userName"); // Ambil nama pengguna
      const storedUserId = await AsyncStorage.getItem("userId"); // Ambil nama pengguna
      if (userToken && storedUserName && storedUserId) {
        setIsLoggedIn(true); // Pengguna sudah login
        setUserName(storedUserName); // Set nama pengguna
        setUserId(storedUserId); // Set nama pengguna
      } else {
        setIsLoggedIn(false); // Pengguna belum login
        router.push("/login"); // Arahkan ke halaman login jika belum login
      }
    } catch (error) {
      console.error("Error checking login status", error);
    }
  };

  const fetchProduk = async () => {
    const response = await fetch("http://localhost:3000/produk/limit/4", {
      method: "GET",
    });
    const responseJson = (await response.json()) as Produk[];
    setProduk(responseJson);
  };

  useEffect(() => {
    checkLoginStatus(); // Cek status login saat komponen pertama kali di-render
    fetchProduk(); // Ambil produk
  }, []);
  
  const fetchPromo = async () => {
    const response = await fetch("http://localhost:3000/promo", {
      method: "GET",
    });
    const responseJson = (await response.json()) as Promo[];
    setPromo(responseJson);
  };

  useEffect(() => {
    checkLoginStatus(); // Cek status login saat komponen pertama kali di-render
    fetchPromo(); // Ambil produk
  }, []);

  // Color promosi
  const colorPromo = [
    { color: "#FFD700" },  // Gold
    { color: "#FF7F50" },  // Coral
    { color: "#87CEEB" },  // SkyBlue
    { color: "#32CD32" },  // LimeGreen
    { color: "#FF4500" },  // OrangeRed
    { color: "#8A2BE2" },  // BlueViolet
    { color: "#FF1493" },  // DeepPink
    { color: "#00BFFF" },  // DeepSkyBlue
    { color: "#F0E68C" },  // Khaki
    { color: "#48D1CC" },  // MediumTurquoise
    { color: "#FFD700" },  // Gold (repeated, useful for promo highlights)
    { color: "#D2691E" },  // Chocolate
    { color: "#7FFF00" },  // Chartreuse
    { color: "#FF6347" },  // Tomato
    { color: "#00FA9A" },  // MediumSpringGreen
  ];

  // Bagian tentang website
  const aboutSections = [
    {
      title: "Pilihan Kuliner Terbaik",
      description:
        "RayTalog menyediakan berbagai pilihan kuliner terbaik dari seluruh Indonesia dengan kualitas terjamin dan harga bersaing.",
    },
    {
      title: "Pengiriman Cepat",
      description:
        "Kami menjamin pengiriman cepat dan aman untuk semua produk kuliner yang Anda pesan.",
    },
    {
      title: "Pembayaran Aman",
      description:
        "Berbagai metode pembayaran yang aman dan terpercaya tersedia untuk kenyamanan Anda.",
    },
  ];

  if (!isLoggedIn) {
    return null; // Menunggu status login sebelum merender halaman Home
  }

   const handleInsta = () => {
      Linking.openURL('https://instagram.com');
    }

    const handleLinkedin = () => {
      Linking.openURL('https://linkedin.com');
    }

    const handleFacebook = () => {
      Linking.openURL('https://facebook.com');
    }

    const handleGithub = () => {
      Linking.openURL('https://github.com');
    }

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Selamat Datang di Jajanin, {userName || "Pengguna"} !</Text>
          <Text style={styles.welcomeSubtext}>
            Temukan kuliner terbaik untuk memuaskan selera Anda
          </Text>
        </View>

        {/* Promotional Banner Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Promo Spesial</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoContainer}
          >
            {promo.map((promo, index) => (
              <TouchableOpacity
                key={promo.id}
                style={[styles.promoBanner, { backgroundColor: colorPromo[index % colorPromo.length].color }]}
              >
              <Link href={`/promo/${promo.id}`} >
                <View style={styles.promoContent}>
                  <Text style={styles.promoTitle}>{promo.title}</Text>
                  <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                  <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Lihat Detail</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.promoImageContainer}>
                  <View
                    style={[styles.promoImagePlaceholder, { backgroundColor: `${promo.color}99` }]}
                  />
                </View>
                </Link>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Produk Pilihan</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText} onPress={() => router.push("/product")}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {produk.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
              <Link href={`/detail/${product.id}`} >
                <View style={styles.productImageContainer}>
                  <View style={styles.productImagePlaceholder}>
                    <Image
                      source={{ uri: product.gambar }}
                      style={styles.productImagePlaceholder}
                    />
                  </View>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.nama}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                      Rp {product.harga.toLocaleString()}
                    </Text>
                  </View>
                </View>
                </Link>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Website Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Tentang Jajanin</Text>
          <Text style={styles.aboutDescription}>
            Jajanin adalah platform kuliner online yang menyediakan berbagai
            pilihan makanan dan minuman berkualitas dari seluruh Indonesia. Kami
            berkomitmen untuk memberikan pengalaman belanja yang terbaik dengan
            produk kuliner terjamin dan layanan pelanggan yang prima.
          </Text>

          <View style={styles.featuresContainer}>
            {aboutSections.map((section, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureTitle}>{section.title}</Text>
                <Text style={styles.featureDescription}>{section.description}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => router.push("/(client)/about")}
          >
            <Text style={styles.learnMoreText}>Pelajari Lebih Lanjut</Text>
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
    backgroundColor: "#f9f9f9",
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
  welcomeSection: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeSubtext: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  sectionContainer: {
    padding: 16,
    marginVertical: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  viewAllText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "600",
  },
  promoContainer: {
    paddingBottom: 10,
  },
  promoBanner: {
    width: windowWidth * 0.85,
    maxWidth: 400,
    height: 180,
    marginRight: 16,
    borderRadius: 12,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoContent: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  promoSubtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  promoButtonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 12,
  },
  promoImageContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  promoImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width:
      windowWidth > 500
        ? (windowWidth - 64) / 4 - 12
        : (windowWidth - 48) / 2 - 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    height: 140,
    width: "100%",
    position: "relative",
  },
  productImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  aboutSection: {
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
    marginTop: 16,
  },
  aboutDescription: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
    marginBottom: 24,
  },
  featuresContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  featureItem: {
    width: windowWidth > 600 ? "30%" : "100%",
    marginBottom: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  learnMoreButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  learnMoreText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  footer: {
    backgroundColor: "#333",
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: "auto",
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
    backgroundColor: "#444",
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
