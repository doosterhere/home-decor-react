import {useLocation} from "react-router-dom";
import {useEffect} from "react";

export function useScrollToAnchor() {
    const {pathname, hash, key} = useLocation();

    useEffect(() => {
        if (hash !== '') {
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({behavior: 'smooth'});
                }
            }, 0);
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname, hash, key]);
}