import ReactGA from 'react-ga';

ReactGA.initialize('UA-7529271-29');

function convertToTrackableUrlForGoogle(url) {
  return url.replace(/\/(?:design-system)?#!/, '');
}

export default function pageView(url = window.location.pathname + window.location.search + window.location.hash) {
  ReactGA.pageview(convertToTrackableUrlForGoogle(url));
}
