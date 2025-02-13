import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { database } from '../config/FirebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import colors from '../constants/colors';
import { Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';

const OpisLokacije1 = () => {
  const [zauzetaMjesta, setZauzetaMjesta] = useState(null);
  
  const parkingInfo = {
    ukupnoMesta: 5,
    naziv: 'Pametni Parking Milići',
    adresa: 'Vuka Karadžića , Milići',
    atrakcije: [
      'Policijska stanica (50m)',
      'Šetalište pored Jadra (100m)',
      'Dom kulture (100m)',
      'Gradski trg (100m)',
      'Pošta (100m)'
    ],
    koordinate: {
      latitude: 44.170065,
      longitude: 19.078624
    },
    radnoVreme: '00-24h',
    cenaPoSatu: 'Besplatno'
  };

  useEffect(() => {
    const parkingRef = ref(database, 'parking/zauzetaMjesta');

    onValue(parkingRef, (snapshot) => {
      if (snapshot.exists()) {
        setZauzetaMjesta(snapshot.val());
      } else {
        setZauzetaMjesta("Nema podataka");
      }
    });

    return () => {
      off(parkingRef, 'value');
    };
  }, []);

  const otvoriNavigaciju = () => {
    const url = `google.navigation:q=${parkingInfo.koordinate.latitude},${parkingInfo.koordinate.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.naziv}>{parkingInfo.naziv}</Text>
          
          <View style={styles.statusBox}>
            <Text style={styles.title}>Status parkinga:</Text>
            <Text style={styles.data}>
              {zauzetaMjesta !== null ? 
                `Zauzeto: ${zauzetaMjesta}/5 mjesta` : 
                'Učitavanje podataka...'}
            </Text>
            <Text style={[styles.statusIndicator, {color: '#4CAF50'}]}>
              {zauzetaMjesta >= 5 ? 'Status: Parking pun' : 'Status: Ima slobodnih mjesta'}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Informacije o parkingu:</Text>
            <Text style={styles.infoText}>📍 {parkingInfo.adresa}</Text>
            <Text style={styles.infoText}>🕒 Radno vrijeme: {parkingInfo.radnoVreme}</Text>
            <Text style={styles.infoText}>💰 Parking: {parkingInfo.cenaPoSatu}</Text>
            <Text style={styles.infoText}>🚗 Parking za osobe sa invaliditetom: 1</Text>
            <Text style={styles.infoText}>🔌 Punjači za električne automobile: 1</Text>
            <Text style={styles.infoText}>🌐 Besplatan WiFi</Text>
          </View>

          <TouchableOpacity 
            style={styles.navigationButton}
            onPress={otvoriNavigaciju}
          >
            <View style={styles.buttonContent}>
              <FontAwesomeIcon icon={faLocationArrow} size={20} color={colors.pozadina} style={styles.navigationIcon} />
              <Text style={styles.buttonText}>Navigacija do parkinga</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.attractionsContainer}>
            <Text style={styles.sectionTitle}>U blizini se nalazi:</Text>
            {parkingInfo.atrakcije.map((atrakcija, index) => (
              <Text key={index} style={styles.attractionItem}>
                • {atrakcija}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)', 'rgba(255,255,255,1)']}
        style={styles.bottomFade}
      />
      <View style={styles.bottomSpacing} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pozadina,
    paddingBottom: 110,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 110,
  },
  content: {
    padding: 16,
    paddingBottom: 50,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 1,
  },
  bottomSpacing: {
    height: 110,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.pozadina,
    zIndex: 1,
  },
  naziv: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.primary,
  },
  statusBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  data: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statusIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.primary,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  navigationButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  attractionsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  attractionItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
});

export default OpisLokacije1;
