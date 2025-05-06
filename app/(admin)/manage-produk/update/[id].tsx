import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const EditProdukScreen = () => {
  const { id } = useLocalSearchParams();
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState('');
  const [kategori, setKategori] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // << TAMBAHKAN STATE MODAL

  useEffect(() => {
    fetch(`http://localhost:3000/produk/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNama(data.nama);
        setDeskripsi(data.deskripsi);
        setHarga(data.harga.toString());
        setGambar(data.gambar);
        setKategori(data.kategori_id?.toString() || '');
      })
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  const handleSubmit = () => {
    const updatedProduk = {
      nama,
      deskripsi,
      harga: parseInt(harga),
      gambar,
      kategori_id: parseInt(kategori),
    };

    fetch(`http://localhost:3000/produk/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduk),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setModalVisible(true); // << tampilkan modal saat sukses
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace('/manage-produk'); // << pindah ke halaman manage-produk
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama Produk"
        value={nama}
        onChangeText={setNama}
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi"
        value={deskripsi}
        onChangeText={setDeskripsi}
      />
      <TextInput
        style={styles.input}
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL Gambar"
        value={gambar}
        onChangeText={setGambar}
      />
      <TextInput
        style={styles.input}
        placeholder="Kategori ID"
        value={kategori}
        onChangeText={setKategori}
        keyboardType="numeric"
      />
      <Button title="Update Produk" onPress={handleSubmit} />

      {/* Modal Success */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Produk berhasil diupdate!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // background semi transparan
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
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
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProdukScreen;
