import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import CardSwiper from 'react-native-card-swipe';
import { Card } from 'react-native-elements';
import { db } from '../firebase/config';
import 'firebase/compat/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddIcon from 'react-native-vector-icons/Ionicons';

const CardScreen = ({ navigation, route }) => {
	const [deck_ID, setDeck_ID] = useState('');
	const [questions, setQuestions] = useState([]);

	// check if an id was passed from the other screens
	useEffect(() => {
		if (route.params?.id !== '') {
			setDeck_ID(route.params?.id);
		} else {
			console.log('empty');
		}
	}, [route.params?.id]);

	// fetch cards of the deck from firestore database
	useEffect(() => {
		const cardList = [];

		if (deck_ID !== '') {
			// console.log('deck id', route.params?.id);
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

	// renders cards
	const renderCard = (item, idx) => {
		return (
			item && (
				<View key={idx}>
					<Card key={item._id}>
						<Card.Title h3>{route.params?.title}</Card.Title>
						<TouchableOpacity
							onLongPress={() => {
								navigation.navigate('Edit a Card', {
									cardID: item._id,
									deckID: route.params?.id,
									title: route.params?.title,
								});
							}}
						>
							<Text
								style={{
									marginBottom: 40,
									height: 'auto',
									width: '100%',
									fontSize: 30,
									justifyContent: 'center',
									alignItems: 'center',
									padding: 20,
								}}
							>
								{item.title}
							</Text>
						</TouchableOpacity>

						<View
							key={idx}
							style={{
								flexDirection: 'row',
								flexWrap: 'wrap',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									flexWrap: 'wrap',
									alignItems: 'center',
								}}
							>
								<Text>{item.tags.tag && item.tags.tag} </Text>

								{item.tags.tagsArray &&
									item.tags.tagsArray.map((t, idx) => {
										return <Text>#{t} </Text>;
									})}
							</View>
							<View>
								{item.favorite ? (
									<Icon
										name='heart'
										size={40}
										style={{
											textAlign: 'right',
											color: 'red',
										}}
										onPress={() => {
											db.collection('questions')
												.doc(item._id)
												.update({
													favorite: false,
												})
												.then(() =>
													navigation.navigate('Deck')
												);
										}}
									/>
								) : (
									<Icon
										name='heart-o'
										size={40}
										style={{ textAlign: 'right' }}
										onPress={() => {
											db.collection('questions')
												.doc(item._id)
												.update({
													favorite: true,
												})
												.then(() =>
													navigation.navigate('Deck')
												);
										}}
									/>
								)}
							</View>
						</View>
					</Card>
				</View>
			)
		);
	};

	// render no more card when there are no other cards
	const renderNoMoreCards = () => {
		return (
			<Card key="end" title='All done'>
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
			<View style={{ marginBottom: 20 }}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate('Create a Card', {
							deckID: route.params?.id,
							title: route.params?.title,
						})
					}
				>
					<AddIcon
						style={{ textAlign: 'center' }}
						name='add-circle'
						size={40}
					/>
					<Text style={{ textAlign: 'center' }}>Add a Card</Text>
				</TouchableOpacity>
			</View>
			<CardSwiper
				data={questions}
				renderCard={renderCard}
				onSwipeLeft={(item) => {
					console.log(item, 'onSwipeLeft');
				}}
				onSwipeRight={(item) => 
					console.log(item, 'onSwipeRight')
				}
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
		paddingTop: 30,
	},
});
