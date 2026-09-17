import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Runs an async loader whenever `deps` change and tracks { data, loading, error }.
 * `refetch` runs it again; `setData` patches data locally. Stale responses are ignored.
 */
export default function useAsync(loader, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const callId = useRef(0);

  const refetch = useCallback(async () => {
    const id = ++callId.current;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await loader();
      if (id === callId.current) setState({ data, loading: false, error: null });
    } catch (error) {
      if (id === callId.current) setState((prev) => ({ ...prev, loading: false, error }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    refetch();
    return () => {
      callId.current++;
    };
  }, [refetch]);

  const setData = useCallback((update) => {
    setState((prev) => ({ ...prev, data: typeof update === "function" ? update(prev.data) : update }));
  }, []);

  return { ...state, refetch, setData };
}
