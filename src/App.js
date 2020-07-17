import React from 'react';
import './App.css';
import logo from './logo.svg';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifyGreetings } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
import * as queries from './graphql/queries';
Auth.configure(awsconfig);
API.configure(awsconfig);


const AuthStateApp = () => {
    const [authState, setAuthState] = React.useState();
    const [user, setUser] = React.useState();


    React.useEffect(() => {
        return onAuthUIStateChange((nextAuthState, authData) => {
            setAuthState(nextAuthState);
            setUser(authData)
        });
    }, []);

  return authState === AuthState.SignedIn && user ? (
      <div className="App">
        <AmplifyGreetings username={user.username}></AmplifyGreetings>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    ) : (
      <AmplifyAuthenticator />
  );
}

export default AuthStateApp;