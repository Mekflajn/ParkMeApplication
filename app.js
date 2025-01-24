import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PocetnaScreen from './Screens/PocetnaScreen';
import OpisParkingaScreen from './Screens/OpisParkingaScreen';
import colors from './constants/colors';
import CustomHeader from './Components/Header';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <CustomHeader title="PARKME" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="POCETNA"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color }) => {
              let iconSource;

              if (route.name === "POCETNA") {
                iconSource = require('./assets/home.png'); // Ikonica za početnu
              } else if (route.name === "OPIS") {
                iconSource = require('./assets/car.png'); // Ikonica za opis
              }

              return (
                <Image
                  source={iconSource}
                  style={[styles.icon, { tintColor: color }]} // Primeni boju
                />
              );
            },
            tabBarActiveTintColor: colors.primary, // Plava boja kada je aktivno
            tabBarInactiveTintColor: '#A9A9A9', // Siva boja kada nije aktivno
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: {
              fontSize: 10,
            },
          })}
        >
          <Tab.Screen name="OPIS" component={OpisParkingaScreen} />
          <Tab.Screen name="POCETNA" component={PocetnaScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.pozadina,
    height: 60,
    justifyContent: 'center',
    width: '60%',
    marginBottom: '5%',
    borderRadius: 20,
    marginHorizontal: '20%',
    alignSelf: 'center',
    bottom: 0,
  },
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
