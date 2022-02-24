import ReactGA from 'react-ga';

ReactGA.initialize('UA-7529271-31');

export default function pageView() {
  if (!window.CI) ReactGA.pageview(window.location.hash);
}
