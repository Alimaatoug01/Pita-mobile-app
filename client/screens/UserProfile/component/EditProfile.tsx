import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData, selectUserData } from '../../../lib/redux/user/userSlice';
import { AppDispatch } from '../../../lib/redux/store';

const EditProfile: React.FC = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);

  const [editedData, setEditedData] = useState({
    fname: userData.fname,
    lname: userData.lname,
    password: userData.password,
  });

  const handleSavePress = async () => {
    try {
      // Dispatch the action to update user data
      const actionResult = await dispatch(updateUserData(editedData));

      // Log the action result
      console.log('Action Result:', actionResult);

      // Navigate back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error('Error dispatching updateUserData:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit User Information</Text>
      <View style={styles.inputContainer}>
        <Text>FName:</Text>
        <TextInput
          style={styles.input}
          value={editedData.fname}
          onChangeText={(text) => setEditedData({ ...editedData, fname: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>LName:</Text>
        <TextInput
          style={styles.input}
          value={editedData.lname}
          onChangeText={(text) => setEditedData({ ...editedData, lname: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={editedData.password}
          onChangeText={(text) => setEditedData({ ...editedData, password: text })}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={{ color: 'white' }}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 40,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default EditProfile;
