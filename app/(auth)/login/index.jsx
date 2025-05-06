import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi untuk memvalidasi format email
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email dan password tidak boleh kosong!');
      return;
    }

    // Validasi format email
    if (!validateEmail(email)) {
      setErrorMessage('Format email tidak valid!');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      console.log('API Response:', data); // Debugging API response

      if (response.status === 200) {
        // Pastikan data.user ada dan formatnya benar
        if (data.user) {
          // Simpan data user ke AsyncStorage
          await AsyncStorage.setItem('userToken', JSON.stringify(data.user));
          await AsyncStorage.setItem('userName', data.user.nama);  // Simpan nama pengguna
          await AsyncStorage.setItem('userId', data.user.id);  // Simpan nama pengguna
          
          // Cek apakah data sudah tersimpan
          const storedUser = await AsyncStorage.getItem('userToken');
          console.log('Stored User:', JSON.parse(storedUser)); // Verifikasi apakah data tersimpan dengan benar

          setModalMessage('Login Berhasil!');
          setModalVisible(true);
        } else {
          setModalMessage('Data pengguna tidak ditemukan!');
          setModalVisible(true);
        }
      } else {
        setModalMessage('Email atau password salah!');
        setModalVisible(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('Terjadi kesalahan, coba lagi nanti!');
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = async () => {
    setModalVisible(false);

    if (modalMessage === 'Login Berhasil!') {
      try {
        const userString = await AsyncStorage.getItem('userToken');
        const storedUserName = await AsyncStorage.getItem('userName');  // Ambil nama pengguna

        if (userString) {
          const user = JSON.parse(userString);
          console.log('Parsed User:', user); // Verifikasi data user yang diambil dari AsyncStorage

          if (user?.role) {
            console.log('Stored User Name:', storedUserName);  // Verifikasi nama pengguna
            // Cek apakah role user dikenali
            if (user.role === 'admin') {
              router.push('/dashboard');  // Redirect ke halaman admin
            } else if (user.role === 'user') {
              router.push('/home');  // Redirect ke halaman user
            } else {
              console.warn('Role tidak dikenali:', user.role);
              router.push('/login');  // Jika role tidak dikenali, kembali ke login
            }
          } else {
            console.warn('User tidak ditemukan atau tidak ada role.');
            router.push('/login');
          }
        } else {
          console.warn('Data user tidak ditemukan di AsyncStorage.');
          router.push('/login');
        }
      } catch (error) {
        console.error('Gagal membaca data dari AsyncStorage:', error);
        router.push('/login');  // Jika ada error, kembali ke login
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Jajanin</Text>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Button
        title={loading ? 'Loading...' : 'Login'}
        onPress={handleLogin}
        color="#4CAF50"
        disabled={loading}
      />

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Belum punya akun? Daftar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="OK" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </View>
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
  titles: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 40,
    marginLeft: 20,
    position: 'absolute',
    top: 0,
    color: '#4CAF50',
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
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  registerText: {
    textAlign: 'center',
    color: '#4CAF50',
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default LoginScreen;
