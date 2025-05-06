import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function Navbar() {
  const router = useRouter();
  const currentPathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState(null); // Inisialisasi state userId

  const navItems = [
    { name: 'Beranda', path: '/(client)/home' },
    { name: 'Tentang', path: '/(client)/about' },
    { name: 'Produk', path: '/(client)/product' },
    { name: 'Kontak', path: '/(client)/contact' },
  ];

  // Ambil userId dari AsyncStorage saat komponen pertama kali di-render
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId); // Simpan userId dalam state
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali di-mount

  useEffect(() => {
    const matchedNavItem = navItems.find(item => {
      const itemPathSegments = item.path.split('/');
      const currentPathSegments = currentPathname.split('/');
      return itemPathSegments[itemPathSegments.length - 1] === currentPathSegments[currentPathSegments.length - 1];
    });

    if (matchedNavItem) {
      setCurrentPath(matchedNavItem.path);
    }
  }, [currentPathname]);

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    router.push(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userId');  // Pastikan menghapus userId juga
      router.push('/(auth)/login');
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={() => handleNavigation('/(client)/home')}>
            <Text style={styles.logo}>Jajanin</Text>
          </TouchableOpacity>
          {width < 768 && (
            <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
              <Text style={styles.hamburgerIcon}>☰</Text>
            </TouchableOpacity>
          )}
        </View>

        {currentPath && (
          <View style={styles.pageIndicator}>
            <Text style={styles.pageIndicatorText}>
              Anda sedang di: <Text style={styles.currentPageName}>{navItems.find(n => n.path === currentPath)?.name}</Text>
            </Text>
          </View>
        )}

        {width >= 768 && (
          <View style={styles.navItems}>
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleNavigation(item.path)}
                style={[styles.navItem, currentPath === item.path && styles.activeNavItem]}
              >
                <Text style={[styles.navText, currentPath === item.path && styles.activeNavText]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
            {userId && (
              <TouchableOpacity onPress={() => router.push(`/favorit/${userId}`)}>
                <Text style={[styles.navText, { color: '#4CAF50', fontWeight: 'bold' }]}>
                  favorit 
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {isMenuOpen && width < 768 && (
        <Animated.View style={styles.mobileMenu}>
          {navItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleNavigation(item.path)}
              style={[styles.mobileNavItem, currentPath === item.path && styles.activeNavItem]}
            >
              <Text style={[styles.navText, currentPath === item.path && styles.activeNavText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
          {userId && (
            <TouchableOpacity onPress={() => router.push(`/favorit/${userId}`)} style={styles.mobileNavItem}>
              <Text style={[styles.navText, { color: '#4CAF50', fontWeight: 'bold' }]}>
                Favorit
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout} style={styles.mobileNavItems}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
    width: '100%',
    zIndex: 100,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 15,
  },
  hamburgerIcon: {
    fontSize: 30,
    color: '#4CAF50',
  },
  pageIndicator: {
    position: 'absolute',
    top: -25,
    left: 0,
    right: 0,
    backgroundColor: '#f8f9fa',
    paddingVertical: 4,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  pageIndicatorText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  currentPageName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navItem: {
    paddingVertical: 8,
  },
  navText: {
    fontSize: 16,
    color: '#333',
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  activeNavText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    marginLeft: 15,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mobileMenu: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 99,
  },
  mobileNavItem: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  mobileNavItems: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#FF3B30',
  },
});
