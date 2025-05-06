import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router'; // pake router, bukan navigation

const TambahProdukScreen = () => {
  const [nama, setNama] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState('');
  const [promo_id, setPromo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = () => {
    const hargaInt = parseInt(harga);
    const promoInt = parseInt(promo_id);

    if (!nama || !deskripsi || isNaN(hargaInt) || !gambar || isNaN(promoInt)) {
      alert('Harap isi semua field dengan benar.');
      return;
    }

    const newProduk = {
      nama,
      deskripsi,
      harga: hargaInt,
      gambar,
      promo_id: promoInt,
    };

    fetch('http://localhost:3000/produk-promo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduk),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setModalVisible(true);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace('/manage-produk-promo');
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
        placeholder="Promo_id"
        value={promo_id}
        onChangeText={setPromo}
        keyboardType="numeric"
      />    
      <Button title="Tambah Produk" onPress={handleSubmit} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Produk berhasil ditambahkan!</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>Oke</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    height: 40,
    paddingLeft: 8,
  },
  
  picker: {
    height: 40,
    width: '100%',
  },
  
});

export default TambahProdukScreen;
