import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";

import {useAppDispatch} from "./hooks/redux";
import {fetchCategories} from "./store/reducers/categoryActionCreator";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <div>
            <AppRouter/>
        </div>
    );
}

export default App;
