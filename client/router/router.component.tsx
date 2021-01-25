import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginComponent from '../user/login.component';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import NavBarComponent from './navbar.component';

import { GrubState } from '../store/store';
import { useSelector } from 'react-redux';

/* Parameter list for RouteProp requires a field for the route that we're on. */
export type StackParams = {
    Login: undefined;

};

const Stack = createStackNavigator<StackParams>();
const headerOptions: StackHeaderOptions = {
    headerTitle: () => <Text>Musical Quad Maniac</Text>,
    headerRight: () => <NavBarComponent />,
};
function RouterComponent(props: any) {

    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={LoginComponent}
                options={headerOptions}
            />
         
        </Stack.Navigator>
    );
}

export default RouterComponent;