import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { router } from 'expo-router';



const RegisterScreen = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);  // State untuk modal
  const [modalMessage, setModalMessage] = useState('');  // Pesan untuk modal

  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    password: ''
  });

  // Fungsi untuk menangani submit registrasi
  const handleRegister = async () => {
    // Validasi form
    let formIsValid = true;
    const newErrors = { nama: '', email: '', password: '' };

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

    if (!formIsValid) {
      setErrors(newErrors);  // Menampilkan pesan error
      return;  // Jangan lanjutkan jika form tidak valid
    }

    setLoading(true);
    setErrors({}); // Menghapus error jika form sudah valid

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password }),
      });

      // Log respons dari server
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
      <Text style={styles.titles}>Jajanin</Text>

      <Text style={styles.title}>Daftar Akun Baru</Text>

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

      {/* Tombol Register */}
      <Button
        title={loading ? 'Loading...' : 'Daftar'}
        onPress={handleRegister}
        color="#4CAF50"
        disabled={loading}
      />

      {/* Tombol untuk ke halaman Login */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Sudah punya akun? Masuk</Text>
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
  titles: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 40,
    marginLeft: 20,
    position:'absolute',
    top:0,
    color: '#4CAF50',
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
  loginText: {
    textAlign: 'center',
    color: '#4CAF50',
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

export default RegisterScreen;
