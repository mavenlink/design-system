import * as formatDate from './format-date.js';

describe('src/components/custom-field-input-date/format-date/format-date', () => {
  describe('#formatMatching', () => {
    it('has a format for mm/dd/yyyy', () => {
      const format = formatDate.formatMatching('05/10/1992');
      expect(format).toEqual(formatDate.validFormats['mm/dd/yyyy']);
    });

    it('has a format for yyyy-mm-dd', () => {
      const format = formatDate.formatMatching('1992-05-10');
      expect(format).toEqual(formatDate.validFormats['yyyy-mm-dd']);
    });
  });
});
