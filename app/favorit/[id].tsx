import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '@/components/Navbar';

const FavoritScreen = () => {
  const [favorit, setFavorit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); // Tambahkan state untuk menyimpan userId

  // Mengambil user_id dari AsyncStorage saat komponen pertama kali dipasang
  useEffect(() => {
    const getUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId'); // Ambil userId dari AsyncStorage
        if (storedUserId) {
          setUserId(storedUserId); // Set userId yang diambil dari AsyncStorage
        } else {
          console.log('User ID not found');
          // Bisa redirect ke login jika user_id tidak ditemukan
        }
      } catch (error) {
        console.error('Error fetching user_id from AsyncStorage:', error);
      }
    };

    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3000/favorit/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorit(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [userId]);

  const hapusFavorit = (produk_id) => {
    fetch('http://localhost:3000/favorit', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, produk_id }) // Gunakan userId dari state
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || 'Favorit dihapus');
        setFavorit(favorit.filter((item) => item.id !== produk_id));
      })
      .catch((err) => {
        console.error(err);
        alert('Gagal menghapus');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.gambar }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nama}</Text>
        <Text style={styles.price}>Rp {parseInt(item.harga).toLocaleString('id-ID')}</Text>
        <TouchableOpacity onPress={() => hapusFavorit(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>Produk Favorit</Text>
      <FlatList
        data={favorit}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9' },
  title: { fontSize: 24, fontWeight: 'bold', margin: 16, color: '#333' },
  card: { backgroundColor: '#FFF', flexDirection: 'row', marginBottom: 12, borderRadius: 10, overflow: 'hidden', elevation: 2 },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  price: { fontSize: 14, color: '#4CAF50', marginBottom: 8 },
  deleteButton: { backgroundColor: '#FF5252', padding: 6, borderRadius: 6, alignSelf: 'flex-start' },
  deleteText: { color: 'white', fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default FavoritScreen;
  