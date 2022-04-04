import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { db } from '../firebase/config';

const CardsScreen = () => {
	const [cards, setCards] = useState([]);
	useEffect(() => {
		const cardList = [];
		db.collection('questions')
			.orderBy('title', 'asc')
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					cardList.push(doc.data());
				});
				setCards(cardList);
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	}, []);

	return (
		<ScrollView>
			{cards &&
				cards.map((card, idx) => {
					return (
						<View key={idx}>
							<Card key={card._id}>
								<Card.Title>{card.title}</Card.Title>
							</Card>
						</View>
					);
				})}
		</ScrollView>
	);
};

export default CardsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
});
