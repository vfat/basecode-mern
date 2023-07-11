import {createGlobalState} from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    login:'none'
});

export {useGlobalState,setGlobalState};