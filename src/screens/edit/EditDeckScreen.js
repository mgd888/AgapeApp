import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EditDeckScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Edit Deck Screen</Text>
		</View>
	);
};

export default EditDeckScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'lightblue',
	},
});
