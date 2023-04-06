// @ts-check

/**
 * @typedef {import('./App').session} session
 */

import React from 'react';
import { useHistory } from 'modules/useHistory.mjs';
import { useLocalStorage } from 'modules/useLocalStorage.mjs';
import * as hs256 from 'modules/hs256.mjs';

import Navigation from './components/Navigation';
import Link from './components/Link';

const Home = React.lazy(() => import('./pages/Home'));
const SignIn = React.lazy(() => import('./pages/SignIn'));
const SignUp = React.lazy(() => import('./pages/SignUp'));
const Status403 = React.lazy(() => import('./pages/Status403'));
const Status404 = React.lazy(() => import('./pages/Status404'));

import './App.css';

/**
 * @type {import('./App').get_content}
 */
const get_content = (history, session, set_session) => {
  switch (history.pathname) {
    case '/': {
      return (<Home history={history} session={session} set_session={set_session} />);
    }
    case '/sign-in': {
      if (session instanceof Object) {
        return (<Status403 history={history} />);
      }
      return (<SignIn history={history} set_session={set_session} />);
    }
    case '/sign-up': {
      if (session instanceof Object) {
        return (<Status403 history={history} />);
      }
      return (<SignUp history={history} set_session={set_session} />);
    }
    default: {
      return (<Status404 history={history} />);
    }
  }
};

const App = () => {

  const history = useHistory();

  /**
   * @type {[session, React.Dispatch<session>]}
   */
  const [session, set_session] = useLocalStorage('session', null);

  const content = get_content(history, session, set_session);

  React.useEffect(() => {
    if (typeof session === 'string') {
      try {
        const session_data = hs256.verify_nbf_exp(session);
        console.log({ session_data });
      } catch (e) {
        console.error(e);
        if (e.message === 'ERR_INVALID_TOKEN_EXPIRATION_TIME') {
          alert('Session expired, please sign-in again.');
          history.push('/sign-in');
          set_session(null);
        }
      }
    }
  }, [history, session, set_session]);

  return (
    <div className="App">
      <div className="m-4 flex flex-row justify-center items-center gap-2">
        <svg className="h-12 w-12 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <div>
          <div className="text-left text-2xl font-medium text-slate-900">
            demo
          </div>
          <div className="text-left text-xs font-light text-slate-800">
            crestfall api tests
          </div>
        </div>
      </div>
      <Navigation history={history} session={session} set_session={set_session} />
      <div className="pb-16">
        <React.Suspense fallback={null}>
          { content }
        </React.Suspense>
      </div>
    </div>
  );
};

export default App;
