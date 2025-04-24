import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navbarContent}>
            <Text style={styles.logo}>CatalogApp</Text>

            {/* Navigation Items */}
            <View style={styles.navItems}>
              <TouchableOpacity
                style={[styles.navItem, styles.activeNavItem]}
                onPress={() => router.push("/(client)/home")}
              >
                <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/about")}
              >
                <Text style={styles.navText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/product")}
              >
                <Text style={styles.navText}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/contact")}
              >
                <Text style={styles.navText}>Contact</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(auth)/login")}
              >
                <Text style={styles.navText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Area */}
        <ScrollView style={styles.content}>
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroTitle}>Selamat Datang di Katalog Kami</Text>
            <Text style={styles.heroSubtitle}>
              Temukan produk luar biasa untuk kebutuhan Anda
            </Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Belanja Sekarang</Text>
            </TouchableOpacity>
          </View>

          {/* Featured Products Section */}
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Produk Unggulan</Text>
            <View style={styles.productsGrid}>
              {[1, 2, 3, 4].map((item) => (
                <View key={item} style={styles.productCard}>
                  <View style={styles.productImage} />
                  <Text style={styles.productTitle}>Produk {item}</Text>
                  <Text style={styles.productDescription}>
                    Deskripsi singkat tentang produk luar biasa ini.
                  </Text>
                  <Text style={styles.productPrice}>Rp 99.999</Text>
                  <TouchableOpacity style={styles.productButton}>
                    <Text style={styles.productButtonText}>Lihat Detail</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Categories Section */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>
              Belanja Berdasarkan Kategori
            </Text>
            <View style={styles.categoriesGrid}>
              {["Elektronik", "Fashion", "Rumah", "Kecantikan"].map(
                (category) => (
                  <TouchableOpacity key={category} style={styles.categoryCard}>
                    <View style={styles.categoryImage} />
                    <Text style={styles.categoryTitle}>{category}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Tentang RayTalog</Text>
            <Text style={styles.aboutText}>
              RayTalog adalah platform katalog digital yang menyediakan beragam
              produk berkualitas tinggi untuk memenuhi berbagai kebutuhan Anda.
              Kami berkomitmen untuk memberikan pengalaman berbelanja yang
              mudah, cepat, dan terpercaya.
            </Text>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>RayTalog</Text>
              <Text style={styles.footerText}>
                Satu tempat untuk produk berkualitas Anda
              </Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Tautan Cepat</Text>
              <Text style={styles.footerLink}>Beranda</Text>
              <Text style={styles.footerLink}>Tentang</Text>
              <Text style={styles.footerLink}>Produk</Text>
              <Text style={styles.footerLink}>Kontak</Text>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Hubungi Kami</Text>
              <Text style={styles.footerText}>support@catalogapp.com</Text>
              <Text style={styles.footerText}>+1 (555) 123-4567</Text>
            </View>
          </View>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2025 CatalogApp. Hak cipta dilindungi.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  navbar: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1000,
  },
  navbarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  navItems: {
    flexDirection: "row",
  },
  navItem: {
    marginLeft: 30,
    paddingVertical: 5,
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  activeNavText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  hero: {
    backgroundColor: "#007BFF",
    padding: 60,
    alignItems: "center",
    marginBottom: 30,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  heroButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 30,
  },
  heroButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  featuredSection: {
    padding: 30,
    marginBottom: 30,
    maxWidth: 1200,
    marginHorizontal: "auto",
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    marginBottom: 30,
    width: "23%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    height: 180,
    backgroundColor: "#eee",
    borderRadius: 8,
    marginBottom: 15,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    color: "#007BFF",
    fontWeight: "bold",
    marginBottom: 15,
  },
  productButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  productButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  categoriesSection: {
    padding: 30,
    marginBottom: 30,
    backgroundColor: "#f0f8ff",
  },
  categoriesGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    maxWidth: 1000,
    marginHorizontal: "auto",
  },
  categoryCard: {
    width: "22%",
    marginBottom: 15,
    alignItems: "center",
  },
  categoryImage: {
    width: 150,
    height: 150,
    backgroundColor: "#ddd",
    borderRadius: 75,
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  aboutSection: {
    backgroundColor: "#333",
    padding: 50,
    alignItems: "center",
    marginBottom: 30,
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  aboutText: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 25,
    textAlign: "center",
    maxWidth: 600,
  },
  emailInput: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  subscribeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#222",
    padding: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: 1200,
    marginHorizontal: "auto",
  },
  footerSection: {
    width: "30%",
  },
  footerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  footerSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
  },
  footerLink: {
    fontSize: 14,
    color: "#7fb5ff",
    marginBottom: 10,
  },
  copyright: {
    backgroundColor: "#111",
    padding: 20,
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 14,
    color: "#777",
  },
});
