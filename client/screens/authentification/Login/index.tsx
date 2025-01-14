import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet ,Dimensions,TouchableOpacity,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { login_me } from '../../../lib/apiCalls';
import { useDispatch, useSelector } from 'react-redux'; 
import { setAuthTokenAction } from '../../../lib/redux/auth/authThunks';
import { setUserData } from '../../../lib/redux/user/userSlice';
import pita from "../../../assets/pita.png"
const { width, height } = Dimensions.get("screen");


const Login: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    user_password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.email || !formData.user_password) {
      Alert.alert('Login Error', 'All fields are required');
      setLoading(false);
      return;
    }
      
    try {
        const data = await login_me(formData);
        const {token} = data
        console.log("data from Api above succes",data);
  
        if (token) {
          dispatch(setAuthTokenAction(data.token));
          dispatch(setUserData(data))
  
          setLoading(false);

          Alert.alert('Success', data.message);
          
          setTimeout(() => {
            navigation.navigate('Home' as never); 
          }, 2000);

        } else {
          setLoading(false);
          
          Alert.alert('Error', data.message);
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'An unexpected error occurred');
      }
    };
    
    
  

  return (
    <View style={styles.container}>
      <Image style={{width:width*0.8,height:width*0.8,}} source={pita}></Image>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.user_password}
        onChangeText={(text) => setFormData({ ...formData, user_password: text })}
      />
      <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:"#fff",
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: "rgb(238, 238, 238)",
    width: width * 0.85,
    height: height * 0.07,
    borderRadius: 10,
    textAlign: "center",
    borderColor: "#ffc368",
    borderWidth: 2,
    marginBottom:20
  },
  button:{
    backgroundColor: "#ffc368",
    width: width * 0.85,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom:145
  }
});

export default Login;
