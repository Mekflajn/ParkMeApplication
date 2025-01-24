import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import colors from "../constants/colors";
import Card from "../Components/Card";

const OpisParkingaScreen = () =>{
    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.screen}>
                <Card style={styles.card}>
                    <View style={styles.glavniContainer}>
                        <Text style={styles.text}>PARKING LOKACIJA 1:</Text>
                        <Text style={styles.naziv}>Parking kod policijske stanice</Text>
                        <View style={styles.maliTekstContainer}>
                            <Text style={styles.maliTekst}>Kliknite za više informacija!</Text>
                        </View>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <View style={styles.glavniContainer}>
                        <Text style={styles.text}>PARKING LOKACIJA 2:</Text>
                        <Text style={styles.naziv}>Parking kod doma zdravlja</Text>
                        <View style={styles.maliTekstContainer}>
                            <Text style={styles.maliTekst}>Kliknite za više informacija!</Text>
                        </View>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <View style={styles.glavniContainer}>
                        <Text style={styles.text}>PARKING LOKACIJA 3:</Text>
                        <Text style={styles.naziv}>Parking kod sportskog centra</Text>
                        <View style={styles.maliTekstContainer}>
                            <Text style={styles.maliTekst}>Kliknite za više informacija!</Text>
                        </View>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <View style={styles.glavniContainer}>
                        <Text style={styles.text}>PARKING LOKACIJA 4:</Text>
                        <Text style={styles.naziv}>Parking kod motela</Text>
                        <View style={styles.maliTekstContainer}>
                            <Text style={styles.maliTekst}>Kliknite za više informacija!</Text>
                        </View>
                    </View>
                </Card>

                <Card style={styles.card}>
                    <View style={styles.glavniContainer}>
                        <Text style={styles.text}>PARKING LOKACIJA 5:</Text>
                        <Text style={styles.naziv}>Parking centar</Text>
                        <View style={styles.maliTekstContainer}>
                            <Text style={styles.maliTekst}>Kliknite za više informacija!</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        marginBottom: 210,
        marginBottom: 210,
        flexGrow: 1
    },
    screen:{
        flex: 1,
        width: '100%',
        padding: 10,
        alignItems: 'center',
        backgroundColor: colors.pozadina,
    },
    card: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        borderRadius: 20
    },
    glavniContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        textAlign: 'center',
        marginBottom: 10
    },
    naziv: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 5
    },
    maliTekstContainer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    maliTekst: {
        fontSize: 12,
        textAlign: 'center'
    }
});

export default OpisParkingaScreen;