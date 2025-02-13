import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCar, faMap } from '@fortawesome/free-solid-svg-icons';
import NoviPocetnaScreen from './Screens/NoviPocetnaScreen';
import PocetnaScreen from './Screens/PocetnaScreen';
import OpisParkingaScreen from './Screens/OpisParkingaScreen';
import colors from './constants/colors';
import Header from './Components/Header';
import OpisLokacije1 from './Screens/OpisLokacije1';
import OpisLokacije2 from './Screens/OpisLokacije2';
import OpisLokacije3 from './Screens/OpisLokacije3';
import OpisLokacije4 from './Screens/OpisLokacije4';
import OpisLokacije5 from './Screens/OpisLokacije5';
import OpisLokacije6 from './Screens/OpisLokacije6';
import OpisLokacije7 from './Screens/OpisLokacije7';
import OpisLokacije8 from './Screens/OpisLokacije8';
import OpisLokacije9 from './Screens/OpisLokacije9';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OpisStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="OPIS" 
        component={OpisParkingaScreen} 
        options={{
          header: () => <Header title="ParkMe" />
        }}
      />
      <Stack.Screen 
        name="LOKACIJA1" 
        component={OpisLokacije1} 
        options={{
          header: (props) => <Header {...props} title=" Lokacija 1" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA2" 
        component={OpisLokacije2} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 2" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA3" 
        component={OpisLokacije3} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 3" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA4" 
        component={OpisLokacije4} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 4" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA5" 
        component={OpisLokacije5} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 5" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA6" 
        component={OpisLokacije6} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 6" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA7" 
        component={OpisLokacije7} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 7" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA8" 
        component={OpisLokacije8} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 8" showBackButton={true} />
        }} 
      />
      <Stack.Screen 
        name="LOKACIJA9" 
        component={OpisLokacije9} 
        options={{
          header: (props) => <Header {...props} title="Lokacija 9" showBackButton={true} />
        }} 
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="POČETNA"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "POČETNA") {
            return <FontAwesomeIcon icon={faHome} size={size} color={color} />;
          } else if (route.name === "MAPA") {
            return <FontAwesomeIcon icon={faMap} size={size} color={color} />;
          } else if (route.name === "OPIS") {
            return <FontAwesomeIcon icon={faCar} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#A9A9A9',
        tabBarStyle: {
          ...styles.tabBarStyle,
          position: 'absolute',
          bottom: 40,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen 
        name="MAPA" 
        component={PocetnaScreen}
        options={{
          headerShown: true,
          header: () => <Header title="ParkMe" />
        }}
      />
      <Tab.Screen 
        name="POČETNA" 
        component={NoviPocetnaScreen}
        options={{
          headerShown: true,
          header: () => <Header title="ParkMe" />
        }}
      />
      <Tab.Screen 
        name="OPIS" 
        component={OpisStack} 
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.primary} hidden={true}/>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.pozadina,
  },
  tabBarStyle: {
    backgroundColor: colors.pozadina,
    height: 60,
    justifyContent: 'center',
    width: '65%',
    borderRadius: 20,
    marginHorizontal: '20%',
    alignSelf: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingBottom: 0,
    marginBottom: 0,
  },
});
