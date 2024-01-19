import React,{useState,useEffect} from "react";
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
import axios from "axios";
import { port } from "../../port";

const { width, height } = Dimensions.get("screen");
const UserProfile: React.FC = () => {
  const [hhh,setHhh]=useState([])
  const getData=async()=>{
    const result=await axios.get(`${port}/api/users/1`)
    setHhh(result.data);

    
}

useEffect(()=>{
    
    getData()
},[])
console.log(hhh);
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
