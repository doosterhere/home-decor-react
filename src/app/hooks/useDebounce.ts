import {useEffect, useRef, useState} from 'react';

type Timer = ReturnType<typeof setTimeout>;
type SomeFunction = (...args: any[]) => void;

export function useDebounceValue<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}

export function useDebounceFunction<Func extends SomeFunction>(func: Func, delay: number) {
    const timer = useRef<Timer | null>(null);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return (function (...args: any[]) {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            func(...args);
        }, delay);
    }) as Func;
}