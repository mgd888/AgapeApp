import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const CreateDeckScreen = ({ navigation, route }) => {
	const [dTitle, setDtitle] = useState('');

	return (
		<View style={styles.container}>
			<Input
				style={{ fontSize: 20, marginBottom: 10 }}
				placeholder='Deck Title'
				value={dTitle}
				onChangeText={(value) => setDtitle(value)}
			/>
			<Button
				title='Create Deck'
				onPress={() => navigation.navigate("Deck", {
					deckTitle: dTitle
				})}
			></Button>
		</View>
	);
};

export default CreateDeckScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 50,
	},
});
