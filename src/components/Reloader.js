import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, NativeModules } from 'react-native';

const Reloader = () => {
	return (
		<View>
			<Icon
				name='reload'
				size={20}
				style={{ textAlign: 'right', padding: 10, color: 'white' }}
				onPress={() => NativeModules.DevSettings.reload()}
			/>
		</View>
	);
};

export default Reloader;
