// @ts-check

import React from 'react';
import Link from './Link';
import './Navigation.css';

export const Navigation = (props) => {
  const { history, session, set_session } = props;
  return (
    <div className="m-2 p-2 border-y border-slate-200 flex flex-row flex-wrap justify-center items-center gap-2">
      <Link className="navigation-button" history={history} href="/">
        Home
      </Link>
      { session === null && (
        <React.Fragment>
          <Link className="navigation-button" history={history} href="/sign-in">
            Sign in
          </Link>
          <Link className="navigation-button" history={history} href="/sign-up">
            Sign up
          </Link>
        </React.Fragment>
      ) }
    </div>
  );
};

export default Navigation;
