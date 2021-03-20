import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 15
    },
    leftContainer: {
        flexDirection: 'row'
    },
    avatar: {
        width: 60,
        height: 60,
        marginRight: 10,
        borderRadius: 50
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16
    },
    lastmessage: {
        fontSize: 16,
        color: 'grey'
    },
    time: {
        fontSize: 14,
        color: 'grey'
    },
    midContainer: {
        justifyContent: 'space-around'
    }
});

export default styles;