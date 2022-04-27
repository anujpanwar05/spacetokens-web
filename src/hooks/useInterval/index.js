import {useEffect, useRef} from "react"

/**
 * use interval react hook, safe!
 * @param callback
 * @param delay
 */
export function useInterval(callback, delay) {
    const savedCallback = useRef()

    useEffect(() => {
        savedCallback.current = callback
    });

    useEffect(() => {
        function tick() {
            savedCallback.current()
        }

        let id = setInterval(tick, delay)
        return () => clearInterval(id)
    }, [delay])
}
