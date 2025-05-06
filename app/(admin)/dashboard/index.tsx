import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';

const AdminDashboard = () => {
  const handleLogout = () => {
    router.push('/login')
    console.log('Logging out...');
  };

  const [countUser, setCountUser] = useState(0);
  const [countProduk, setCountProduk] = useState(0);

  useEffect(()=>{
    fetch('http://localhost:3000/user/count')
    .then((response) => response.json())
    .then((data) => setCountUser(data.total_users))
    .catch((error) => console.error("error : ", error))
  },[])

  useEffect(() =>{
    fetch('http://localhost:3000/produk/count')
    .then((response) => response.json())
    .then((data) => setCountProduk(data.total_produk))
    .catch((error) => console.error("error : ", error))
  })


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Admin Panel</Text>
        <TouchableOpacity style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push('/manage-produk')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>Manage Produk</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push('/manage-user')} style={styles.sidebarItem}>
          <Text style={styles.sidebarItemText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={()=>router.push('/manage-promo')}>
          <Text style={styles.sidebarItemText}>Manage Promo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={()=>router.push('/manage-produk-promo')}>
          <Text style={styles.sidebarItemText}>Manage Produk Promo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sidebarItem} onPress={()=>router.push('/saran')}>
          <Text style={styles.sidebarItemText}>Saran dari user</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Admin Dashboard</Text>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightText}>Welcome, Admin</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{countProduk}</Text>
            <Text style={styles.statLabel}>Total Produk</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{countUser}</Text>
            <Text style={styles.statLabel}>User</Text>
          </View>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#2E3B4E',
    paddingTop: 30,
    paddingLeft: 20,
    paddingBottom: 20,
    height: '100%',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  sidebarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
  },
  sidebarItem: {
    paddingVertical: 10,
  },
  sidebarItemText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#1F2A37',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRightText: {
    color: 'white',
    fontSize: 16,
    marginRight: 20,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2A37',
  },
  statLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
  },
  quickLinksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickLinkCard: {
    backgroundColor: '#1F2A37',
    flex: 1,
    marginVertical: 10,
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  quickLinkText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AdminDashboard;
