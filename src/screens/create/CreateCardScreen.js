import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const CreateCardScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Create Card Screen</Text>
		</View>
	);
};

export default CreateCardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightblue',
	},
});
