import React, {useEffect} from 'react';
import { ScrollView, View, Text,StyleSheet ,Dimensions , TouchableOpacity} from 'react-native';
import  LostAndFound from "./Components/LostAndFound"
import Carosel from "./Components/Carosel"
import Publicite from "./Components/Publicité"
import Adoptation from './Components/Adoptation';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../lib/redux/user/userSlice';
import { AppDispatch } from '../../lib/redux/store';


const { width, height } = Dimensions.get('screen')


const Home: React.FC = (): React.ReactElement => {

    
    


    return (
        <ScrollView >
            <View style={styles.allPages}>
               <Publicite/>
               <Carosel/>
               <Adoptation   />
               <LostAndFound/>
            </View>
        </ScrollView>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffc368",
        justifyContent: 'center',
        alignItems: 'center',
    },
    allPages: {
   backgroundColor:"#ffc368",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
        gap:20,
        marginBottom:75,
       
    },})
export default Home;

