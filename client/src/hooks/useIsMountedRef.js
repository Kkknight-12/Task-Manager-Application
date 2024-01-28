import { useRef, useEffect } from "react"

// ----------------------------------------------------------------------

export default function useIsMountedRef() {
  const isMounted = useRef(true)

  useEffect(() => {
    // console.log("useIsMountedRef=>", isMounted)

    return () => {
      isMounted.current = false
      // console.log("useIsMountedRef cleanup", isMounted)
    }
  }, [])

  return isMounted
}
/*
- https://blog.logrocket.com/understanding-react-useeffect-cleanup-function/#:~:text=The%20useEffect%20Hook%20is%20built,some%20unnecessary%20and%20unwanted%20behaviors.

function ExampleComponent() {
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        ...
    );
}
*/
