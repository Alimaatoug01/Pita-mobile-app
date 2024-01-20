// import React, { useState, useEffect } from 'react';
// import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch, useSelector} from 'react-redux';
// import { updateUserData, selectUserData } from '../../../lib/redux/user/userSlice';
// import { AppDispatch } from '../../../lib/redux/store';


// const EditUserInfo
// : React.FC = () => {
//     const navigation = useNavigation();
//     const dispatch: AppDispatch = useDispatch();
//     const userData = useSelector((state: RootState) => state.user.userData); 
    
//     useEffect(() => {
//         const update = async () => {
//           try {
//             const actionResult = await dispatch(updateUserData({ fname: 'aymen' }));
            
//             console.log('Action Result:', actionResult);
//           } catch (error) {
//             console.error('Error dispatching updateUserData:', error);
//           }
//         };
//         update();
//       }, [dispatch, userData]);
  
   
//     return (
//       <View></View>
//     );
//   };
  
//   export default EditUserInfo
//   ;
  
