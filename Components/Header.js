import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Header = ({ title, style, showBackButton = false }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.headerContainer, style]}>
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <FontAwesomeIcon icon={faArrowLeft} size={30} color={colors.pozadina} />
          </TouchableOpacity>
        )}


        <Text style={styles.headerTitle}>{title}</Text>

        <Image
          source={require("../assets/parkmelogo192.png")}
          style={styles.logo}
        />
      </View>
      
      <View style={styles.sloganContainer}>
        <Text style={styles.sloganText}>
          Brzo • Lako • Pametno
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.primary,
    borderBottomWidth: 3,
    borderBottomColor: colors.line,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 60,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 30,
    zIndex: 10,
  },
  backIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: "white",
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    position: "absolute",
    right: 10,
    top: 25,
  },
  sloganContainer: {
    paddingBottom: 8,
    paddingTop: 2,
    alignItems: 'center',
  },
  sloganText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  subSloganText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default Header;
