import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { db } from '../firebase/config';

// Renders and maps the cards that became the favorite
const FavoriteScreen = () => {
	const [faveCards, setFaveCards] = useState([]);
	useEffect(() => {
		const favoriteList = [];
		db.collection('questions')
			.where('favorite', '==', true)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					console.log(doc.id, ' => ', doc.data());
					favoriteList.push(doc.data());
				});
				setFaveCards(favoriteList);
			})
			.catch((error) => {
				console.log('Error getting documents: ', error);
			});
	}, []);
	return (
		<ScrollView>
			{
				faveCards && faveCards.map((card)=>{
					return(
						<Card key={card._id}>
							<Card.Title>{card.title}</Card.Title>
						</Card>
					)
				})
			}
		</ScrollView>
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
