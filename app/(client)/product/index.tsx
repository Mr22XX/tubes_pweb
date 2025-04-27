// app/(client)/products/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Navbar from "../../../components/Navbar";

const windowWidth = Dimensions.get("window").width;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState({});
  const [sortOption, setSortOption] = useState("default");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy data for products
  const dummyProducts = [
    {
      id: 1,
      name: "Nasi Padang Komplit",
      price: 35000,
      discountedPrice: 30000,
      rating: 4.7,
      category: "makanan",
      description:
        "Nasi padang lengkap dengan rendang, gulai ayam, telur balado, dan sayur.",
      imageUrl: null, // Placeholder for image
      stock: 50,
      isWishlisted: false,
    },
    {
      id: 2,
      name: "Sate Ayam Madura",
      price: 25000,
      discountedPrice: null,
      rating: 4.5,
      category: "makanan",
      description:
        "Sate ayam bumbu kacang khas Madura, disajikan dengan lontong dan acar.",
      imageUrl: null,
      stock: 30,
      isWishlisted: false,
    },
    {
      id: 3,
      name: "Es Teh Manis",
      price: 8000,
      discountedPrice: 6000,
      rating: 4.2,
      category: "minuman",
      description: "Teh manis segar disajikan dengan es batu.",
      imageUrl: null,
      stock: 100,
      isWishlisted: false,
    },
    {
      id: 4,
      name: "Rendang Sapi",
      price: 45000,
      discountedPrice: null,
      rating: 4.9,
      category: "makanan",
      description:
        "Daging sapi yang dimasak dengan bumbu rendang khas Padang yang kaya rempah.",
      imageUrl: null,
      stock: 20,
      isWishlisted: false,
    },
    {
      id: 5,
      name: "Es Kopi Susu",
      price: 18000,
      discountedPrice: 15000,
      rating: 4.6,
      category: "minuman",
      description: "Kopi susu dengan es batu, gula aren, dan susu segar.",
      imageUrl: null,
      stock: 80,
      isWishlisted: false,
    },
    {
      id: 6,
      name: "Ayam Geprek",
      price: 20000,
      discountedPrice: null,
      rating: 4.4,
      category: "makanan",
      description: "Ayam goreng tepung yang digeprek dengan sambal pedas.",
      imageUrl: null,
      stock: 45,
      isWishlisted: false,
    },
    {
      id: 7,
      name: "Jus Alpukat",
      price: 15000,
      discountedPrice: 12000,
      rating: 4.5,
      category: "minuman",
      description: "Jus alpukat segar dengan susu kental manis.",
      imageUrl: null,
      stock: 25,
      isWishlisted: false,
    },
    {
      id: 8,
      name: "Mie Goreng Spesial",
      price: 22000,
      discountedPrice: null,
      rating: 4.3,
      category: "makanan",
      description:
        "Mie goreng dengan telur, ayam, sayuran, dan bumbu spesial.",
      imageUrl: null,
      stock: 40,
      isWishlisted: false,
    },
  ];

  // Categories
  const categories = [
    { id: "all", name: "Semua" },
    { id: "makanan", name: "Makanan" },
    { id: "minuman", name: "Minuman" },
  ];

  // Sort options
  const sortOptions = [
    { id: "default", name: "Default" },
    { id: "price-low", name: "Harga: Rendah ke Tinggi" },
    { id: "price-high", name: "Harga: Tinggi ke Rendah" },
    { id: "rating", name: "Rating Tertinggi" },
    { id: "name-asc", name: "Nama: A-Z" },
    { id: "name-desc", name: "Nama: Z-A" },
  ];

  // Function to handle search
  const handleSearch = (text) => {
    setSearchQuery(text);
    filterProducts(text, selectedCategory);
  };

  // Function to filter products based on search query and category
  const filterProducts = (query, category) => {
    let filtered = [...products];
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply current sort
    sortProducts(filtered, sortOption);
  };

  // Function to handle category selection
  const handleCategorySelect = (categoryId) => {
    const selected = categoryId === "all" ? null : categoryId;
    setSelectedCategory(selected);
    filterProducts(searchQuery, selected);
  };

  // Function to handle sorting
  const handleSort = (option) => {
    setSortOption(option);
    setShowSortOptions(false);
    sortProducts(filteredProducts, option);
  };

  // Function to sort products
  const sortProducts = (productsToSort, option) => {
    let sorted = [...productsToSort];
    
    switch (option) {
      case "price-low":
        sorted.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        sorted.sort((a, b) => {
          const aPrice = a.discountedPrice || a.price;
          const bPrice = b.discountedPrice || b.price;
          return bPrice - aPrice;
        });
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Default sorting (by id)
        sorted.sort((a, b) => a.id - b.id);
        break;
    }
    
    setFilteredProducts(sorted);
  };

  // Load products
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
      setLoading(false);
    }, 500);

    // Load wishlist from storage (in a real app)
    const savedWishlist = {};
    setWishlist(savedWishlist);
  }, []);

  // Effect to refilter when search or category changes
  useEffect(() => {
    if (products.length > 0) {
      filterProducts(searchQuery, selectedCategory);
    }
  }, [searchQuery, selectedCategory]);

  // Handle wishlist toggle
  const toggleWishlist = (productId) => {
    // Update wishlist state
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      newWishlist[productId] = !newWishlist[productId];
      // In a real app, save to storage here
      return newWishlist;
    });
    
    // Update isWishlisted in products array
    const updatedProducts = products.map(product => 
      product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
    );
    setProducts(updatedProducts);
    
    // Update isWishlisted in filtered products array
    const updatedFiltered = filteredProducts.map(product => 
      product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
    );
    setFilteredProducts(updatedFiltered);
  };

  // Navigate to product detail
  const goToProductDetail = (productId) => {
    router.push(`/(client)/products/${productId}`);
  };

  // Render sort options dropdown
  const renderSortOptions = () => {
    if (!showSortOptions) return null;
    
    return (
      <View style={styles.sortOptionsContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.sortOption}
            onPress={() => handleSort(option.id)}
          >
            <Text 
              style={sortOption === option.id ? styles.selectedSortText : styles.sortText}
            >
              {option.name}
            </Text>
            {sortOption === option.id && (
              <Ionicons name="checkmark" size={16} color="#007BFF" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Katalog Produk</Text>
        <Text style={styles.pageSubtitle}>
          Temukan berbagai pilihan produk kuliner terbaik
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                (!selectedCategory && category.id === "all") || selectedCategory === category.id 
                  ? styles.selectedCategoryChip 
                  : null,
              ]}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  (!selectedCategory && category.id === "all") || selectedCategory === category.id 
                    ? styles.selectedCategoryText 
                    : null,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.filterSortContainer}>
        <View style={styles.resultsCount}>
          <Text style={styles.resultsText}>
            {filteredProducts.length} produk ditemukan
          </Text>
        </View>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setShowSortOptions(!showSortOptions)}
        >
          <Ionicons name="funnel-outline" size={18} color="#333" />
          <Text style={styles.sortButtonText}>
            {sortOptions.find((opt) => opt.id === sortOption)?.name || "Urutkan"}
          </Text>
          <Ionicons
            name={showSortOptions ? "chevron-up" : "chevron-down"}
            size={16}
            color="#333"
            style={{ marginLeft: 4 }}
          />
        </TouchableOpacity>
      </View>

      {renderSortOptions()}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
          <Text style={styles.loadingText}>Memuat produk...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.productsContainer}>
          {filteredProducts.length > 0 ? (
            <View style={styles.productGrid}>
              {filteredProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => goToProductDetail(product.id)}
                >
                  <View style={styles.productImageContainer}>
                    <View style={styles.productImagePlaceholder}>
                      <Ionicons name="restaurant-outline" size={40} color="#ccc" />
                    </View>
                    {product.discountedPrice && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>
                          {Math.round(
                            ((product.price - product.discountedPrice) / product.price) * 100
                          )}
                          % OFF
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity
                      style={styles.wishlistButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                    >
                      <Ionicons
                        name={wishlist[product.id] || product.isWishlisted ? "heart" : "heart-outline"}
                        size={22}
                        color={wishlist[product.id] || product.isWishlisted ? "#FF6B6B" : "#666"}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={1}>
                      {product.name}
                    </Text>
                    <View style={styles.priceContainer}>
                      {product.discountedPrice ? (
                        <>
                          <Text style={styles.discountedPrice}>
                            Rp {product.discountedPrice.toLocaleString()}
                          </Text>
                          <Text style={styles.originalPrice}>
                            Rp {product.price.toLocaleString()}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.price}>
                          Rp {product.price.toLocaleString()}
                        </Text>
                      )}
                    </View>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>{product.rating}</Text>
                      <Text style={styles.stockText}>
                        Stok: {product.stock}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={styles.noResultsText}>Tidak ada produk ditemukan</Text>
              <Text style={styles.noResultsSubtext}>
                Coba ubah kriteria pencarian Anda
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  categoriesContainer: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 6,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedCategoryChip: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#666",
  },
  selectedCategoryText: {
    color: "#fff",
    fontWeight: "600",
  },
  filterSortContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  resultsCount: {
    flex: 1,
  },
  resultsText: {
    fontSize: 13,
    color: "#666",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#eee",
    height: 40,
  },
  sortButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  sortOptionsContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  sortText: {
    fontSize: 14,
    color: "#333",
  },
  selectedSortText: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex:
    1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },
  productsContainer: {
    flexGrow: 1,
    padding: 12,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width:
      windowWidth > 500
        ? (windowWidth - 64) / 3 - 12
        : (windowWidth - 36) / 2 - 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImageContainer: {
    height: 150,
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
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  discountedPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007BFF",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
    marginRight: 8,
  },
  stockText: {
    fontSize: 12,
    color: "#666",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 6,
    textAlign: "center",
  },
});