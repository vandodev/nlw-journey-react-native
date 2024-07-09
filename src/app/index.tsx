import {View, Text, StyleSheet} from 'react-native'
export default function index(){
    return(
        // <View style={{flex:1, backgroundColor:"gray", justifyContent:"center"}}>
        <View style={styles.container}>
            <Text>Olá mundo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1, backgroundColor:"gray", justifyContent:"center"
    }
})