import { useCallback, useState } from "react";

/**
 * Wraps a mutation: `submit(...args)` resolves to the action's result (true for an empty reply), or undefined on failure,
 * while `submitting` and `error` (a message string) are tracked for the UI.
 */
export default function useSubmit(action) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(
    async (...args) => {
      setSubmitting(true);
      setError(null);
      try {
        const result = await action(...args);
        // Many endpoints reply 200 with an empty body; still report success.
        return result === undefined || result === null || result === "" ? true : result;
      } catch (e) {
        setError(e.message);
        return undefined;
      } finally {
        setSubmitting(false);
      }
    },
    [action]
  );

  return { submit, submitting, error, setError };
}
