import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, StatusBar } from "react-native";
import colors from "../constants/colors";

const Header = props => {
    return(
        <SafeAreaView>
            <StatusBar translucent={true}/>
            <View style={{...styles.header, ...props.style}}>
                <Text style={styles.headerTitle}>{props.title}</Text>

                <View style={styles.logoContainer}>
                    <Image
                        source={require("../assets/parkmelogo192.png")}
                        style={styles.logo}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header:{
        flexDirection: 'row',
        width: '100%',
        height: 100,
        paddingTop: 30,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: colors.linija
    },
    headerTitle:{
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        right: 0,
        paddingTop: 30
    },
    logoContainer: {
        position: 'absolute',
        paddingTop: 30,
        right: 10
      },
      logo: {
        width: 48,
        height: 48,
        resizeMode: "contain",
      },
});

export default Header;