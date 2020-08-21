import React, { useState, useEffect } from 'react';


export default function usePersistedState(key, defaultValue) {
    const [state, setState] = useState(() => { 
           const persistedState = localStorage.getItem(key);
           return persistedState ? JSON.parse(persistedState) : defaultValue;
       }
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
};