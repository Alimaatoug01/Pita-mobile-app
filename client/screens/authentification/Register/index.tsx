
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; 
import { register_me } from '../../../lib/apiCalls';

interface FormData {
  user_fname: string;
  user_lname: string;
  user_Email: string;
  user_password: string;
  user_image: string | null; 
}

const Register: React.FC = () => {
  
  const navigation = useNavigation();

  const [formData, setFormData] = useState<FormData>({
    user_fname: '',
    user_lname: '',
    user_Email: '',
    user_password: '',
    user_image: null,
  });

  const [loading, setLoading] = useState(false);

  // Function to handle image selection
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled === true) {
      return;
    }

    setFormData({ ...formData, user_image: (pickerResult as any).uri });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.user_Email || !formData.user_password || !formData.user_fname || !formData.user_lname) {
      Alert.alert('Registration Error', 'All fields are required');
      setLoading(false);
      return;
    }

    try {
    const data = await register_me(formData);
    console.log("data",data);
    

    if (data.success) {
      setLoading(false);
      Alert.alert('Success', data.message);
       setTimeout(() => {
            navigation.navigate('login' as never); 
          }, 2000);
        
    } else {
      setLoading(false);
      Alert.alert('Error', data.message);
    }}
    catch (error) {
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
        placeholder="First Name"
        value={formData.user_fname}
        onChangeText={(text) => setFormData({ ...formData, user_fname: text })}
        style={styles.input}
      />
      </View>

      <View style={styles.inputContainer}>
      <Image style={styles.emailIcon} source={require('../../../assets/vector73.png')} />
      <TextInput
        placeholder="Family Name"
        value={formData.user_lname}
        onChangeText={(text) => setFormData({ ...formData, user_lname: text })}
        style={styles.input}
      />
      </View>
      
      <View style={styles.inputContainer}>
        <Image style={styles.RegisteremailIcon} source={require('../../../assets/email.png')} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.user_Email}
          onChangeText={(text) => setFormData({ ...formData, user_Email: text })}
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
  
      {formData.user_image && <Image source={{ uri: formData.user_image }} style={styles.imagePreview} />}
  
      <TouchableOpacity onPress={selectImage} style={styles.selectImageButton}>
        <Text style={styles.selectImageButtonText}>Select Image</Text>
      </TouchableOpacity>
  
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword' as never)}
        style={styles.forgotPasswordLink}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
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
        <Text style={{ color: 'white' }}>{loading ? 'Registering...' : 'Register'}</Text>
      </TouchableOpacity>
    </View>
  );
      }

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
  RegisteremailIcon: {
    width: 15,
    height: 15,
    marginRight: 15,
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
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  selectImageButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  selectImageButtonText: {
    color: 'white',
  },
  forgotPasswordLink: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'black',
    textAlign: 'center',
  },
});


export default Register;


