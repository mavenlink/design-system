import { rest } from 'msw';
import { API_ROOT } from '../../mocks/mock-constants.js';

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
  {
    custom_field_id: '1',
    id: '3',
    label: 'Fizz (3)',
  },
  {
    custom_field_id: '1',
    id: '4',
    label: 'Fizz (4)',
  },
  {
    custom_field_id: '1',
    id: '5',
    label: 'Fizz (5)',
  },
  {
    custom_field_id: '1',
    id: '6',
    label: 'Fizz (6)',
  },
  {
    custom_field_id: '1',
    id: '7',
    label: 'Fizz (7)',
  },
  {
    custom_field_id: '1',
    id: '8',
    label: 'Fizz (8)',
  },
  {
    custom_field_id: '1',
    id: '9',
    label: 'Fizz (9)',
  },
  {
    custom_field_id: '1',
    id: '10',
    label: 'Fizz (10)',
  },
  {
    custom_field_id: '1',
    id: '11',
    label: 'This is a really long choice label (like really, really long)',
  },
];

export default function handlers(delay = 0) {
  return [
    rest.get(`${API_ROOT}/custom_field_choices`, (request, response, context) => {
      const customFieldID = request.url.searchParams.get('for_custom_fields');
      const matchingParam = request.url.searchParams.get('matching');
      const onlyParam = request.url.searchParams.get('only');

      const matchingChoices = choices.filter((choice) => {
        if (matchingParam && !choice.label.includes(matchingParam)) {
          return false;
        }

        if (onlyParam !== null) {
          return choice.custom_field_id === customFieldID && onlyParam.split(',').includes(choice.id);
        }

        return choice.custom_field_id === customFieldID;
      });
      const customFieldChoices = {};

      matchingChoices.forEach((choice) => {
        customFieldChoices[choice.id] = choice;
      });

      return response(
        context.status(200),
        context.json({
          count: choices.length,
          meta: {
            count: choices.length,
            page_count: 1,
            page_number: 0,
            page_size: choices.length,
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
