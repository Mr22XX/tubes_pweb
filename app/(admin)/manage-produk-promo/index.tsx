import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const ManageProdukPromoScreen = () => {
  const [produkPromos, setProdukPromos] = useState([]);

  useEffect(() => {
    // Fetch data produk promo
    fetch('http://localhost:3000/produk-promo')
      .then((response) => response.json())
      .then((data) => setProdukPromos(data))
      .catch((error) => console.error('Error fetching produk promos:', error));
  }, []);

  const handleDeleteProdukPromo = (id) => {
    // Mengirim request DELETE untuk menghapus produk promo
    fetch(`http://localhost:3000/produk-promo/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setProdukPromos(produkPromos.filter((produk) => produk.id !== id)); // Menghapus produk dari state
      })
      .catch((error) => console.error('Error deleting produk promo:', error));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.produkName}>{item.nama}</Text>
      <Text style={styles.produkDescription}>{item.deskripsi}</Text>
      <Text style={styles.produkHarga}>Harga: {item.harga}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => router.push(`/manage-produk-promo/update/${item.id}`)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeleteProdukPromo(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={produkPromos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      {/* Tombol Tambah Produk Promo */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/manage-produk-promo/create')}
      >
        <Text style={styles.addButtonText}>+ Tambah Produk Promo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  listContent: {
    padding: 16,
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  produkName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  produkDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  produkHarga: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#FFA726',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: '#EF5350',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ManageProdukPromoScreen;
