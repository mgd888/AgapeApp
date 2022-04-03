import { db } from '../../firebase/config';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import TagInput from 'react-native-tags-input';

const CreateDeckScreen = ({ navigation, route }) => {
	const [dTitle, setDtitle] = useState('');
	const [tags, setTags] = useState({
		tag: '',
		tagsArray: [],
	});

	const updateTagState = (value) => {
		setTags(value);
	};

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
				title='Create Deck'
				onPress={() => {
					// Generates id
					const id = db.collection('decks').doc().id;

					//After generating id add the contents from the field to firestore
					db.collection('decks')
						.doc(id)
						.set({
							_id: id,
							title: dTitle,
							favorite: false,
							questions: [],
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

export default CreateDeckScreen;

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
