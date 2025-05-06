import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const ManagePromoScreen = () => {
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    // Fetch data promo
    fetch('http://localhost:3000/promo')
      .then((response) => response.json())
      .then((data) => setPromos(data))
      .catch((error) => console.error('Error fetching promos:', error));
  }, []);

  const handleDeletePromo = (id) => {
    // Mengirim request DELETE untuk menghapus promo
    fetch(`http://localhost:3000/promo/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setPromos(promos.filter((promo) => promo.id !== id)); // Menghapus promo dari state
      })
      .catch((error) => console.error('Error deleting promo:', error));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.promoTitle}>{item.title}</Text>
      <Text style={styles.promoSubtitle}>{item.subtitle}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => router.push(`/manage-promo/update/${item.id}`)}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDeletePromo(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
         <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/dashboard')}
          >
            <Text style={styles.backButtonText}>Kembali ke Dashboard</Text>
        </TouchableOpacity>
      <FlatList
        data={promos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />

      {/* Tombol Tambah Promo */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/manage-promo/create')}
      >
        <Text style={styles.addButtonText}>+ Tambah Promo</Text>
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
  backButton: {
    backgroundColor: '#757575',
    paddingVertical: 14,
    borderRadius: 8,
    color:'white',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoSubtitle: {
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
});

export default ManagePromoScreen;
