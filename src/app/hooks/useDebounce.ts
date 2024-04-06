import {useEffect, useRef, useState} from 'react';

type Timer = ReturnType<typeof setTimeout>;
type AnyFunction<T extends any[] = any[], R = any> = (...args: T) => R;

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

export function useDebounceFunction<Func extends AnyFunction>(func: Func, delay: number): Func {
    const timer = useRef<Timer | null>(null);

    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, []);

    return (function (...args) {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            func(...args);
        }, delay);
    }) as Func;
}