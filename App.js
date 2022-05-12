//App.js
/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/
import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Button,
    Text,
    View
} from 'react-native';
import stripe from 'tipsi-stripe'
const App = () => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState(null)
    stripe.setOptions({
        publishableKey: 'pk_test_51Jeyk8SIVRpH1x6YPtTY9SxCi7K90ahWDPNOLXjVEg4FUpBklWXVVgNXrr3jwqljY2Rt8QVA9gVHqJRaL4bBjYTS00mlhjvdC8',
    })
    const handleCardPayPress = async () => {
      const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 25,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
      }
        // const options = {}
        const token = await stripe.createTokenWithCard(params)
        console.log(token)



        // try {
        //     setLoading(true)
        //     const token = await stripe.paymentRequestWithCardForm()
        //     console.log('Token from Card ', token)
        //     setToken(token)
        //     setLoading(false)
        // } catch (error) {
        //     console.log('handleCardPayPress Error ', error)
        //     setLoading(false)
        // }
    }
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>
                    Card Form Example
                </Text>
                <Text style={styles.instruction}>
                    Click button to show Card Form dialog.
                </Text>
                <Button
                    title="Enter you card and pay"
                    onPress={handleCardPayPress}
                 />
                <View style={styles.token}>
                    {token &&
                    <Text style={styles.instruction}>
                        Token: {token.id}
                    </Text>
                    }
                </View>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instruction: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    token: {
        height: 20,
    },
});
export default App;