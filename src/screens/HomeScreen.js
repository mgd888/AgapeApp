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
} from 'react-native';
import { Card, ListItem, Icon, Button } from 'react-native-elements';
import { db } from '../firebase/config';

const DECK_DATA = [
	{
		id: '1',
		title: 'Travel',
	},
	{
		id: '2',
		title: 'Childhood Memories',
	},
	{
		id: '3',
		title: 'Interesting Experiences',
	},
	{
		id: '4',
		title: 'Everday Life',
	},
	{
		id: '5',
		title: 'Family Relationships',
	},
	{
		id: '6',
		title: 'Friendships',
	},
	{
		id: '7',
		title: 'Personality',
	},
	{
		id: '8',
		title: 'College & Career',
	},
	{
		id: '9',
		title: 'Philosophy',
	},
	{
		id: '10',
		title: 'Community Involvement',
	},
	{
		id: '11',
		title: 'Theology & Doctrine',
	},
	{
		id: '12',
		title: 'Personal Faith',
	},
	{
		id: '13',
		title: 'Local Church',
	},
];

const HomeScreen = ({ navigation, route }) => {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		if (route.params?.deckTitle) {
			console.log(route.params?.deckTitle);
		}
	}, [route.params?.deckTitle]);

	useEffect(async () => {

		const deckList = []

		db.collection('decks')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// console.log(`${doc.id} => `, doc.data());
					deckList.push(doc.data())
					// decks.push(JSON.stringify(doc.data()));
					// decks.push(doc.data());
					// setDecks([...decks, doc.data()])
				});
				setDecks(deckList)
			});

		console.log('decks\n', decks);
	}, [route.params?.deckTitle]);

	return (
		<ScrollView>
			{decks &&
				Object.keys(decks).map((d, i) => {
					return (
						<Card key={decks[d]._id}>
							<Card.Title h3>{decks[d].title}</Card.Title>
							<Button
								title='Select Deck'
								onPress={() =>
									navigation.navigate('Card', {
										title: decks[d].title,
										id: decks[d]._id,
									})
								}
							></Button>
						</Card>
					);
				})}
			{/* {DECK_DATA &&
				DECK_DATA.map((deck, idx) => {
					return (
						<Card key={idx}>
							<Card.Title h3>{deck.title}</Card.Title>
							<Button
								title='Select Deck'
								onPress={() =>
									navigation.navigate('Card', {
										title: deck.title,
									})
								}
							></Button>
						</Card>
					);
				})} */}
			<Card>
				<Card.Title h3>Custom Deck</Card.Title>
				<Button
					title='Create a Deck'
					onPress={() => navigation.navigate('Create a Deck')}
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
