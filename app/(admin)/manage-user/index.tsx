import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

const ManageUserScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data users
    fetch('http://localhost:3000/user')
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          console.log('Tidak ada pengguna di database');
        }
        setUsers(data);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    // Mengirim request DELETE ke server tanpa prompt alert
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal menghapus user');
        }
        return response.json();
      })
      .then((data) => {
        // Log untuk melihat respon server
        console.log(data.message);
  
        // Setelah user dihapus, perbarui state users
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        // Menampilkan pesan kesalahan jika terjadi error
      });
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.userName}>{item.nama}</Text>
      <Text style={styles.userEmail}>{item.email}</Text>
      <Text style={styles.userRole}>Role : {item.role}</Text>
      <Text style={styles.userVisits}>Jumlah Kunjungan: {item.jumlah_kunjungan}</Text>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={() => router.push(`/manage-user/update/${item.id}`)}
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Tombol Kembali ke Dashboard */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/dashboard')}
        >
          <Text style={styles.backButtonText}>Kembali ke Dashboard</Text>
        </TouchableOpacity>
      </View>

      {users.length === 0 ? (
        <Text style={styles.noDataText}>Data pengguna belum tersedia</Text>
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Tombol Tambah User */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/manage-user/create')}
      >
        <Text style={styles.addButtonText}>+ Tambah User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 30, // memberikan sedikit ruang di atas konten
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16, // Menambahkan jarak dari atas
  },
  backButton: {
    backgroundColor: '#757575',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#FF9800',
    marginBottom: 4,
  },
  userVisits: {
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
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 40,
  },
});

export default ManageUserScreen;
