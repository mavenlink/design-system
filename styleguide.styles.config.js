module.exports = {
  Para: {
    para: {
      font: 'var(--mds-type-content)',
      marginBottom: 'var(--spacing-x-large)',
    },
  },
  Heading: {
    heading1: {
      font: 'var(--mds-type-page-title)',
      marginBottom: 'var(--spacing-x-large)',
    },
    heading2: {
      font: 'var(--mds-type-subhead-1)',
      marginBottom: 'var(--spacing-x-large)',
    },
    heading3: {
      font: 'var(--mds-type-subhead-2)',
      marginBottom: 'var(--spacing-x-large)',
    },
    heading4: {
      font: 'var(--mds-type-subhead-3)',
      marginBottom: 'var(--spacing-x-large)',
    },
    heading5: {
      font: 'var(--mds-type-subhead-3)',
      marginBottom: 'var(--spacing-x-large)',
    },
    heading6: {
      font: 'var(--mds-type-subhead-3)',
      marginBottom: 'var(--spacing-x-large)',
    },
  },
  List: {
    li: {
      font: 'var(--mds-type-content)',
    },
    list: {
      marginBottom: '0px', // Regular `<ul>` which should always be nested.
    },
    ordered: {
      marginBottom: 'var(--spacing-x-large)',
    },
  },
  ComponentsList: {
    item: {
      marginRight: 'var(--spacing-small)',
      '@global': {
        a: {
          color: 'var(--mds-grey-87) !important',
          font: 'var(--mds-type-content) !important',
        },
      },
    },
  },
};
