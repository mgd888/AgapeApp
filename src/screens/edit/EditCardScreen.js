import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
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

	const showAlert = () =>
		Alert.alert(
			'Delete Card',
			'Are you sure you want to delete the selected card? This action cannot be undone.',
			[
				{
					text: 'Delete',
					onPress: () => {
						// delete from questions collection in firestore
						cardID &&
							db
								.collection('questions')
								.doc(cardID)
								.delete()
								.then(() => {
									console.log(
										'Document successfully deleted!'
									);
								})
								.catch((error) => {
									console.error(
										'Error removing document: ',
										error
									);
								});

						cardID &&
							db
								.collection('decks')
								.doc(route.params?.deckID)
								.update({
									questions:
										firebase.firestore.FieldValue.arrayRemove(
											cardID
										),
								})
								.then(() => {
									console.log(
										'Document successfully removed cardID!'
									);
									return true;
								})
								.catch((error) => {
									console.log(error);
									return false;
								});

						Alert.alert('Successfully deleted card.')
						// navigate to card screen after
						navigation.navigate('Card', {
							id: route.params?.deckID,
							title: route.params?.title,
						});
					},
				},
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
			],
			{
				cancelable: true,
				onDismiss: () =>
					Alert.alert(
						'This alert was dismissed by tapping outside of the alert dialog.'
					),
			}
		);
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
			<Button title='Remove Card' color={'red'} onPress={showAlert} />
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
