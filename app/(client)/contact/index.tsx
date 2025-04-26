// app/(client)/contact/index.tsx
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
  Alert
} from "react-native";
import Navbar from "../../../components/Navbar";
import { router } from 'expo-router';

const windowWidth = Dimensions.get('window').width;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');

  // Contact information
  const contactInfo = [
    {
      title: "Alamat",
      detail: "Jl. Kuliner Indonesia No. 123, Jakarta Selatan",
      icon: "🏢"
    },
    {
      title: "Email",
      detail: "halo@raytalog.com",
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
  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert("Form Tidak Lengkap", "Mohon lengkapi semua field yang diperlukan.");
      return;
    }
    
    // In a real app, you would send this data to your backend
    Alert.alert(
      "Pesan Terkirim",
      "Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.",
      [{ text: "OK", onPress: () => {
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }}]
    );
  };

  // Function to open WhatsApp
  const openWhatsApp = () => {
    const whatsappNumber = "+6289515839924";
    const message = "Halo RayTalog, saya ingin bertanya tentang ";
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

  // Function to open social media links
  const openSocialMedia = (url) => {
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

        {/* Map Section - Using Static Image Instead */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lokasi Kami</Text>
          <View style={styles.mapContainer}>
            {/* Using a placeholder image for the map */}
            <Image
              source={{ uri: "https://maps.googleapis.com/maps/api/staticmap?center=Jakarta+Selatan&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7CJakarta+Selatan&key=YOUR_API_KEY_HERE" }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <TouchableOpacity 
              style={styles.directionsButton} 
              onPress={openGoogleMaps}
            >
              <Text style={styles.directionsButtonText}>Lihat di Google Maps</Text>
            </TouchableOpacity>
          </View>
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

        {/* Social Media Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Media Sosial</Text>
          <Text style={styles.socialText}>
            Ikuti kami di media sosial untuk mendapatkan update terbaru, promo menarik, dan informasi kuliner lainnya.
          </Text>
          <View style={styles.socialMediaContainer}>
            {socialMedia.map((social, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.socialMediaButton}
                onPress={() => openSocialMedia(social.url)}
              >
                <Text style={styles.socialMediaIcon}>{social.icon}</Text>
                <Text style={styles.socialMediaName}>{social.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kirim Pesan</Text>
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
              <Text style={styles.label}>Subjek</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={setSubject}
                placeholder="Subjek pesan"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pesan*</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Tulis pesan Anda di sini..."
                multiline
                numberOfLines={6}
                placeholderTextColor="#999"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Kirim Pesan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerTop}>
            {/* Kolom 1 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>RayTalog</Text>
              <Text style={styles.footerText}>
                Katalog kuliner terlengkap di Indonesia dengan berbagai pilihan makanan dan minuman berkualitas.
              </Text>
            </View>

            {/* Kolom 2 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Informasi</Text>
              <TouchableOpacity onPress={() => router.push("/(client)/about")}>
                <Text style={styles.footerLink}>Tentang Kami</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(client)/contact")}>
                <Text style={styles.footerLink}>Kontak Kami</Text>
              </TouchableOpacity>
            </View>

            {/* Kolom 3 */}
            <View style={styles.footerCol}>
              <Text style={styles.footerColTitle}>Ikuti Kami</Text>
              <View style={styles.socialLinks}>
                {socialMedia.slice(0, 4).map((social, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.socialButton}
                    onPress={() => openSocialMedia(social.url)}
                  >
                    <Text>{social.icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.footerBottom}>
            <Text style={styles.copyright}>© 2025 RayTalog. Hak Cipta Dilindungi.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  content: {
    flexGrow: 1,
    padding: 0,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#007BFF",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    opacity: 0.9,
  },
  section: {
    padding: 24,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  // Map styles with static image
  mapContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  mapImage: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0", // Placeholder color while loading
  },
  directionsButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 6,
  },
  directionsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contactCardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  contactCard: {
    width: windowWidth > 768 ? "23%" : windowWidth > 500 ? "48%" : "100%",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  contactCardIcon: {
    fontSize: 30,
    marginBottom: 12,
  },
  contactCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  contactCardDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  csContainer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  csText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  csButtonsContainer: {
    flexDirection: windowWidth > 500 ? "row" : "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  csButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: windowWidth > 500 ? "48%" : "100%",
    maxWidth: 250,
  },
  whatsappButton: {
    backgroundColor: "#25D366",
  },
  emailButton: {
    backgroundColor: "#007BFF",
  },
  csButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  csButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  socialText: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  socialMediaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    marginTop: 10,
  },
  socialMediaButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    width: windowWidth > 768 ? "22%" : windowWidth > 500 ? "45%" : "100%",
    maxWidth: 180,
  },
  socialMediaIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  socialMediaName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  formContainer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 150,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    backgroundColor: "#333",
    paddingTop: 40,
    paddingBottom: 20,
    marginTop: 'auto',
  },
  footerCol: {
    width: windowWidth > 768 ? "30%" : "48%",
    marginBottom: 20,
  },
  footerTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  footerColTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: "#ccc",
    lineHeight: 20,
  },
  footerLink: {
    fontSize: 14,
    color: "#ccc",
    marginBottom: 8,
  },
  socialLinks: {
    flexDirection: "row",
    marginTop: 10,
  },
  socialButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  footerBottom: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  copyright: {
    fontSize: 13,
    color: "#999",
    textAlign: "center",
  },
});