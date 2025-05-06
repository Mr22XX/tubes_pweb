import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Modal, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const UpdateUserScreen = () => {
  const { id } = useLocalSearchParams(); // Ambil ID dari parameter URL
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Ambil data user saat halaman dibuka
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        const data = await response.json();

        if (response.ok) {
          setNama(data.nama);
          setEmail(data.email);
          setRole(data.role);
        } else {
          setModalMessage('Gagal mengambil data user.');
          setIsModalVisible(true);
        }
      } catch (error) {
        setModalMessage('Terjadi kesalahan saat mengambil data user.');
        setIsModalVisible(true);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdateUser = async () => {
    let formIsValid = true;
    const newErrors = {};

    if (!nama) {
      formIsValid = false;
      newErrors.nama = 'Nama tidak boleh kosong';
    }
    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email tidak boleh kosong';
    }
    if (!role) {
      formIsValid = false;
      newErrors.role = 'Role tidak boleh kosong';
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalMessage('User berhasil diperbarui!');
      } else {
        setModalMessage(data.message || 'Gagal memperbarui user.');
      }

      setIsModalVisible(true);
    } catch (error) {
      setModalMessage('Terjadi kesalahan saat memperbarui user.');
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit User</Text>

      <TextInput
        style={[styles.input, errors.nama && styles.inputError]}
        placeholder="Nama Lengkap"
        value={nama}
        onChangeText={setNama}
      />
      {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password (kosongkan jika tidak ingin diubah)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={[styles.input, errors.role && styles.inputError]}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

      <Button
        title={loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        onPress={handleUpdateUser}
        color="#2196F3"
        disabled={loading}
      />

      <TouchableOpacity onPress={() => router.push('/manage-user')}>
        <Text style={styles.backText}>Kembali ke Daftar User</Text>
      </TouchableOpacity>

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
              onPress={() => {
                setIsModalVisible(false);
                if (modalMessage.includes('berhasil')) {
                  router.push('/manage-user');
                }
              }}
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
    flexGrow: 1,
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
    borderColor: 'red',
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

export default UpdateUserScreen;
