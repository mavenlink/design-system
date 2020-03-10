import * as dateFormatHelpers from './format-date.js';

describe('src/components/custom-field-input-date/format/format-date', () => {
  describe('validFormats', () => {
    describe('Month dd, yyyy', () => {
      const format = dateFormatHelpers.validFormats['Month dd, yyyy'];

      it('dismantles', () => {
        const dismantledDate = format.dismantle('March 15, 2020');

        expect(dismantledDate.day).toEqual('15');
        expect(dismantledDate.month).toEqual('03');
        expect(dismantledDate.year).toEqual('2020');
      });

      it('combines', () => {
        const combinedDate = format.combine({ day: '15', month: '03', year: '2020' });
        expect(combinedDate).toEqual('March 15, 2020');
      });

      it('matches correctly', () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'];

        months.forEach((month) => {
          for (let dayNumber = 1; dayNumber <= 31; dayNumber += 1) {
            const day = dayNumber.toString(10).padStart(2, '0');
            const string = `${month} ${day}, 1992`;
            expect(format.matcher.test(string)).toBe(true);
          }
        });
      });
    });

    describe('mm/dd/yyyy', () => {
      const format = dateFormatHelpers.validFormats['mm/dd/yyyy'];

      it('dismantles', () => {
        const dismantledDate = format.dismantle('03/15/2020');

        expect(dismantledDate.day).toEqual('15');
        expect(dismantledDate.month).toEqual('03');
        expect(dismantledDate.year).toEqual('2020');
      });

      it('combines', () => {
        const combinedDate = format.combine({ day: '15', month: '03', year: '2020' });

        expect(combinedDate).toEqual('03/15/2020');
      });

      it('matches correctly', () => {
        expect(format.matcher.test('03/15/2020')).toBe(true);
      });
    });
  });

  describe('#formatMatching', () => {
    it('has a format for mm/dd/yyyy', () => {
      const format = dateFormatHelpers.formatMatching('05/10/1992');
      expect(format).toBeDefined();
      expect(format).toEqual(dateFormatHelpers.validFormats['mm/dd/yyyy']);
    });

    it('has a format for yyyy-mm-dd', () => {
      const format = dateFormatHelpers.formatMatching('1992-05-10');
      expect(format).toBeDefined();
      expect(format).toEqual(dateFormatHelpers.validFormats['yyyy-mm-dd']);
    });

    it('has a format for mm-dd-yyyy', () => {
      const format = dateFormatHelpers.formatMatching('05-10-1992');
      expect(format).toBeDefined();
      expect(format).toEqual(dateFormatHelpers.validFormats['mm-dd-yyyy']);
    });

    it('has a format for Month dd, yyyy', () => {
      const format = dateFormatHelpers.formatMatching('May 10, 1992');
      expect(format).toBeDefined();
      expect(format).toEqual(dateFormatHelpers.validFormats['Month dd, yyyy']);
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
