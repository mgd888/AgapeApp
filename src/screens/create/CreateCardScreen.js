import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import TagInput from 'react-native-tags-input';
import { Input } from 'react-native-elements';
import { db } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const CreateCardScreen = ({ navigation, route }) => {
	const [cTitle, setCtitle] = useState('');
	const [tags, setTags] = useState({
		tag: '',
		tagsArray: [],
	});

	const updateTagState = (value) => {
		setTags(value);
	};

	useEffect(() => {
		// console.log('creating card for deck', route.params?.deckID);
	}, [route.params?.deckID]);

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
					placeholder='Tags'
				/>
			</View>
			<Button
				title='Create Question Card'
				onPress={() => {
					if (cTitle !== '') {
						// Generates id
						const id = db.collection('questions').doc().id;

						//After generating id add the contents from the field to firestore
						db.collection('questions')
							.doc(id)
							.set({
								_id: id,
								title: cTitle,
								favorite: false,
								tags: tags,
								deck_id: route.params?.deckID,
							})
							.then(function () {
								console.log('Card successfully added!');
							})
							.catch(function (error) {
								console.error('Error adding card: ', error);
							});

						// add card id to deck's questions array
						db.collection('decks')
							.doc(route.params?.deckID)
							.update({
								questions:
									firebase.firestore.FieldValue.arrayUnion(
										id
									),
							});

						navigation.navigate('Card', {
							id: route.params?.deckID,
							title: route.params?.title,
						});
					}
					else{
						Alert.alert("Missing Field")
					}
				}}
			></Button>
		</View>
	);
};

export default CreateCardScreen;

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
