import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, RefreshControl } from 'react-native';
import CardSwiper from 'react-native-card-swipe';
import { Card } from 'react-native-elements';
import { db } from '../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const CardScreen = ({ navigation, route }) => {
	const [deck_ID, setDeck_ID] = useState('');
	const [questions, setQuestions] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		wait(2000).then(() => setRefreshing(false));
	}, []);

	useEffect(() => {
		if (route.params?.id !== '') {
			setDeck_ID(route.params?.id);
		} else {
			console.log('empty');
		}
	}, [route.params?.id]);

	useEffect(() => {
		const cardList = [];

		if (deck_ID !== '') {
			console.log('deck id', route.params?.id);
			db.collection('questions')
				.where('deck_id', '==', deck_ID)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						// console.log(doc.id, ' => ', doc.data());
						cardList.push(doc.data());
					});
					setQuestions(cardList);
				});
		} else {
			console.log('No deck id');
		}
	}, [deck_ID]);

	const renderCard = (item) => {
		return (
			<View>
				<Card key={item._id}>
					<Card.Title h3>{route.params?.title}</Card.Title>
					<Text
						style={{
							marginBottom: 40,
							height: 'auto',
							width: '100%',
							fontSize: 30,
							justifyContent: 'center',
							alignItems: 'center',
							padding: 20
						}}
					>
						{item.title}
					</Text>
				</Card>
			</View>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card title='All done'>
				<Card.Title
					style={{
						marginBottom: 10,
						height: 120,
						width: '100%',
						fontSize: 30,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					There is no more content
				</Card.Title>
				<Button
					title='Get More'
					onPress={() => navigation.navigate('Deck')}
				/>
			</Card>
		);
	};

	return (
		<View style={styles.container}>
			<View>
				<Button
					title='Add a Card'
					onPress={() =>
						navigation.navigate('Create a Card', {
							deckID: route.params?.id,
							title: route.params?.title,
						})
					}
				/>
				<Button title='Refresh Deck' onPress={() => onRefresh} />
			</View>
			{/* <Text>Card from {route.params?.title} deck </Text> */}
			<CardSwiper
				data={questions}
				renderCard={renderCard}
				onSwipeLeft={(item) => {
					console.log(item, 'onSwipeLeft');
					navigation.navigate('Edit a Card', {
						cardID: item._id,
						deckID: route.params?.id,
						title: route.params?.title,
					});
				}}
				onSwipeRight={(item) => console.log(item, 'onSwipeRight')}
				renderNoMoreCards={renderNoMoreCards}
			/>
		</View>
	);
};

export default CardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		backgroundColor: '#fff',
		paddingTop: 110,
	},
});
