import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Dimensions,
  Linking,
  Image,
  Alert,
  Modal
} from "react-native";
import Navbar from "../../../components/Navbar";
import { WebView } from 'react-native-webview';


const windowWidth = Dimensions.get('window').width;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Contact information
  const contactInfo = [
    {
      title: "Alamat",
      detail: "Jl. Kuliner Indonesia No. 123, Jakarta Selatan",
      icon: "🏢"
    },
    {
      title: "Email",
      detail: "halo@jajanin.com",
      icon: "✉️"
    },
    {
      title: "Telepon",
      detail: "+62 89515839924",
      icon: "📞"
    },
    {
      title: "Jam Operasional",
      detail: "Senin - Jumat: 08.00 - 18.00 WIB",
      icon: "🕒"
    }
  ];

  // Social Media Links
  const socialMedia = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/raytalog",
      icon: "📸"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/raytalog",
      icon: "👍"
    },
    {
      name: "Twitter",
      url: "https://www.twitter.com/raytalog",
      icon: "🐦"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/raytalog",
      icon: "💼"
    }
  ];

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert("Form Tidak Lengkap", "Mohon lengkapi semua field yang diperlukan.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/saran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nama: name,
          email: email,
          isi: message,
        }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setIsModalVisible(true);  // Show modal on successful submission
        // Clear the input fields
        setName('');
        setEmail('');
        setMessage('');
        setSubject('');
      } else {
        Alert.alert("Error", result.message || "Terjadi kesalahan, coba lagi nanti.");
      }
    } catch (error) {
      Alert.alert("Terjadi kesalahan", "Tidak dapat mengirimkan pesan, coba lagi nanti.");
      console.error(error);
    }
  };
  
  // Function to open WhatsApp
  const openWhatsApp = () => {
    const whatsappNumber = "+6289515839924";
    const message = "Halo Admin Jajanin, saya ingin bertanya tentang ";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("WhatsApp tidak terinstall", "Silakan install WhatsApp untuk menghubungi kami melalui WhatsApp.");
        }
      })
      .catch(err => Alert.alert("Terjadi kesalahan", "Tidak dapat membuka WhatsApp."));
  };

  // Function to open email client
  const openEmail = (emailAddress) => {
    const url = `mailto:${emailAddress}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("Email", "Tidak dapat membuka aplikasi email.");
        }
      })
      .catch(err => Alert.alert("Terjadi kesalahan", "Tidak dapat membuka aplikasi email."));
  };

  

  // Function to open Google Maps in browser
  const openGoogleMaps = () => {
    const address = encodeURIComponent("Jl. Kuliner Indonesia No. 123, Jakarta Selatan");
    const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("Tidak dapat membuka URL", "URL tidak didukung oleh perangkat Anda.");
        }
      })
      .catch(err => Alert.alert("Terjadi kesalahan", "Tidak dapat membuka URL."));
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.content}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Hubungi Kami</Text>
          <Text style={styles.heroSubtitle}>
            Kami siap membantu menjawab pertanyaan Anda
          </Text>
        </View>

        {/* Map Section */}
    <View style={{ marginBottom: 20, height: 300 }}>
      <Text style={styles.sectionTitle}>Lokasi Kami</Text>
      <WebView
        style={{ flex: 1, borderRadius: 10 }}
        source={{ html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <style> #map { height: 100%; width: 100%; border-radius: 10px; } </style>
          </head>
          <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
            <script>
              var map = L.map('map').setView([-6.2607, 106.7816], 15);
              L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © OpenStreetMap contributors',
              }).addTo(map);
              L.marker([-6.2607, 106.7816]).addTo(map)
                .bindPopup('Jajanin.<br>Jl. Kuliner Indonesia No. 123.').openPopup();
            </script>
          </body>
          </html>
        ` }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>

            <View style={styles.csButtonsContainers}>
              <TouchableOpacity 
                style={[styles.csButtons]} 
                onPress={() => openGoogleMaps()}
              >
                <Text style={styles.csButtonIcon}>📍</Text>
                <Text style={styles.csButtonTexts}>Lokasi</Text>
              </TouchableOpacity>
            </View>

     

        {/* Contact Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informasi Kontak</Text>
          <View style={styles.contactCardsContainer}>
            {contactInfo.map((item, index) => (
              <View key={index} style={styles.contactCard}>
                <Text style={styles.contactCardIcon}>{item.icon}</Text>
                <Text style={styles.contactCardTitle}>{item.title}</Text>
                <Text style={styles.contactCardDetail}>{item.detail}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Customer Service Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layanan Pelanggan</Text>
          <View style={styles.csContainer}>
            <Text style={styles.csText}>
              Tim layanan pelanggan kami siap membantu Anda dengan pertanyaan, masukan, atau kendala yang Anda alami.
              Silakan hubungi kami melalui salah satu metode di bawah ini:
            </Text>
            
            <View style={styles.csButtonsContainer}>
              <TouchableOpacity 
                style={[styles.csButton, styles.whatsappButton]} 
                onPress={openWhatsApp}
              >
                <Text style={styles.csButtonIcon}>💬</Text>
                <Text style={styles.csButtonText}>Hubungi via WhatsApp</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.csButton, styles.emailButton]} 
                onPress={() => openEmail("halo@raytalog.com")}
              >
                <Text style={styles.csButtonIcon}>✉️</Text>
                <Text style={styles.csButtonText}>Kirim Email</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kirim Pesan / Saran</Text>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nama*</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Masukkan nama lengkap Anda"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email*</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan alamat email Anda"
                keyboardType="email-address"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pesan / Saran*</Text>
              <TextInput
                style={styles.textArea}
                value={message}
                onChangeText={setMessage}
                placeholder="Tuliskan pesan atau saran Anda"
                multiline
                placeholderTextColor="#999"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal for Successful Submission */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Pesan berhasil dikirim!</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
  },
  heroSection: {
    width:'100%',
    textAlign: "center",
    height:100,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  contactCard: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  contactCardIcon: {
    fontSize: 24,
  },
  contactCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contactCardDetail: {
    fontSize: 14,
    color: "#555",
  },
  csContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  csText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  csButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  csButtonsContainers: {
    flexDirection: "row",
    width:'100%'
  },
  csButton: {
    width: "48%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  csButtons: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor:"#0073e6"
  },
  whatsappButton: {
    backgroundColor: "#25d366",
  },
  emailButton: {
    backgroundColor: "#0073e6",
  },
  csButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  csButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  csButtonTexts: {
    fontSize: 16,
    color: "#fff",
  },
  formContainer: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
