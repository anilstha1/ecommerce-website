"use client";

import {SessionProvider} from "next-auth/react";
import React from "react";
import {Provider} from "react-redux";
import {persistor, store} from "../redux/store";
import {PersistGate} from "redux-persist/integration/react";

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <PersistGate loading={"loading"} persistor={persistor}>
      <Provider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </Provider>
    </PersistGate>
  );
};

export default AuthProvider;
