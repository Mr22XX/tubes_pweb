import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Untuk navigasi setelah modal ditutup

const CreatePromoScreen = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Menyimpan status modal

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, subtitle }),
      });

      const data = await response.json();
      Alert.alert('Success', data.message);

      // Setelah berhasil, tampilkan modal
      setModalVisible(true);
      setTitle(''); // Reset field input setelah berhasil
      setSubtitle('');
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan promo');
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace('/manage-promo'); // Navigasi ke manage-promo setelah modal ditutup
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Judul Promo:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Masukkan judul promo"
      />

      <Text style={styles.label}>Deskripsi:</Text>
      <TextInput
        style={styles.input}
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Masukkan deskripsi promo"
      />

      <Button title="Tambah Promo" onPress={handleSubmit} />

      {/* Modal setelah promo berhasil ditambahkan */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Promo berhasil ditambahkan!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Kembali ke Daftar Promo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreatePromoScreen;
