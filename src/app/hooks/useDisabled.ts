import {useEffect, useState} from "react";

export const useDisabled = (value: boolean) => {
    const [state, setState] = useState(value);

    useEffect(() => {
        if (value) {
            setState(value);
        }

        if (!value) {
            setTimeout(() => setState(value), 500);
        }
    }, [value]);

    return {state}
}