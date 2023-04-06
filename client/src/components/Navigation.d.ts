import * as React from 'react';
import * as useHistory from 'modules/useHistory';
import * as App from '../App';
export interface props {
  history: useHistory.history;
  session: App.session;
  set_session: App.set_session;
}
export type Navigation = (props: props) => JSX.Element;
export const Navigation: Navigation;
export default Navigation;