import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';
import React from 'react';
import Section from './section';

export default function SectionContainer(props) {
  return <Section {...props} heading={SectionHeading} markdown={Markdown} />;
}
