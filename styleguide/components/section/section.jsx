import React from 'react';
import PropTypes from 'prop-types';
import styles from './section.css';
import Hero from '../hero/hero';

function isHero(slug) {
  const heroes = ['overview', 'components', 'soul', 'guidelines'];
  return heroes.includes(slug);
}

function getRootClasses(slug) {
  return isHero(slug) ? styles.root : styles['root-no-hero'];
}

export default function Section(props) {
  const {
    components,
    content,
    depth,
    description,
    heading: Heading,
    markdown: Markdown,
    name,
    sections,
    slug,
  } = props;

  return (
    <section className={getRootClasses(slug)}>
      {isHero(slug) && <Hero slug={slug} />}
      {name &&
        <Heading depth={depth} id={slug} slotName="sectionToolbar" slotProps={props}>
          {name}
        </Heading>
      }
      {description && <Markdown text={description} />}
      {content}
      {sections}
      {components}
    </section>
  );
}

Section.propTypes = {
  components: PropTypes.node,
  content: PropTypes.node,
  depth: PropTypes.number,
  description: PropTypes.string,
  heading: PropTypes.func,
  markdown: PropTypes.func,
  name: PropTypes.string,
  sections: PropTypes.node,
  slug: PropTypes.string,
};

Section.defaultProps = {
  components: undefined,
  content: undefined,
  depth: undefined,
  description: undefined,
  heading: undefined,
  markdown: undefined,
  name: undefined,
  sections: undefined,
  slug: undefined,
};
