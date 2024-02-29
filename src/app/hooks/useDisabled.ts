import {useState} from "react";

export function useDisabled() {
    const [state, setState] = useState(false);

    const disable = () => {
        setState(true);
    }

    const enable = () => {
        setTimeout(() => {
            setState(false);
        }, 1000);
    }

    return {state, disable, enable};
}