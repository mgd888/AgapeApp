import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainStackNav, CardsStackNav, FavStackNav } from './StackNavigator';

// Initialize a constant Tab for the material design themed bottom tab navigation bar
const Tab = createMaterialBottomTabNavigator();

function Tabs() {
	return (
		<Tab.Navigator
			barStyle={{ backgroundColor: '#FAFAFA' }}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === 'Home') {
						iconName = focused ? 'md-home' : 'md-home-outline';
					} else if (route.name === 'Cards') {
						iconName = focused
							? 'list-circle'
							: 'list-circle-outline';
					} else if (route.name === 'Favorites') {
						iconName = focused ? 'heart' : 'heart-outline';
					}

					// You can return any component that you like here!
					return <Ionicons name={iconName} size={20} color={color} />;
				},
				tabBarActiveTintColor: 'white',
				tabBarInactiveTintColor: 'gray',
				
			})}
		>
			<Tab.Screen name='Home' component={MainStackNav} />
			<Tab.Screen name='Cards' component={CardsStackNav} />
			<Tab.Screen name='Favorites' component={FavStackNav} />
		</Tab.Navigator>
	);
}

export default Tabs;
