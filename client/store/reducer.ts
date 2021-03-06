import * as Actions from './actions';
import { Song } from '../song/song';
import { User } from './../user/user';
import { GrubState } from './store';


// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: GrubState = {
    user: new User(),
    loginUser: new User(),
    songs: [],
    song: new Song(),

}

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (state: GrubState = initialState, action: Actions.AppAction): GrubState => {
    //console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = {...state}; // If we return this, it will re render the application. (call setState)

    switch (action.type) {    
     
        case Actions.SongActions.GetSongs:
            newState.songs = action.payload as Song[];
            return newState;
        case Actions.SongActions.ChangeSong:
            newState.song = action.payload as Song;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        default: 
            return state;
    }
}

export default reducer;