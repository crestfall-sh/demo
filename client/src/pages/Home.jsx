// @ts-check

import React from 'react';
import Link from '../components/Link';

// https://unsplash.com/photos/hCb3lIB8L8E

/**
 * @type {import('./Home').Home}
 */
export const Home = (props) => {
  const { history, session, set_session } = props;
  return (
    <div>
      <div className="p-2 flex flex-row justify-center items-center">
        <div className="w-full sm:w-5/6 md:w-4/5 lg:w-2/3">
          <div className="py-4">
            <div className="p-1 text-left text-2xl font-bold text-black">
              Example home page.
            </div>
            { session instanceof Object && (
              <React.Fragment>
                <div className="overflow-x-scroll">
                  <pre className="whitespace-pre-wrap">
                    { JSON.stringify(session, null, 2) }
                  </pre>
                </div>
                <div className="p-4">
                  <button type="button" onClick={() => set_session(null)}>
                    Sign out
                  </button>
                </div>
              </React.Fragment>
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;