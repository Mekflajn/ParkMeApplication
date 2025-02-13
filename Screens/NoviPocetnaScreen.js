import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCar, faMapMarked, faBus, faInfoCircle, faParking, faExclamationTriangle, faClock, faTruck, faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import colors from '../constants/colors';
import { ref, onValue } from 'firebase/database';
import { database } from '../config/FirebaseConfig';
import LinearGradient from 'react-native-linear-gradient';

const NoviPocetnaScreen = ({ navigation }) => {
  const [zauzetaMjesta, setZauzetaMjesta] = useState(null);

  useEffect(() => {
    const parkingRef = ref(database, 'parking/zauzetaMjesta');
    
    const unsubscribe = onValue(parkingRef, (snapshot) => {
      if (snapshot.exists()) {
        setZauzetaMjesta(snapshot.val());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Dobrodošli</Text>
            <Text style={styles.headerSubtitle}>Pametni parking Milići</Text>
          </View>

          <View style={styles.statusSection}>
            <Text style={styles.sectionTitle}>Status parkinga</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusIndicator, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.statusText}>Većina parkinga je slobodna</Text>
            </View>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('MAPA')}
            >
              <FontAwesomeIcon icon={faMapMarked} size={30} color={colors.primary} />
              <Text style={styles.actionText}>Mapa parkinga</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('OPIS')}
            >
              <FontAwesomeIcon icon={faCar} size={30} color={colors.primary} />
              <Text style={styles.actionText}>Lista parkinga</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.newsSection}>
            <Text style={styles.sectionTitle}>Najnovije informacije</Text>
            <View style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <FontAwesomeIcon icon={faExclamationTriangle} size={20} color={colors.primary} />
                <Text style={styles.newsTitle}>Pametni parking kod policije</Text>
              </View>
              <Text style={styles.newsContent}>
                {zauzetaMjesta !== null ? 
                  `Trenutno popunjeno: ${zauzetaMjesta}/5 mjesta` : 
                  'Učitavanje podataka...'}
              </Text>
              <Text style={styles.newsStatus}>
                {zauzetaMjesta >= 5 ? 'Status: Parking pun' : 'Status: Ima slobodnih mjesta'}
              </Text>
            </View>

            <View style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <FontAwesomeIcon icon={faBus} size={20} color={colors.primary} />
                <Text style={styles.newsTitle}>Parking u prolazu 1 i 2</Text>
              </View>
              <Text style={styles.newsContent}>Radno vrijeme: 00-24h</Text>
              <Text style={styles.newsHighlight}>Besplatan parking za autobuse</Text>
            </View>

            <View style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <FontAwesomeIcon icon={faTruck} size={20} color={colors.primary} />
                <Text style={styles.newsTitle}>Teretni parking u prolazu</Text>
              </View>
              <Text style={styles.newsContent}>Dostupno za kamione 24/7</Text>
              <Text style={styles.newsHighlight}>Obezbijeđen video nadzor</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Statistički pregled</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <FontAwesomeIcon icon={faParking} size={24} color={colors.primary} style={styles.statIcon} />
              <Text style={styles.statNumber}>9</Text>
              <Text style={styles.statLabel}>Ukupno parkinga</Text>
            </View>
            <View style={styles.statBox}>
              <FontAwesomeIcon icon={faCar} size={24} color={colors.primary} style={styles.statIcon} />
              <Text style={styles.statNumber}>220</Text>
              <Text style={styles.statLabel}>Slobodnih mjesta</Text>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <FontAwesomeIcon icon={faTruck} size={24} color={colors.primary} style={styles.statIcon} />
              <Text style={styles.statNumber}>35</Text>
              <Text style={styles.statLabel}>Mjesta za kamione</Text>
            </View>
            <View style={styles.statBox}>
              <FontAwesomeIcon icon={faBus} size={24} color={colors.primary} style={styles.statIcon} />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Mjesta za autobuse</Text>
            </View>
          </View>

          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>Savjeti za parkiranje</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faClock} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Najbolje vrijeme za parking u centru je između 14-16h</Text>
              </View>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faInfoCircle} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Parking kod Doma zdravlja ima posebna mjesta za hitne slučajeve</Text>
              </View>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faParking} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Najveći parking se nalazi kod Sportskog centra sa 50 mjesta</Text>
              </View>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faMapMarked} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Parking Centar je najbliži gradskom jezgru i institucijama</Text>
              </View>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faTruck} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Za kamione su namijenjeni parkinzi u prolazu 1 i 2 na magistralnom putu</Text>
              </View>
              <View style={styles.tipCard}>
                <FontAwesomeIcon icon={faClock} size={20} color={colors.primary} />
                <Text style={styles.tipText}>Parking kod opštine je najzauzetiji radnim danima od 8-15h</Text>
              </View>
            </ScrollView>
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
    paddingBottom: 25,
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
  headerSection: {
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statusSection: {
    marginVertical: 20,
  },
  statusContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 15,
    marginTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '45%',
    elevation: 3,
  },
  statIcon: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  newsSection: {
    marginVertical: 20,
  },
  newsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  newsContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  newsStatus: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 5,
    textAlign: 'right',
  },
  newsHighlight: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
    fontStyle: 'italic',
  },
  tipsSection: {
    marginVertical: 20,
  },
  tipsScroll: {
    flexDirection: 'row',
  },
  tipCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    elevation: 2,
    width: 300,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
});

export default NoviPocetnaScreen;
