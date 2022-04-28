import React, { useContext, useEffect, useState } from 'react';
import { createStore, get } from '../services/IonicStorage';

interface Auth {
  loggedIn: boolean;
  userId?: string;
  userJWT?: string;
}

interface AuthInit {
  loading: boolean;
  auth: Auth;
}

export const AuthContext = React.createContext<Auth>({ loggedIn: false });

export function useAuth(): Auth {
  return useContext(AuthContext);
}

export function useAuthInit(): AuthInit {
  const [authInit, setAuthInit] = useState<AuthInit>({ loading: true,auth:{ loggedIn: false} });
  useEffect(() => {

    const setupStore = async () => {
       createStore("APPDB");
      const jwtexists = await get("jwt") ?? "none";
      const userIdexists = await get("userId") ?? "none";
      console.log("Got exists", jwtexists);
      var ans:Auth={loggedIn: false};
      if ( jwtexists == "none"  || userIdexists == "none") {
       return ans;
      }else{
        ans.loggedIn=true;
       ans.userId=userIdexists;
       ans.userJWT=jwtexists;
        return ans;
      }
    };

    (async () => {
      return setupStore().then((user) => {
        const auth = user.loggedIn ?
          { loggedIn: true, userId: user.userId, userJWT: user.userJWT } :
          { loggedIn: false };
        setAuthInit({ loading: false, auth });
      });
    })()
   

  }, []);

  return authInit;
}