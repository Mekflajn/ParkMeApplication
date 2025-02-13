import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from "../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo, faXmark, faLocationDot, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const PocetnaScreen = ({ navigation }) => {

    const [region, setRegion] = useState({
        latitude: 44.17018019923231,
        longitude: 19.07839034766438,
        latitudeDelta: 0.004,
        longitudeDelta: 0.001,
      });

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showLegend, setShowLegend] = useState(false);

    const LATITUDE_MIN = 44.163835; 
    const LATITUDE_MAX = 44.175655; 
    const LONGITUDE_MIN = 19.059973; 
    const LONGITUDE_MAX = 19.089821;

    const handleRegionChange = (newRegion) => {
        const latitude = Math.max(LATITUDE_MIN, Math.min(LATITUDE_MAX, newRegion.latitude));
        const longitude = Math.max(LONGITUDE_MIN, Math.min(LONGITUDE_MAX, newRegion.longitude));
    
        setRegion({
          ...newRegion,
          latitude,
          longitude,
        });
      };

    return(
        <View style={styles.screen}>
            <View style={styles.controlsContainer}>
                <View style={styles.spacer} />
                <TouchableOpacity 
                    style={styles.infoButton}
                    onPress={() => setShowInfoModal(true)}
                >
                    <FontAwesomeIcon icon={faCircleInfo} size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                visible={showInfoModal}
                animationType="fade"
                onRequestClose={() => setShowInfoModal(false)}
                propagateSwipe={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setShowInfoModal(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} size={24} color="#666" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Legenda parkinga</Text>
                        <View style={styles.legendItem}>
                            <FontAwesomeIcon icon={faLocationDot} size={20} color="#082ea8" />
                            <Text style={styles.legendText}>Pametni parking</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <FontAwesomeIcon icon={faLocationDot} size={20} color="#FF0000" />
                            <Text style={styles.legendText}>Parking za turiste</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <FontAwesomeIcon icon={faLocationDot} size={20} color="#4CAF50" />
                            <Text style={styles.legendText}>Parking u prolazu</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={styles.legendButton}>
                <TouchableOpacity 
                    onPress={() => setShowLegend(true)}
                >
                    <FontAwesomeIcon icon={faInfoCircle} size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={showLegend}
                onRequestClose={() => setShowLegend(false)}
                statusBarTranslucent={true}
            >
                <TouchableWithoutFeedback onPress={() => setShowLegend(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View style={styles.legendContainer}>
                                <Text style={styles.legendTitle}>Legenda parkinga</Text>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#FF4444' }]} />
                                    <Text style={styles.legendText}>Parking pun</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
                                    <Text style={styles.legendText}>Ima slobodnih mjesta</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#FFA000' }]} />
                                    <Text style={styles.legendText}>Ograničen broj mjesta</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MapView
            style={styles.map}
            mapType="hybrid"
            onRegionChangeComplete={handleRegionChange}
            region={region}
            >

            <Marker
                coordinate={{
                latitude: 44.170065,
                longitude: 19.078624,
            }}
                pinColor='blue'
                title="Parking kod policijske stanice"/>


            <Marker
                coordinate={{
                latitude: 44.169219,
                longitude: 19.077445,
            }}
                pinColor="red" 
                title="Parking kod doma zdravlja"/>

            <Marker
                coordinate={{
                latitude: 44.165087, 
                longitude: 19.070426,
            }}
                pinColor="red" 
                title="Parking kod sportskog centra"/>

            <Marker
                coordinate={{
                latitude: 44.167792, 
                longitude: 19.075389,
            }}
                pinColor="red" 
                title="Parking kod motela"/>

            <Marker
                coordinate={{
                latitude: 44.168842, 
                longitude: 19.080209,
            }}
                pinColor="red" 
                title="Parking centar"/>

            <Marker
                coordinate={{
                latitude: 44.166129,  
                longitude: 19.073974,
            }}
                pinColor="red" 
                title="Parking opstina"/>

            <Marker
                coordinate={{
                latitude: 44.169561,
                longitude: 19.080109,
            }}
                pinColor="red" 
                title="Parking kod marketa"/>

            <Marker
                coordinate={{
                latitude: 44.163926,
                longitude: 19.060899,
            }}
                pinColor="green" 
                title="Parking za kamione 1"/>

                <Marker
                coordinate={{
                latitude: 44.166246, 
                longitude: 19.070779,
            }}
                pinColor="green" 
                title="Parking za kamione 2"/>
                
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    markerContainer: {
        alignItems: "center",
        justifyContent: "center",
      },
      markerText: {
        color: "#000", 
        fontSize: 12,
      },
    controlsContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
    },
    spacer: {
        display: 'none', 
    },
    infoButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        borderWidth: 1.5,
        borderColor: colors.primary,
        elevation: 2,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        paddingTop: 150,
        paddingRight: 10,
        pointerEvents: 'box-none',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        width: 250,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        padding: 8,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 10,
        marginTop: 5,
        textAlign: 'center',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    legendText: {
        fontSize: 14,
        color: '#333',
    },
    legendButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    legendContainer: {
        position: 'absolute',
        top: 60,
        right: 10,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 200,
    },
    legendTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.primary,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
});

export default PocetnaScreen;