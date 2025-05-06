import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { router } from 'expo-router';

const CreateUserScreen = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);  // State untuk modal
  const [modalMessage, setModalMessage] = useState('');  // Pesan untuk modal
  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    password: '',
    role: '',
  });

  // Fungsi untuk menangani submit create user
  const handleCreateUser = async () => {
    // Validasi form
    let formIsValid = true;
    const newErrors = { nama: '', email: '', password: '', role: '' };

    if (!nama) {
      formIsValid = false;
      newErrors.nama = 'Nama lengkap tidak boleh kosong';
    }

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email tidak boleh kosong';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password tidak boleh kosong';
    }

    if (!role) {
      formIsValid = false;
      newErrors.role = 'Role tidak boleh kosong';
    }

    if (!formIsValid) {
      setErrors(newErrors);  // Menampilkan pesan error
      return;  // Jangan lanjutkan jika form tidak valid
    }

    setLoading(true);
    setErrors({}); // Menghapus error jika form sudah valid

    try {
      const response = await fetch('http://localhost:3000/register-admin', {  // Pastikan API URL sesuai
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password, role }),
      });

      const data = await response.json();
      console.log('Response dari server:', data);

      if (response.status === 200) {
        setModalMessage(data.message); // Set pesan sukses
      } else {
        setModalMessage(data.message); // Set pesan gagal
      }

      setIsModalVisible(true);  // Tampilkan modal

    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Terjadi kesalahan, coba lagi nanti!');
      setIsModalVisible(true);  // Tampilkan modal jika terjadi error
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tambah User Baru</Text>

      {/* Input Nama */}
      <TextInput
        style={[styles.input, errors.nama && styles.inputError]}  // Menambahkan style error
        placeholder="Nama Lengkap"
        value={nama}
        onChangeText={setNama}
      />
      {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}

      {/* Input Email */}
      <TextInput
        style={[styles.input, errors.email && styles.inputError]}  // Menambahkan style error
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Input Password */}
      <TextInput
        style={[styles.input, errors.password && styles.inputError]}  // Menambahkan style error
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      {/* Input Role */}
      <TextInput
        style={[styles.input, errors.role && styles.inputError]}  // Menambahkan style error
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

      {/* Tombol Create User */}
      <Button
        title={loading ? 'Loading...' : 'Buat User'}
        onPress={handleCreateUser}
        color="#2196F3"
        disabled={loading}
      />

      {/* Tombol untuk kembali ke halaman daftar user */}
      <TouchableOpacity onPress={() => router.push('/manage-user')}>
        <Text style={styles.backText}>Kembali ke Daftar User</Text>
      </TouchableOpacity>

      {/* Modal untuk menampilkan pesan */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <Button
              title="OK"
              onPress={() => setIsModalVisible(false)}  // Tutup modal ketika OK ditekan
              color="#4CAF50"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: 'red', // Menandakan error dengan warna merah pada border
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  backText: {
    textAlign: 'center',
    color: '#2196F3',
    marginTop: 20,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default CreateUserScreen;
