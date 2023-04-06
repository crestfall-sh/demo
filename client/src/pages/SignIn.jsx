// @ts-check

import React from 'react';
import * as hs256 from 'modules/hs256.mjs';

/**
 * @type {import('./SignIn').SignIn}
 */
export const SignIn = (props) => {

  const { history, set_session } = props;

  const [email, set_email] = React.useState('');
  const [password, set_password] = React.useState('');

  const sign_in = React.useCallback(async () => {
    try {
      const headers = new Headers();
      headers.set('Content-Type', 'application/json; charset=utf-8');
      const response = await fetch('/authn/sign-in/email', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ email, password }),
      });
      if (response.status >= 400) {
        const response_text = await response.text();
        throw new Error(response_text || String(response.status));
      }
      if (response.status >= 200) {

        if (response.headers.has('content-type') === true) {
          if (response.headers.get('content-type').includes('application/json') === true) {
            const response_json = await response.json();
            set_session(response_json);
          }
        }
        history.push('/');
      }
    } catch (e) {
      console.error(e);
      alert(e.message);
    }
  }, [history, set_session, email, password]);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="w-full md:w-1/2 p-2">
        <div className="py-1 text-left text-xl font-medium">
          Sign in
        </div>
        <form
          className="py-4 flex flex-col justify-start items-center gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            queueMicrotask(sign_in);
          }}
        >
          <div className="w-full">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              autoFocus={true}
              required={true}
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              autoCapitalize="off"
              autoComplete="off"
              spellCheck={false}
              autoFocus={false}
              required={true}
            />
          </div>
          <div className="w-full flex flex-row justify-end">
            <button type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
