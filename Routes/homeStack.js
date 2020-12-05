import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import SignIn from '../app/screens/SignIn';
import SignUp from '../app/screens/SignUp';

const screens = {

    SignIn : {
        screen: SignIn
    },
    SignUp : {
        screen : SignUp
    }
}

const HomeStack= createStackNavigator(screens);

export default createAppContainer(HomeStack);
