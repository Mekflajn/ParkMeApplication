import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from "../constants/colors"

const PocetnaScreen = () =>{

    const [region, setRegion] = useState({
        latitude: 44.17018019923231,
        longitude: 19.07839034766438,
        latitudeDelta: 0.004,
        longitudeDelta: 0.001,
      });


    const LATITUDE_MIN = 44.163835; // Donja leva
    const LATITUDE_MAX = 44.175655; // Gornja desna
    const LONGITUDE_MIN = 19.059973; // Donja leva
    const LONGITUDE_MAX = 19.089821; // Gornja desna

    const handleRegionChange = (newRegion) => {
        // Ograničavamo koordinate
        const latitude = Math.max(LATITUDE_MIN, Math.min(LATITUDE_MAX, newRegion.latitude));
        const longitude = Math.max(LONGITUDE_MIN, Math.min(LONGITUDE_MAX, newRegion.longitude));
    
        // Postavljamo region sa ograničenjima
        setRegion({
          ...newRegion,
          latitude,
          longitude,
        });
      };

    return(
        <View style={styles.screen}>
            <MapView
            style={styles.map}
            mapType="hybrid"
            onRegionChangeComplete={handleRegionChange}
            region={region}>

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
                pinColor="red" // Boja markera
                title="Parking kod doma zdravlja"/>

            <Marker
                coordinate={{
                latitude: 44.165087, 
                longitude: 19.070426,
            }}
                pinColor="red" // Boja markera
                title="Parking kod sportskog centra"/>

            <Marker
                coordinate={{
                latitude: 44.167792, 
                longitude: 19.075389,
            }}
                pinColor="red" // Boja markera
                title="Parking kod motela"/>

            <Marker
                coordinate={{
                latitude: 44.168842, 
                longitude: 19.080209,
            }}
                pinColor="red" // Boja markera
                title="Parking centar"/>

<Marker
                coordinate={{
                latitude: 44.166129,  
                longitude: 19.073974,
            }}
                pinColor="red" // Boja markera
                title="Parking opstina"/>

<Marker
                coordinate={{
                latitude: 44.169561,
                longitude: 19.080109,
            }}
                pinColor="red" // Boja markera
                title="Parking kod marketa"/>
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
        color: "#000", // Boja teksta (možete promeniti)
        fontSize: 12,
      },
});

export default PocetnaScreen;