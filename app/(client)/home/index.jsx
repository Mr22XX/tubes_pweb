// app/(client)/home/index.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Navbar from "../../../components/Navbar";
import { router } from "expo-router";

const windowWidth = Dimensions.get("window").width;

export default function Home() {
  // Promotional banners data
  const promoData = [
    {
      id: 1,
      title: "Menu Spesial Ramadhan",
      subtitle: "Diskon hingga 30% untuk semua menu takjil",
      color: "#FFD700",
    },
    {
      id: 2,
      title: "Paket Buka Puasa",
      subtitle: "Mulai dari Rp 50.000",
      color: "#FF7F50",
    },
    {
      id: 3,
      title: "Promo Minuman Segar",
      subtitle: "Beli 1 Gratis 1 untuk Es Kopi",
      color: "#87CEEB",
    },
  ];

  // Featured products data - removed discount information
  const featuredProducts = [
    {
      id: 1,
      name: "Nasi Padang Komplit",
      price: 35000,
    },
    {
      id: 2,
      name: "Sate Ayam Madura",
      price: 25000,
    },
    {
      id: 3,
      name: "Es Teh Manis",
      price: 8000,
    },
    {
      id: 4,
      name: "Rendang Sapi",
      price: 45000,
    },
  ];

  // About website sections
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

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Selamat Datang di RayTalog!</Text>
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
            {promoData.map((promo) => (
              <TouchableOpacity
                key={promo.id}
                style={[styles.promoBanner, { backgroundColor: promo.color }]}
              >
                <View style={styles.promoContent}>
                  <Text style={styles.promoTitle}>{promo.title}</Text>
                  <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                  <TouchableOpacity style={styles.promoButton}>
                    <Text style={styles.promoButtonText}>Lihat Detail</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.promoImageContainer}>
                  <View
                    style={[
                      styles.promoImagePlaceholder,
                      { backgroundColor: `${promo.color}99` },
                    ]}
                  >
                    {/* Removed placeholder icon */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Produk Pilihan</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <TouchableOpacity key={product.id} style={styles.productCard}>
                <View style={styles.productImageContainer}>
                  <View style={styles.productImagePlaceholder}>
                    {/* Removed placeholder icon */}
                  </View>
                  {/* Removed discount badge */}
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>
                      Rp {product.price.toLocaleString()}
                    </Text>
                    {/* Removed discounted price */}
                  </View>
                  {/* Removed rating container */}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* About Website Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>Tentang RayTalog</Text>
          <Text style={styles.aboutDescription}>
            RayTalog adalah platform kuliner online yang menyediakan berbagai
            pilihan makanan dan minuman berkualitas dari seluruh Indonesia. Kami
            berkomitmen untuk memberikan pengalaman belanja yang terbaik dengan
            produk kuliner terjamin dan layanan pelanggan yang prima.
          </Text>

          <View style={styles.featuresContainer}>
            {aboutSections.map((section, index) => (
              <View key={index} style={styles.featureItem}>
                {/* Removed feature icon */}
                <Text style={styles.featureTitle}>{section.title}</Text>
                <Text style={styles.featureDescription}>
                  {section.description}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => navigation.navigate("/(client)/about")} 
          >
            <Text style={styles.learnMoreText}>Pelajari Lebih Lanjut</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerTop}>
            {/* Kolom 1 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>RayTalog</Text>
              <Text style={styles.footerText}>
                Katalog kuliner terlengkap di Indonesia dengan berbagai pilihan
                makanan dan minuman berkualitas.
              </Text>
            </View>

            {/* Kolom 2 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Informasi</Text>
              <TouchableOpacity onPress={() => router.push("/(client)/about")}>
                <Text style={styles.footerLink}>Tentang Kami</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(client)/contact")}
              >
                <Text style={styles.footerLink}>Kontak Kami</Text>
              </TouchableOpacity>
            </View>

            {/* Kolom 3 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Ikuti Kami</Text>
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialButton}>
                  {/* Removed social icons */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  {/* Removed social icons */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  {/* Removed social icons */}
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  {/* Removed social icons */}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>
              © 2025 RayTalog. Hak Cipta Dilindungi.
            </Text>
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
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  viewAllText: {
    color: "#007BFF",
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
    color: "#007BFF",
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
    backgroundColor: "#1E90FF",
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
