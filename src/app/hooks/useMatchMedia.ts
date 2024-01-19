import {useState, useLayoutEffect} from 'react';

import {queries} from "../constants";

import {screenMatches} from "../types";

export const useMatchMedia = (): screenMatches => {
    if (typeof window === 'undefined') return {} as screenMatches;

    const mediaQueryLists = queries.map(query => matchMedia(query));
    const getValues = () => mediaQueryLists.map(list => list.matches);
    const [values, setValues] = useState(getValues);

    useLayoutEffect(() => {
        const handler = () => setValues(getValues);

        mediaQueryLists.forEach(list => list.addEventListener('change', handler));

        return () => mediaQueryLists.forEach(list => list.removeEventListener('change', handler));
    }, []);

    return ['isMobile', 'isTablet', 'isDesktop']
        .reduce((acc, screen, index) => ({
            ...acc,
            [screen]: values[index]
        }), {} as screenMatches);
}