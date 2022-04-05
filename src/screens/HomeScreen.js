import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { db } from '../firebase/config';

const HomeScreen = ({ navigation, route }) => {
	const [decks, setDecks] = useState([]);

	// checks if deck title passed from a screen
	useEffect(() => {
		if (route.params?.deckTitle) {
			//console.log(route.params?.deckTitle);
		}
	}, [route.params?.deckTitle]);

	// fetch decks from firestore database
	useEffect(async () => {
		const deckList = [];

		db.collection('decks')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					deckList.push(doc.data());
				});
				setDecks(deckList);
			});

		//console.log('decks\n', decks);
	}, [route.params?.deckTitle]);

	return (
		<ScrollView>
			{/* Map out decks on screen */}
			{decks &&
				Object.keys(decks).map((d, idx) => {
					return (
						<View key={idx}>
							<TouchableOpacity
								onLongPress={() =>
									navigation.navigate('Edit a Deck', {
										deckID: decks[d]._id,
									})
								}
							>
								<Card key={decks[d]._id}>
									<Card.Title h3>{decks[d].title}</Card.Title>
									<Card.Image
										source={{
											uri: `https://source.unsplash.com/random/800x600/?${decks[d].title}`,
										}}
									/>
									<Button
										buttonStyle={{
											backgroundColor: '#26ACE2',
											marginTop: 20,
										}}
										title='Select Deck'
										onPress={() =>
											navigation.navigate('Card', {
												title: decks[d].title,
												id: decks[d]._id,
											})
										}
									>
										<Text>Select Deck</Text>
									</Button>
								</Card>
							</TouchableOpacity>
						</View>
					);
				})}
			<Card containerStyle={{ marginBottom: 20 }}>
				<Card.Title h3>Custom Deck</Card.Title>
				<Card.Image
					source={{
						uri: `https://source.unsplash.com/random/800x600/?custom`,
					}}
				/>
				<Button
					title='Create a Deck'
					onPress={() => navigation.navigate('Create a Deck')}
					buttonStyle={{ backgroundColor: '#26ACE2', marginTop: 20 }}
				></Button>
			</Card>
		</ScrollView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
	},
	item: {
		backgroundColor: '#7ACDE9',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
		color: '#fafafa',
	},
});
