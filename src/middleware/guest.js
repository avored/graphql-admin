
import { AUTH_TOKEN } from '../constants/index';
import isNil from 'lodash/isNil';

export default function() {
    let accessToken = localStorage.getItem(AUTH_TOKEN);
    
    return isNil(accessToken);
}
