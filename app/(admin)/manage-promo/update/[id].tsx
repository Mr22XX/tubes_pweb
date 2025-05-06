import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const UpdatePromoScreen = () => {
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/promo`)
      .then((res) => res.json())
      .then((data) => {
        const promo = data.find((item) => item.id === parseInt(id));
        if (promo) {
          setTitle(promo.title);
          setSubtitle(promo.subtitle);
        }
      })
      .catch((err) => {
        console.error('Gagal load promo', err);
        alert('Gagal load data promo');
      });
  }, [id]);

  const handleUpdate = () => {
    if (!title || !subtitle) {
      alert('Harap isi semua field');
      return;
    }

    fetch(`http://localhost:3000/promo/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, subtitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setModalVisible(true);
      })
      .catch((err) => {
        console.error('Gagal update promo', err);
        alert('Gagal update promo');
      });
  };

  const handleModalClose = () => {
    setModalVisible(false);
    router.replace('/manage-promo');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Judul Promo"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Deskripsi Promo"
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <Button title="Update Promo" onPress={handleUpdate} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Promo berhasil diupdate!</Text>
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
});

export default UpdatePromoScreen;
