"use client";

import { nanoid } from "nanoid";
import React, { createContext, useState } from "react";


const SessionContext = createContext("");


function SessionProvider({ children }: any) {
  const [sessionId, setSessionId] = useState(nanoid());

  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
