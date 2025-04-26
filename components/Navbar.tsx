// components/Navbar.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState("/(client)/home");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navItems = [
    { name: "Beranda", path: "/(client)/home" },
    { name: "Tentang", path: "/(client)/about" },
    { name: "Produk", path: "/(client)/product" },
    { name: "Kontak", path: "/(client)/contact" },
  ];

  const profileDropdownItems = [
    { name: "Profil Saya", icon: "👤", path: "/(client)/profile" },
    { name: "Keluar", icon: "📤", path: "/(auth)/logout", color: "#FF3B30" },
  ];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    router.push(path as any);
    // Close dropdown after navigation
    setShowProfileDropdown(false);
  };
  
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/(client)/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleProfileAction = (path: string) => {
    // First close the dropdown, then navigate
    setShowProfileDropdown(false);
    // Small delay to ensure dropdown animation completes before navigation
    setTimeout(() => {
      router.push(path as any);
    }, 50);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        {/* Logo & Search */}
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => handleNavigation("/(client)/home")}>
            <Text style={styles.logo}>RayTalog</Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari produk..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Cari</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navItems}>
          {navItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item.path)}
              style={[
                styles.navItem,
                currentPath === item.path && styles.activeNavItem,
              ]}
            >
              <Text
                style={[
                  styles.navText,
                  currentPath === item.path && styles.activeNavText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Profile & Login */}
        <View style={styles.rightSection}>
          <View style={styles.profileDropdownContainer}>
            <TouchableOpacity
              style={styles.profileIcon}
              onPress={() => setShowProfileDropdown(!showProfileDropdown)}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>👤</Text>
              </View>
            </TouchableOpacity>

            {showProfileDropdown && (
              <View style={styles.dropdownMenu}>
                {profileDropdownItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleProfileAction(item.path)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dropdownItemIcon}>{item.icon}</Text>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        item.color && { color: item.color },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleNavigation("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#ffffff",
    width: "100%",
    zIndex: 100, // Ensure safe area has high z-index
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100, // Increased z-index value
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginRight: 15,
  },
  searchContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
  },
  searchInput: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 160,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  navItems: {
    flexDirection: "row",
    gap: 20,
  },
  navItem: {
    paddingVertical: 8,
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  activeNavText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 101, // Higher than navbar for dropdown
  },
  profileDropdownContainer: {
    position: "relative",
    marginRight: 10,
    zIndex: 150, // Even higher z-index for dropdown container
  },
  profileIcon: {
    padding: 5,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 16,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
    zIndex: 200, // Very high z-index for the dropdown menu
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});