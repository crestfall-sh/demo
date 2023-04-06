import * as useHistory from 'modules/useHistory';
import * as App from '../App';
export interface props {
  history: useHistory.history;
  session: App.session;
  set_session: App.set_session;
}
export type Home = (props: props) => JSX.Element;
export const Home: Home;
export default Home;