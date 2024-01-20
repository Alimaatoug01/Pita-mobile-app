import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import UserPets from "./component/UserPets";
import UserInfo from "./component/UserInfo";
import user from '../../assets/user.jpg'
import Navbar from "../Home/Components/Navbar";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("screen");
const UserProfile: React.FC = () => {

  const user =  useSelector((state: RootState) => state.user.userData); 
  console.log("userEmail in profile", user.pets);
  


  return (
    <View style={styles.container}>
    <ScrollView>
        <View><Image style={{width:width*1,height:height*0.35}} source={user}></Image></View>
      <View style={styles.UsersProfile}>
        <UserInfo />
        <UserPets />
      </View>
    </ScrollView>
    <Navbar/>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
  UsersProfile: {
    display: "flex",
  },
});
export default UserProfile;
