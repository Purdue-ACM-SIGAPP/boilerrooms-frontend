import React, { createContext, useContext, useMemo, useState } from "react";

const SessionContext = createContext(null);

/**
 * In-memory session: just the Boiler Rooms profile id (api/User).
 * There is no token — the API is open and accounts are created from the login screen.
 */
export function SessionProvider({ children }) {
  const [userId, setUserId] = useState(null);

  const value = useMemo(
    () => ({
      userId,
      setUserId,
      signIn: setUserId,
      signOut: () => setUserId(null),
    }),
    [userId]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside SessionProvider");
  return context;
}
