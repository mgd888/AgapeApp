import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditCardScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Edit Card Screen</Text>
		</View>
	);
};

export default EditCardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightblue',
	},
});
Edit