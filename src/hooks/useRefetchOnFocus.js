import { useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";

// Calls `refetch` when the screen regains focus (skips the initial focus, which useAsync already covers).
export default function useRefetchOnFocus(refetch) {
  const refetchRef = useRef(refetch);
  refetchRef.current = refetch;
  const isFirstFocus = useRef(true);

  useFocusEffect(
    useCallback(() => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      refetchRef.current();
    }, [])
  );
}
