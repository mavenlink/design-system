import * as dateFormatHelpers from './format-date.js';

describe('src/components/custom-field-input-date/format-date/format-date', () => {
  describe('#formatMatching', () => {
    it('has a format for mm/dd/yyyy', () => {
      const format = dateFormatHelpers.formatMatching('05/10/1992');
      expect(format).toEqual(dateFormatHelpers.validFormats['mm/dd/yyyy']);
    });

    it('has a format for yyyy-mm-dd', () => {
      const format = dateFormatHelpers.formatMatching('1992-05-10');
      expect(format).toEqual(dateFormatHelpers.validFormats['yyyy-mm-dd']);
    });

    it('returns something falsey when no format matches', () => {
      const format = dateFormatHelpers.formatMatching('this is invalid');
      expect(format).toBeUndefined();
    });
  });

  describe('#validDate', () => {
    it('returns true for a valid date format', () => {
      expect(dateFormatHelpers.isValid('07-18-2016')).toBe(true);
      expect(dateFormatHelpers.isValid('07/18/2016')).toBe(true);
      expect(dateFormatHelpers.isValid('2016-07-18')).toBe(true);
    });

    it('returns false for an invalid date format', () => {
      expect(dateFormatHelpers.isValid('2016-07-181')).toBe(false);
      expect(dateFormatHelpers.isValid('201-07-18')).toBe(false);
      expect(dateFormatHelpers.isValid('definitely not a date')).toBe(false);
    });
  });
});
