import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import Navbar from '@/components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Pastikan AsyncStorage sudah diimport

const KatalogScreen = () => {
  const [produk, setProduk] = useState([]);
  const [filteredProduk, setFilteredProduk] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('http://localhost:3000/produk')
      .then((res) => res.json())
      .then((data) => {
        setProduk(data);
        setFilteredProduk(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleSearchAndSort();
  }, [search, sort, category, produk]);

  const handleSearchAndSort = () => {
    let result = produk.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== 'all') {
      result = result.filter((item) => item.kategori_id === parseInt(category));
    }

    if (sort === 'asc') {
      result.sort((a, b) => a.harga - b.harga);
    } else if (sort === 'desc') {
      result.sort((a, b) => b.harga - a.harga);
    }

    setFilteredProduk(result);
  };

  const tambahKeFavorit = (produk_id) => {
    // Ambil user_id dari AsyncStorage
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        if (userToken) {
          const user = JSON.parse(userToken);
          const user_id = user.id; // Ambil user_id dari data yang ada di AsyncStorage

          fetch('http://localhost:3000/favorit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id, produk_id })
          })
            .then((res) => res.json())
            .then((data) => {
              alert(data.message || 'Berhasil ditambahkan ke favorit');
            })
            .catch((err) => {
              console.error(err);
              alert('Gagal menambahkan ke favorit');
            });
        } else {
          alert('User tidak ditemukan. Harap login terlebih dahulu.');
        }
      })
      .catch((err) => {
        console.error('Error fetching user token:', err);
        alert('Terjadi kesalahan saat mengambil data pengguna.');
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Link href={`/detail/${item.id}`} style={styles.containerimg}>
        <Image source={{ uri: item.gambar }} style={styles.image} resizeMode="cover" />
        <Text style={styles.name} numberOfLines={1}>{item.nama}</Text>
        <Text style={styles.price}>Rp {parseInt(item.harga).toLocaleString('id-ID')}</Text>
      </Link>

      <TouchableOpacity
        onPress={() => tambahKeFavorit(item.id)}
        style={{ marginTop: 10, backgroundColor: '#FF4081', padding: 8, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontWeight: '600' }}>+ Favorit</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
      <TextInput
        style={styles.searchInput}
        placeholder="Cari produk..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Pilih Kategori:</Text>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Semua Kategori" value="all" />
          <Picker.Item label="Makanan" value="1" />
          <Picker.Item label="Minuman" value="2" />
        </Picker>
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Urutkan berdasarkan:</Text>
        <Picker
          selectedValue={sort}
          style={styles.picker}
          onValueChange={(itemValue) => setSort(itemValue)}
        >
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Harga Termurah" value="asc" />
          <Picker.Item label="Harga Termahal" value="desc" />
        </Picker>
      </View>

      <FlatList
        data={filteredProduk}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    margin: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  sortLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  picker: {
    width: 150,
    height: 40,
    borderRadius: 15,
    backgroundColor: '#F1F3F5',
    color: '#333',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerimg: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    textAlign: 'center',
  },
});

export default KatalogScreen;
