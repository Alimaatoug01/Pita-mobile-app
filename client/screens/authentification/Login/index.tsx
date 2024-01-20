import React, { useState } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux'; 
import { login_me } from '../../../lib/apiCalls';
import { setAuthTokenAction } from '../../../lib/redux/auth/authThunks';
import { setUserData } from '../../../lib/redux/user/userSlice';

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
      console.log("data in login", data);
      

      if (data) {
        dispatch(setAuthTokenAction(data.token));
        dispatch(setUserData(data))

        setLoading(false);
        Alert.alert('Welcome to your community', data.message);
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
      <Image style={styles.backgroundImage} source={require('../../../assets/vector70.png')} />
      <Image style={styles.demiCercleImage} source={require('../../../assets/vector74.png')} />
      <Image style={styles.logoImage} source={require('../../../assets/vector94.png')} />

      <View style={styles.inputContainer}>
        <Image style={styles.emailIcon} source={require('../../../assets/vector73.png')} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image style={styles.passwordIcon} source={require('../../../assets/vector93.png')} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formData.user_password}
          onChangeText={(text) => setFormData({ ...formData, user_password: text })}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword' as never)}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
            onPress={loading ? null : handleSubmit}
            disabled={loading}
            style={{
              backgroundColor: loading ? 'gray' : 'orange',
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
            }}
          >
          <Text style={{ color: 'white' }}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  demiCercleImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '100%',
    height: '50%',  // Adjust the height to create a semi-circle effect
    top: -170,         // Align the top of the image
    left: 0,        // Align the left of the image
    borderBottomLeftRadius: 200,  // Adjust the radius to create a semi-circle
    borderBottomRightRadius: 200, // Adjust the radius to create a semi-circle
  },
  logoImage: {
    position: 'absolute',
    resizeMode: 'cover',
    width: '15%',
    height: '15%',  
    top: 65,     
    imagealign : 'center',
        
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 15,
  },
  emailIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'black'
  },
  passwordIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'black'
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  forgotPasswordLink: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
