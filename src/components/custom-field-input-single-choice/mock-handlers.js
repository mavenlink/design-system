import { rest } from 'msw';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const choices = [
  {
    custom_field_id: '0',
    id: '0',
    label: 'Foo',
  },
  {
    custom_field_id: '0',
    id: '1',
    label: 'Bar',
  },
  {
    custom_field_id: '1',
    id: '2',
    label: 'Fizz',
  },
];

export default function handlers(delay = 0) {
  return [
    rest.get(`${API_ROOT}/custom_field_choices`, (request, response, context) => {
      const customFieldID = request.url.searchParams.get('for_custom_fields');
      const matchingChoices = choices.filter((choice) => {
        return choice.custom_field_id === customFieldID;
      });
      const customFieldChoices = {};

      matchingChoices.forEach((choice) => {
        customFieldChoices[choice.id] = {
          custom_field_id: choice.custom_field_id,
          label: choice.label,
        };
      });

      return response(
        context.status(200),
        context.json({
          count: 2,
          meta: {
            count: 2,
            page_count: 1,
            page_number: 0,
            page_size: 2,
          },
          results: matchingChoices.map((choice) => {
            return {
              key: 'custom_field_choices',
              id: choice.id,
            };
          }),
          custom_field_choices: customFieldChoices,
        }),
        context.delay(delay),
      );
    }),
  ];
}
