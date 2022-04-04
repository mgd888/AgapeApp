import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	FlatList,
	StatusBar,
	Pressable,
	ScrollView,
	Image,
} from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import { db } from '../firebase/config';


const HomeScreen = ({ navigation, route }) => {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		if (route.params?.deckTitle) {
			console.log(route.params?.deckTitle);
		}
	}, [route.params?.deckTitle]);

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

		console.log('decks\n', decks);
	}, [route.params?.deckTitle]);

	return (
		<ScrollView>
			{decks &&
				Object.keys(decks).map((d) => {
					return (
						<Card key={decks[d]._id} >
							<Card.Title h3>{decks[d].title}</Card.Title>
							<Card.Image
								source={{
									uri: `https://source.unsplash.com/random/200x100/?${decks[d].title}`,
								}}
							/>
							<Button
								buttonStyle={{ backgroundColor: '#26ACE2', marginTop:20 }}
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
					);
				})}
			<Card>
				<Card.Title h3>Custom Deck</Card.Title>
				<Button
					title='Create a Deck'
					onPress={() => navigation.navigate('Create a Deck')}
					buttonStyle={{ backgroundColor: '#26ACE2' }}
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
