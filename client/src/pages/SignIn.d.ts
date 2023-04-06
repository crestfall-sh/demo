import * as React from 'react';
import * as useHistory from 'modules/useHistory';
import * as App from '../App';
export interface props {
  history: useHistory.history;
  set_session: App.set_session;
}
export type SignIn = (props: props) => JSX.Element;
export const SignIn: SignIn;
export default SignIn;