import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

// Sample data structure (this would come from your database)
const sampleCategories = [
  { id: "1", name: "Elektronik", imageUrl: "https://via.placeholder.com/150" },
  { id: "2", name: "Fashion", imageUrl: "https://via.placeholder.com/150" },
  { id: "3", name: "Rumah", imageUrl: "https://via.placeholder.com/150" },
  { id: "4", name: "Kecantikan", imageUrl: "https://via.placeholder.com/150" },
  { id: "5", name: "Olahraga", imageUrl: "https://via.placeholder.com/150" },
  { id: "6", name: "Kesehatan", imageUrl: "https://via.placeholder.com/150" },
];

const sampleFeaturedProducts = [
  {
    id: "1",
    name: "Smartphone Premium",
    description:
      "Smartphone canggih dengan kamera 64MP dan baterai tahan lama.",
    price: 4999000,
    imageUrl: "https://via.placeholder.com/300",
    discount: 15,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Laptop Ultrabook",
    description: "Laptop tipis dan ringan dengan performa terbaik di kelasnya.",
    price: 12500000,
    imageUrl: "https://via.placeholder.com/300",
    discount: 10,
    rating: 4.7,
  },
  {
    id: "3",
    name: "Jaket Kulit Premium",
    description: "Jaket kulit asli dengan desain modern dan elegan.",
    price: 1750000,
    imageUrl: "https://via.placeholder.com/300",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Blender Multifungsi",
    description: "Blender dengan 5 mata pisau untuk berbagai kebutuhan dapur.",
    price: 899000,
    imageUrl: "https://via.placeholder.com/300",
    discount: 20,
    rating: 4.6,
  },
];

const sampleBanners = [
  {
    id: "1",
    title: "DISKON AKHIR PEKAN",
    subtitle: "Dapatkan diskon hingga 50% untuk semua produk fashion",
    imageUrl: "https://via.placeholder.com/1200x400",
    color: "#FF6347",
  },
  {
    id: "2",
    title: "ELEKTRONIK BARU",
    subtitle: "Temukan koleksi terbaru gadget premium",
    imageUrl: "https://via.placeholder.com/1200x400",
    color: "#4169E1",
  },
  {
    id: "3",
    title: "GRATIS ONGKIR",
    subtitle: "Untuk semua pembelian di atas Rp 500.000",
    imageUrl: "https://via.placeholder.com/1200x400",
    color: "#32CD32",
  },
];

const sampleNewArrivals = [
  {
    id: "5",
    name: "Smart Watch Series 5",
    description: "Pantau kesehatan dan aktivitas harian Anda dengan mudah.",
    price: 2499000,
    imageUrl: "https://via.placeholder.com/300",
    isNew: true,
    rating: 4.5,
  },
  {
    id: "6",
    name: "Wireless Earbuds",
    description: "Kualitas suara premium dengan baterai tahan lama.",
    price: 1299000,
    imageUrl: "https://via.placeholder.com/300",
    isNew: true,
    rating: 4.6,
  },
  {
    id: "7",
    name: "Air Purifier",
    description: "Udara bersih dan segar untuk rumah Anda.",
    price: 3200000,
    imageUrl: "https://via.placeholder.com/300",
    isNew: true,
    rating: 4.7,
  },
  {
    id: "8",
    name: "Coffee Maker",
    description: "Nikmati kopi berkualitas cafe di rumah Anda.",
    price: 1850000,
    imageUrl: "https://via.placeholder.com/300",
    isNew: true,
    discount: 15,
    rating: 4.8,
  },
];

const sampleBrands = [
  { id: "1", name: "Sony", logoUrl: "https://via.placeholder.com/150" },
  { id: "2", name: "Samsung", logoUrl: "https://via.placeholder.com/150" },
  { id: "3", name: "Apple", logoUrl: "https://via.placeholder.com/150" },
  { id: "4", name: "Nike", logoUrl: "https://via.placeholder.com/150" },
  { id: "5", name: "Adidas", logoUrl: "https://via.placeholder.com/150" },
  { id: "6", name: "LG", logoUrl: "https://via.placeholder.com/150" },
];

const sampleTestimonials = [
  {
    id: "1",
    name: "Budi Santoso",
    comment:
      "Produk berkualitas tinggi dan pengiriman cepat! Saya sangat puas dengan layanan mereka.",
    rating: 5,
    avatarUrl: "https://via.placeholder.com/80",
    date: "15 April 2025",
  },
  {
    id: "2",
    name: "Siti Rahmawati",
    comment:
      "Harga terjangkau dan kualitas produk melebihi ekspektasi saya. Pasti akan belanja di sini lagi.",
    rating: 4,
    avatarUrl: "https://via.placeholder.com/80",
    date: "10 April 2025",
  },
  {
    id: "3",
    name: "Agus Widodo",
    comment:
      "Responsif dalam menangani keluhan pelanggan. Customer service sangat membantu.",
    rating: 5,
    avatarUrl: "https://via.placeholder.com/80",
    date: "5 April 2025",
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  // Simulate data loading from database
  useEffect(() => {
    // This would be replaced with actual API calls to your database
    const loadData = async () => {
      try {
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setIsLoading(false);
      }
    };

    loadData();

    // Banner auto-rotation
    const bannerInterval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % sampleBanners.length);
    }, 5000);

    return () => clearInterval(bannerInterval);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/(client)/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      // This would send the email to your database/API
      console.log("Subscribing email:", email);
      setSubscribeSuccess(true);
      setEmail("");
      setTimeout(() => setSubscribeSuccess(false), 3000);
    }
  };

  const formatPrice = (price) => {
    return "Rp " + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * discount) / 100;
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Text key={i} style={styles.starFilled}>
            ★
          </Text>
        );
      } else if (i === fullStars && halfStar) {
        stars.push(
          <Text key={i} style={styles.starHalf}>
            ★
          </Text>
        );
      } else {
        stars.push(
          <Text key={i} style={styles.starEmpty}>
            ☆
          </Text>
        );
      }
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>({rating})</Text>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Memuat Katalog...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <View style={styles.navbarContent}>
            <View style={styles.logoSection}>
              <Text style={styles.logo}>RayTalog</Text>
            </View>

            {/* Navigation Items */}
            <View style={styles.navItems}>
              <TouchableOpacity
                style={[styles.navItem, styles.activeNavItem]}
                onPress={() => router.push("/(client)/home")}
              >
                <Text style={[styles.navText, styles.activeNavText]}>
                  Beranda
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/about")}
              >
                <Text style={styles.navText}>Tentang</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/product")}
              >
                <Text style={styles.navText}>Produk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => router.push("/(client)/contact")}
              >
                <Text style={styles.navText}>Kontak</Text>
              </TouchableOpacity>
              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => router.push("/(auth)/login")}
              >
                <Text style={styles.loginButtonText}>Masuk</Text>
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari produk..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>Cari</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Content Area */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Banner Section */}
          <View style={styles.bannerSection}>
            <Image
              source={{ uri: sampleBanners[currentBannerIndex].imageUrl }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <View
              style={[
                styles.bannerOverlay,
                {
                  backgroundColor: `${sampleBanners[currentBannerIndex].color}80`,
                },
              ]}
            >
              <Text style={styles.bannerTitle}>
                {sampleBanners[currentBannerIndex].title}
              </Text>
              <Text style={styles.bannerSubtitle}>
                {sampleBanners[currentBannerIndex].subtitle}
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Belanja Sekarang</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bannerIndicators}>
              {sampleBanners.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.bannerIndicator,
                    currentBannerIndex === index &&
                      styles.activeBannerIndicator,
                  ]}
                  onPress={() => setCurrentBannerIndex(index)}
                />
              ))}
            </View>
          </View>

          {/* Category Section */}
          <View style={styles.categorySection}>
            <Text style={styles.sectionTitle}>Jelajahi Kategori</Text>
            <View style={styles.categoryGrid}>
              {sampleCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() =>
                    router.push(`/(client)/category/${category.id}`)
                  }
                >
                  <Image
                    source={{ uri: category.imageUrl }}
                    style={styles.categoryImage}
                  />
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Products Section */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produk Unggulan</Text>
              <TouchableOpacity
                onPress={() => router.push("/(client)/product?featured=true")}
              >
                <Text style={styles.seeAllText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productsGrid}>
              {sampleFeaturedProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => router.push(`/(client)/product/${product.id}`)}
                >
                  <View style={styles.productImageContainer}>
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.productImage}
                    />
                    {product.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {product.discount}% OFF
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.productTitle} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.productDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                  {renderRatingStars(product.rating)}
                  <View style={styles.priceContainer}>
                    {product.discount ? (
                      <>
                        <Text style={styles.originalPrice}>
                          {formatPrice(product.price)}
                        </Text>
                        <Text style={styles.discountedPrice}>
                          {formatPrice(
                            calculateDiscountedPrice(
                              product.price,
                              product.discount
                            )
                          )}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.productPrice}>
                        {formatPrice(product.price)}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity style={styles.productButton}>
                    <Text style={styles.productButtonText}>Lihat Detail</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* New Arrivals Section */}
          <View style={styles.newArrivalsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Produk Terbaru</Text>
              <TouchableOpacity
                onPress={() => router.push("/(client)/product?new=true")}
              >
                <Text style={styles.seeAllText}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.newArrivalsScroll}
            >
              {sampleNewArrivals.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.newArrivalCard}
                  onPress={() => router.push(`/(client)/product/${product.id}`)}
                >
                  <View style={styles.newArrivalImageContainer}>
                    <Image
                      source={{ uri: product.imageUrl }}
                      style={styles.newArrivalImage}
                    />
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>NEW</Text>
                    </View>
                    {product.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {product.discount}% OFF
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.newArrivalTitle} numberOfLines={2}>
                    {product.name}
                  </Text>
                  <Text style={styles.newArrivalDescription} numberOfLines={2}>
                    {product.description}
                  </Text>
                  {renderRatingStars(product.rating)}
                  <View style={styles.priceContainer}>
                    {product.discount ? (
                      <>
                        <Text style={styles.originalPrice}>
                          {formatPrice(product.price)}
                        </Text>
                        <Text style={styles.discountedPrice}>
                          {formatPrice(
                            calculateDiscountedPrice(
                              product.price,
                              product.discount
                            )
                          )}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.productPrice}>
                        {formatPrice(product.price)}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Featured Brands Section */}
          <View style={styles.brandsSection}>
            <Text style={styles.sectionTitle}>Merek Terpopuler</Text>
            <View style={styles.brandsGrid}>
              {sampleBrands.map((brand) => (
                <TouchableOpacity
                  key={brand.id}
                  style={styles.brandCard}
                  onPress={() => router.push(`/(client)/brand/${brand.id}`)}
                >
                  <Image
                    source={{ uri: brand.logoUrl }}
                    style={styles.brandLogo}
                  />
                  <Text style={styles.brandName}>{brand.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Benefits Section */}
          <View style={styles.benefitsSection}>
            <View style={styles.benefitCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitTitle}>Pengiriman Cepat</Text>
              <Text style={styles.benefitDescription}>
                Barang sampai dalam 1-3 hari kerja
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitTitle}>100% Asli</Text>
              <Text style={styles.benefitDescription}>
                Produk dijamin original atau uang kembali
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitTitle}>Dukungan 24/7</Text>
              <Text style={styles.benefitDescription}>
                Layanan pelanggan siap membantu kapanpun
              </Text>
            </View>
            <View style={styles.benefitCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={styles.benefitIcon}
              />
              <Text style={styles.benefitTitle}>Pembayaran Aman</Text>
              <Text style={styles.benefitDescription}>
                Transaksi dijamin aman dan terpercaya
              </Text>
            </View>
          </View>

          {/* Testimonials Section */}
          <View style={styles.testimonialsSection}>
            <Text style={styles.sectionTitle}>Apa Kata Pelanggan</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.testimonialScroll}
            >
              {sampleTestimonials.map((testimonial) => (
                <View key={testimonial.id} style={styles.testimonialCard}>
                  <View style={styles.testimonialHeader}>
                    <Image
                      source={{ uri: testimonial.avatarUrl }}
                      style={styles.testimonialAvatar}
                    />
                    <View style={styles.testimonialInfo}>
                      <Text style={styles.testimonialName}>
                        {testimonial.name}
                      </Text>
                      <Text style={styles.testimonialDate}>
                        {testimonial.date}
                      </Text>
                      {renderRatingStars(testimonial.rating)}
                    </View>
                  </View>
                  <Text style={styles.testimonialComment}>
                    "{testimonial.comment}"
                  </Text>
                </View>
              ))}
            </ScrollView>
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
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => router.push("/(client)/about")}
            >
              <Text style={styles.learnMoreButtonText}>
                Pelajari Lebih Lanjut
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerSection}>
              <Text style={styles.footerTitle}>RayTalog</Text>
              <Text style={styles.footerText}>
                Satu tempat untuk produk berkualitas Anda
              </Text>
              <View style={styles.socialLinks}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>𝕏</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialIconText}>ig</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Tautan Cepat</Text>
              <TouchableOpacity onPress={() => router.push("/(client)/home")}>
                <Text style={styles.footerLink}>Beranda</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(client)/about")}>
                <Text style={styles.footerLink}>Tentang</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(client)/product")}
              >
                <Text style={styles.footerLink}>Produk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/(client)/contact")}
              >
                <Text style={styles.footerLink}>Kontak</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Kategori</Text>
              {sampleCategories.slice(0, 4).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  onPress={() =>
                    router.push(`/(client)/category/${category.id}`)
                  }
                >
                  <Text style={styles.footerLink}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.footerSection}>
              <Text style={styles.footerSectionTitle}>Hubungi Kami</Text>
              <Text style={styles.footerText}>support@raytaLog.com</Text>
              <Text style={styles.footerText}>+62 855 1234 5678</Text>
              <Text style={styles.footerText}>
                Jl. Pahlawan No. 123, Jakarta Selatan, Indonesia
              </Text>
            </View>
          </View>
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>
              © 2025 RayTalog. Hak cipta dilindungi.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
  },
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
    flexWrap: "wrap",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 15,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
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
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  searchInput: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 180,
    fontSize: 14,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  bannerSection: {
    position: "relative",
    height: 400,
    marginBottom: 40,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bannerTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  bannerSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    maxWidth: 600,
  },
  bannerButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  bannerButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  bannerIndicators: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  bannerIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 5,
  },
  activeBannerIndicator: {
    backgroundColor: "#fff",
  },
  categorySection: {
    paddingHorizontal: 50,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "16%",
    marginBottom: 20,
    alignItems: "center",
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  featuredSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAllText: {
    color: "#007BFF",
    fontSize: 16,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "23%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF4500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    height: 40,
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    height: 40,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  starFilled: {
    color: "#FFD700",
    fontSize: 14,
    marginRight: 2,
  },
  starHalf: {
    color: "#FFD700",
    fontSize: 14,
    marginRight: 2,
  },
  starEmpty: {
    color: "#D3D3D3",
    fontSize: 14,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    flexWrap: "wrap",
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  productButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  productButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  newArrivalsSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
  },
  newArrivalsScroll: {
    paddingVertical: 10,
  },
  newArrivalCard: {
    width: 280,
    marginRight: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  newArrivalImageContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  newArrivalImage: {
    width: "100%",
    height: "100%",
  },
  newBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#28a745",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  newArrivalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    height: 40,
  },
  newArrivalDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    height: 40,
  },
  brandsSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
    backgroundColor: "#f8f9fa",
    paddingVertical: 30,
  },
  brandsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  brandCard: {
    width: "16%",
    alignItems: "center",
    marginBottom: 20,
  },
  brandLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  brandName: {
    fontSize: 16,
    textAlign: "center",
  },
  benefitsSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  benefitCard: {
    width: "24%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  benefitIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  benefitDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  testimonialsSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
    backgroundColor: "#f0f8ff",
    paddingVertical: 30,
  },
  testimonialScroll: {
    paddingVertical: 10,
  },
  testimonialCard: {
    width: 350,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  testimonialHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  testimonialAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  testimonialInfo: {
    justifyContent: "center",
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
  },
  testimonialDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  testimonialComment: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#444",
    lineHeight: 20,
  },
  emailInput: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    fontSize: 16,
  },
  aboutSection: {
    paddingHorizontal: 50,
    marginBottom: 40,
    alignItems: "center",
  },
  aboutTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  aboutText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
    maxWidth: 800,
    lineHeight: 24,
  },
  learnMoreButton: {
    borderColor: "#007BFF",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  learnMoreButtonText: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    backgroundColor: "#333",
    paddingHorizontal: 50,
    paddingTop: 50,
    paddingBottom: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  footerSection: {
    width: "23%",
    marginBottom: 20,
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
    marginBottom: 10,
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#7fb5ff",
    marginBottom: 12,
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 15,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  copyright: {
    backgroundColor: "#222",
    paddingVertical: 20,
    alignItems: "center",
  },
  copyrightText: {
    fontSize: 14,
    color: "#777",
  },
  // Responsive styles for different screen sizes
  "@media (max-width: 1200px)": {
    navbarContent: {
      paddingHorizontal: 30,
    },
    categorySection: {
      paddingHorizontal: 30,
    },
    featuredSection: {
      paddingHorizontal: 30,
    },
    newArrivalsSection: {
      paddingHorizontal: 30,
    },
    brandsSection: {
      paddingHorizontal: 30,
    },
    benefitsSection: {
      paddingHorizontal: 30,
    },
    testimonialsSection: {
      paddingHorizontal: 30,
    },
    newsletterSection: {
      paddingHorizontal: 30,
    },
    aboutSection: {
      paddingHorizontal: 30,
    },
    footer: {
      paddingHorizontal: 30,
    },
    productCard: {
      width: "31%",
    },
    categoryCard: {
      width: "31%",
    },
    brandCard: {
      width: "31%",
    },
    benefitCard: {
      width: "48%",
      marginBottom: 20,
    },
    footerSection: {
      width: "48%",
    },
  },
  "@media (max-width: 768px)": {
    navbarContent: {
      paddingHorizontal: 20,
      flexDirection: "column",
      alignItems: "center",
    },
    loginButton: {
      marginLeft: 0,
      marginTop: 15,
      width: "100%",
      maxWidth: 300,
      alignItems: "center",
      paddingVertical: 10,
    },
    logoSection: {
      marginBottom: 15,
    },
    navItems: {
      marginBottom: 15,
    },
    searchContainer: {
      width: "100%",
      maxWidth: 300,
    },
    categorySection: {
      paddingHorizontal: 20,
    },
    featuredSection: {
      paddingHorizontal: 20,
    },
    brandsSection: {
      paddingHorizontal: 20,
    },
    benefitsSection: {
      paddingHorizontal: 20,
    },
    testimonialsSection: {
      paddingHorizontal: 20,
    },
    newsletterSection: {
      paddingHorizontal: 20,
    },
    aboutSection: {
      paddingHorizontal: 20,
    },
    footer: {
      paddingHorizontal: 20,
    },
    bannerTitle: {
      fontSize: 28,
    },
    bannerSubtitle: {
      fontSize: 16,
    },
    productCard: {
      width: "48%",
    },
    categoryCard: {
      width: "48%",
    },
    brandCard: {
      width: "48%",
    },
    benefitCard: {
      width: "100%",
      marginBottom: 15,
    },
    footerSection: {
      width: "100%",
      marginBottom: 25,
    },
  },
  "@media (max-width: 480px)": {
    navbarContent: {
      paddingHorizontal: 15,
    },
    navItem: {
      marginLeft: 15,
    },
    categorySection: {
      paddingHorizontal: 15,
    },
    featuredSection: {
      paddingHorizontal: 15,
    },
    newArrivalsSection: {
      paddingHorizontal: 15,
    },
    brandsSection: {
      paddingHorizontal: 15,
    },
    benefitsSection: {
      paddingHorizontal: 15,
    },
    testimonialsSection: {
      paddingHorizontal: 15,
    },
    aboutSection: {
      paddingHorizontal: 15,
    },
    footer: {
      paddingHorizontal: 15,
    },
    bannerTitle: {
      fontSize: 24,
    },
    bannerSubtitle: {
      fontSize: 14,
    },
    productCard: {
      width: "100%",
    },
    categoryCard: {
      width: "100%",
    },
    brandCard: {
      width: "100%",
    },
  },
});
