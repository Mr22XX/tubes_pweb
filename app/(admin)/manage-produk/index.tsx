import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const ProdukListScreen = () => {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/produk')
      .then((response) => response.json())
      .then((data) => setProduk(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.namaProduk}>{item.nama}</Text>
      <Text style={styles.hargaProduk}>Rp {item.harga.toLocaleString()}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => router.push(`/manage-produk/update/${item.id}`)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/produk/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setProduk(produk.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <View style={styles.container}>
      {/* Tombol Back ke Dashboard */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/dashboard')} // Sesuaikan dengan route dashboard yang ada
      >
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </TouchableOpacity>

      <FlatList
        data={produk}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      {/* Tombol Tambah Produk */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/manage-produk/create')}
      >
        <Text style={styles.addButtonText}>+ Tambah Produk</Text>
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
    paddingBottom: 80, // supaya tidak ketutupan tombol Add
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
    elevation: 3, // untuk Android
  },
  namaProduk: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hargaProduk: {
    fontSize: 14,
    color: '#555',
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
  backButton: {
    marginTop: 16,
    backgroundColor: '#757575',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',

  },
});

export default ProdukListScreen;
