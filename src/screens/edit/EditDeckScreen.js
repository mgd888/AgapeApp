import { db } from '../../firebase/config';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import TagInput from 'react-native-tags-input';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const EditDeckScreen = ({ navigation, route }) => {
	const [dTitle, setDtitle] = useState('');
	const [deckId, setDeckID] = useState('');
	const [tags, setTags] = useState({
		tag: '',
		tagsArray: [],
	});

	const updateTagState = (value) => {
		setTags(value);
	};

	useEffect(() => {
		if (route.params?.deckID !== '') {
			setDeckID(route.params?.deckID);

			// // PreSet inputs
			db.collection('decks')
				.where('_id', '==', `${route.params?.deckID}`)
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, ' => ', doc.data());
						setDtitle(doc.data().title);
						if (doc.data().tags.size() > 0) {
							setTags({
								tag: doc.data().tags.tag,
								tagsArray: doc.data().tags.tagsArray,
							});
						}
					});
				});
		}
	}, [route.params?.deckID]);

	return (
		<View style={styles.container}>
			<Input
				style={{ fontSize: 20, marginBottom: 10 }}
				placeholder='Deck Title'
				value={dTitle}
				onChangeText={(value) => setDtitle(value)}
			/>
			<View style={styles.headerWrapper}>
				<TagInput
					updateState={(value) => updateTagState(value)}
					tags={tags}
					placeholder='Deck Tags'
				/>
			</View>
			<Button
				title='Update Deck'
				onPress={() => {
					// Generates id

					//After generating id add the contents from the field to firestore
					db.collection('decks')
						.doc(deckId)
						.update({
							title: dTitle,
							tags: tags,
						})
						.then(function () {
							console.log('Deck successfully added!');
						})
						.catch(function (error) {
							console.error('Error adding deck: ', error);
						});

					navigation.navigate('Deck', {
						deckTitle: dTitle,
					});
				}}
			></Button>
		</View>
	);
};

export default EditDeckScreen;

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
