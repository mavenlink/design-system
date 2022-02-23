import ReactGA from 'react-ga';

ReactGA.initialize('UA-7529271-31');

export default function pageView() {
  ReactGA.pageview(window.location.hash);
}
