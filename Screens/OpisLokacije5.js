import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import colors from '../constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';


const OpisLokacije5 = () => {
  const parkingInfo = {
    naziv: "Parking centar",
    adresa: "Vuka Karadžića, Milići",
    radnoVreme: "00-24h",
    cenaPoSatu: "Besplatno",
    ukupnoMesta: 20,
    status: "Javni parking",
    atrakcije: [
      "Gradski trg (50m)",
      "Dom kulture (150m)",
      "Pošta (250m)",
      "Banka (250m)"
    ]
  };

  const otvoriNavigaciju = () => {
    const url = `google.navigation:q=44.168842,19.080209`;
    Linking.openURL(url)
      .catch(err => console.error('Greška pri otvaranju navigacije:', err));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.naziv}>{parkingInfo.naziv}</Text>
          
          <View style={styles.statusBox}>
            <Text style={styles.title}>Status parkinga:</Text>
            <Text style={styles.data}>
              Turistički parking
            </Text>
            <Text style={[styles.statusIndicator, {color: '#4CAF50'}]}>
              Javni parking
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>Informacije o parkingu:</Text>
            <Text style={styles.infoText}>📍 {parkingInfo.adresa}</Text>
            <Text style={styles.infoText}>🕒 Radno vrijeme: {parkingInfo.radnoVreme}</Text>
            <Text style={styles.infoText}>💰 Parking: {parkingInfo.cenaPoSatu}</Text>
            <Text style={styles.infoText}>🚗 Kapacitet: {parkingInfo.ukupnoMesta} mjesta</Text>
            <Text style={styles.infoText}>🚗 Parking za osobe sa invaliditetom: 2</Text>
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
  }
});

export default OpisLokacije5;