import { useEffect, useRef } from 'react';
export var useMounted = function () {
    var mounted = useRef(true);
    useEffect(function () {
        return function () {
            mounted.current = false;
        };
    }, []);
    return mounted;
};
