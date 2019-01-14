import buildLocalLink from './build-local-link';

test('empty pathnames', () => {
  expect(buildLocalLink('', '')).toEqual('/');
  expect(buildLocalLink('/', '')).toEqual('/');
  expect(buildLocalLink('foobar', '')).toEqual('/foobar');
  expect(buildLocalLink('/foobar', '')).toEqual('/foobar');
});

test('single slash pathname', () => {
  expect(buildLocalLink('', '/')).toEqual('/');
  expect(buildLocalLink('/', '/')).toEqual('/');
  expect(buildLocalLink('foobar', '/')).toEqual('/foobar');
  expect(buildLocalLink('/foobar', '/')).toEqual('/foobar');
});

test('complex pathname', () => {
  expect(buildLocalLink('', '/design-system')).toEqual('/design-system');
  expect(buildLocalLink('/', '/design-system')).toEqual('/design-system');
  expect(buildLocalLink('foobar', '/design-system')).toEqual('/design-system/foobar');
  expect(buildLocalLink('/foobar', '/design-system')).toEqual('/design-system/foobar');
});
