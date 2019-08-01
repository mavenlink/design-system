import SectionHeading from 'rsg-components/SectionHeading'; // eslint-disable-line import/extensions
import Markdown from 'rsg-components/Markdown'; // eslint-disable-line import/extensions
import React from 'react';
import Section from './section.jsx';

export default function SectionContainer(props) {
  return <Section {...props} heading={SectionHeading} markdown={Markdown} />;
}
