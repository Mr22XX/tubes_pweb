import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const DetailPromoScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();  // Ambil ID produk dari query params

  const [produk, setProduk] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ambil data produk berdasarkan ID
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/produk-promo/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduk(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleBeli = () => {
    const nomorWhatsApp = '+6281234567890'; // Ganti dengan nomor WhatsApp tujuan
    const pesan = `Halo, saya tertarik membeli produk ${produk.nama}.`; // Pesan yang ingin dikirim
    const url = `whatsapp://send?phone=${nomorWhatsApp}&text=${encodeURIComponent(pesan)}`;

    // Buka WhatsApp
    Linking.openURL(url).catch((err) => {
      console.error('Error opening WhatsApp:', err);
    });
  };

  const goBackToProduk = () => {
    router.push('/home');  // Kembali ke halaman daftar produk
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!produk) {
    return (
      <View style={styles.center}>
        <Text>Produk tidak ditemukan</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Tombol kembali */}
      <TouchableOpacity onPress={goBackToProduk} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Produk</Text>
      </TouchableOpacity>

      <Image source={{ uri: produk.gambar }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{produk.nama}</Text>
        <Text style={styles.productPrice}>Rp {parseInt(produk.harga).toLocaleString('id-ID')}</Text>
        <Text style={styles.productDescription}>{produk.deskripsi}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Beli"
            color="#4CAF50"
            onPress={handleBeli}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4CAF50',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default DetailPromoScreen;
