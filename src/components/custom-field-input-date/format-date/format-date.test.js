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

    it('has a format for mm-dd-yyyy', () => {
      const format = dateFormatHelpers.formatMatching('05-10-1992');
      expect(format).toEqual(dateFormatHelpers.validFormats['mm-dd-yyyy']);
    });

    it('returns something falsey when no format matches', () => {
      const format = dateFormatHelpers.formatMatching('this is invalid');
      expect(format).toBeUndefined();
    });
  });

  describe('#validDate', () => {
    it('returns true for a valid date format', () => {
      expect(dateFormatHelpers.validDate('07-18-2016')).toBe(true);
      expect(dateFormatHelpers.validDate('07/18/2016')).toBe(true);
      expect(dateFormatHelpers.validDate('2016-07-18')).toBe(true);
    });

    it('returns false for an invalid date format', () => {
      expect(dateFormatHelpers.validDate('2016-07-181')).toBe(false);
      expect(dateFormatHelpers.validDate('201-07-18')).toBe(false);
      expect(dateFormatHelpers.validDate('definitely not a date')).toBe(false);
    });
  });

  describe('#convertToFormat', () => {
    it('properly converts a valid format to another valid format', () => {
      const formattedDate = dateFormatHelpers.convertToFormat('05-10-1992', 'yyyy-mm-dd');
      expect(formattedDate).toEqual('1992-05-10');
    });

    it('returns undefined for an invalid string', () => {
      const formattedDate = dateFormatHelpers.convertToFormat('nope', 'yyyy-mm-dd');
      expect(formattedDate).toBeUndefined();
    });
  });
});
