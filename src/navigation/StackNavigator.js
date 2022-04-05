import React from 'react';
import { Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CardScreen from '../screens/CardScreen';
import CardsScreen from '../screens/CardsScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import CreateDeckScreen from '../screens/create/CreateDeckScreen';
import CreateCardScreen from '../screens/create/CreateCardScreen';
import EditCardScreen from '../screens/edit/EditCardScreen';
import EditDeckScreen from '../screens/edit/EditDeckScreen';
import Reloader from '../components/Reloader';
const Stack = createNativeStackNavigator();

const screenOptionStyle = {
	headerStyle: {
		backgroundColor: '#26ACE2',
	},
	headerTintColor: 'white',
	headerBackTitle: 'Back',
};

const MainStackNav = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen
				name='Deck'
				component={HomeScreen}
				options={{
					headerRight: () => <Reloader />,
				}}
			/>
			<Stack.Screen name='Card' component={CardScreen} />
			<Stack.Screen name='Create a Deck' component={CreateDeckScreen} />
			<Stack.Screen name='Create a Card' component={CreateCardScreen} />
			<Stack.Screen name='Edit a Deck' component={EditDeckScreen} />
			<Stack.Screen name='Edit a Card' component={EditCardScreen} />
		</Stack.Navigator>
	);
};

const CardsStackNav = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name='Card List' component={CardsScreen} />
			<Stack.Screen name='Card' component={CardScreen} />
		</Stack.Navigator>
	);
};

const FavStackNav = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name='Favorites List' component={FavoriteScreen} />
			<Stack.Screen name='Card' component={CardScreen} />
		</Stack.Navigator>
	);
};

export { MainStackNav, CardsStackNav, FavStackNav };
