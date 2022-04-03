import { StatusBar } from 'expo-status-bar';
import { StyleSheet, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/Tabs';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['componentWillReceiveProps']);

export default function App() {
	return (
		<NavigationContainer>
			<Tabs />
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
