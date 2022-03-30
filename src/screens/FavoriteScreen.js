import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FavoriteScreen = () => {
	return (
		<View style={styles.container}>
			<Text>Favorite Screen</Text>
		</View>
	);
};

export default FavoriteScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
});
