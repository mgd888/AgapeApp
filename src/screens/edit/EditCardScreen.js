import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TagInput from 'react-native-tags-input';
import { Input } from 'react-native-elements';
import { TabRouter } from '@react-navigation/native';
import { db } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const EditCardScreen = ({ navigation, route }) => {
	const [cTitle, setCtitle] = useState('');
	const [tags, setTags] = useState({
		tag: '',
		tagsArray: [],
	});
	const [cardID, setCardID] = useState('');

	const updateTagState = (value) => {
		setTags(value);
	};

	useEffect(() => {
		if (route.params?.cardID !== '') {
			setCardID(route.params?.cardID);

			// // PreSet inputs
			db.collection('questions')
				.where('_id', '==', `${route.params?.cardID}`)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, ' => ', doc.data());
						setCtitle(doc.data().title);
						setTags({
							tag: doc.data().tags.tag,
							tagsArray: doc.data().tags.tagsArray,
						});
						if (!doc.data().tags) {
						
							// if (doc.data().tags.tagsArray.size() > 0) {
							// 	console.log("tagsArray")
							// 	setTags({
							// 		tag: '',
							// 		tagsArray: doc.data().tags.tagsArray,
							// 	});
							// } else {
							// 	setTags({
							// 		tag: doc.data().tags.tag,
							// 		tagsArray: [],
							// 	});
							// }
						}
					});
				});
			// 	.catch((error) => {
			// 		console.log('Error getting documents: ', error);
			// 	});
		}
	}, [route.params?.cardID]);
	return (
		<View style={styles.container}>
			<Input
				style={{
					fontSize: 18,
					marginBottom: 10,
					marginLeft: 12,
				}}
				placeholder='What is the question?'
				value={cTitle}
				onChangeText={(value) => setCtitle(value)}
			/>
			<View style={styles.headerWrapper}>
				<TagInput
					updateState={(value) => updateTagState(value)}
					tags={tags}
					placeholder='Card Tags'
				/>
			</View>
			<Button
				title='Edit Question Card'
				onPress={() => {
					//After generating id add the contents from the field to firestore
					cardID &&
						db
							.collection('questions')
							.doc(cardID)
							.update({
								title: cTitle,
								tags: tags,
							})
							.then(function () {
								console.log('Card successfully edited!');
							})
							.catch(function (error) {
								console.error('Error adding card: ', error);
							});

					// add card id to deck's questions array
					db.collection('decks')
						.doc(route.params?.deckID)
						.update({
							questions:
								firebase.firestore.FieldValue.arrayUnion(id),
						});

					navigation.navigate('Card', {
						id: route.params?.deckID,
						title: route.params?.title,
					});
				}}
			></Button>
		</View>
	);
};

export default EditCardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 50,
	},
	headerWrapper: {
		borderBottomColor: 'darkgrey',
		borderBottomWidth: 1,
		marginBottom: 30,
		marginRight: 12,
		marginLeft: 12,
	},
	header: {
		fontSize: 36,
		alignSelf: 'auto',
		color: 'red',
	},
});
