import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home/Home";
import UserProfile from "./screens/UserProfile/UserProfile.tsx"
import Services from "./screens/Servicess/services";
import Vets from "./screens/Allvets/Allvets"
import Adoptation from "./screens/Adoptation/Adoptation"
import Navbar from "./screens/Home/Components/Navbar";
import AdoptationDetails from "./screens/AdoptationDetails/AdoptationDetails";
import Allvets from "./screens/Allvets/Components/Veteri"
import Review from "./screens/Allvets/Components/AddRate"
import Onevet from "./screens/Allvets/Components/Onevett";
import Login from "./screens/authentification/Login/index.tsx"
import Register from "./screens/authentification/Register/index.tsx"
import { Provider } from 'react-redux';
import store from "./lib/redux/store"; 
import EditProfile from "./screens/UserProfile/component/EditProfile"

const Stack = createNativeStackNavigator();

// import EditUser

export default function App() {
  return (
    <Provider store={store} >
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
        name="Home"
        component={Home} />
        <Stack.Screen
        name="Register"
        component={Register} />
        <Stack.Screen
        name="Login"
        component={Login} />
        <Stack.Screen
        name="UserProfile"
        component={UserProfile} />
        <Stack.Screen name="EditProfile" 
        component={EditProfile} />
        <Stack.Screen
        name="Services"
        component={Services} />
        <Stack.Screen
        name="vets"
        component={Vets} />
         <Stack.Screen
        name="Allvets"
        component={Allvets} />
        <Stack.Screen
        name="Onevet"
        component={Onevet} />
        <Stack.Screen
        name="Review"
        component={Review} />
         <Stack.Screen
        
        name="Adoptation"
        component={Adoptation} />
         <Stack.Screen
        
        name="AdoptationDetails"
        component={AdoptationDetails} />
      </Stack.Navigator>
      <Navbar/>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4",
    alignItems: "center",
    justifyContent: "center",
  },
});
