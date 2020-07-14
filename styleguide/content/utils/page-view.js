import ReactGA from 'react-ga';

ReactGA.initialize('UA-7529271-31');

export default function pageView(url = window.location.href) {
  ReactGA.pageview(url);
}
