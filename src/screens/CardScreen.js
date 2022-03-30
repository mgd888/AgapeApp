import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CardSwiper from 'react-native-card-swipe';
import { Card } from 'react-native-elements';

const CardScreen = ({ navigation, route }) => {
	const [questions, setQuestions] = useState([
		{
			id: '1',
			question: 'What makes a good travel companion?',
			deck_id: 'deck_1',
		},
		{
			id: '2',
			question:
				'Have you been to another country? What did you appreciate about the culture there?',
			deck_id: 'deck_1',
		},
		{
			id: '3',
			question:
				'When you travel, do you prefer to do touristy activities or go off the beaten path?',
			deck_id: 'deck_1',
		},
	]);
	useEffect(() => {}, []);

	const renderCard = (item) => {
		return (
			<View>
				<Card key={item.id}>
					<Text
						style={{
							marginBottom: 10,
							height: 150,
							width: '100%',
							fontSize: 30,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{item.question}
					</Text>
				</Card>
			</View>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card title='All done'>
				<Text
					style={{
						marginBottom: 10,
						height: 150,
						width: '100%',
						fontSize: 30,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					There is no more content
				</Text>
				<Button
					title='Get More'
					onPress={() => navigation.navigate('Deck')}
				/>
			</Card>
		);
	};

	return (
		<View style={styles.container}>
			{/* <Text>Card from {route.params?.title} deck </Text> */}
			<CardSwiper
				data={questions}
				renderCard={renderCard}
				onSwipeLeft={(item) => console.log(item, 'onSwipeLeft')}
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
		paddingTop: 160,
	},
});
