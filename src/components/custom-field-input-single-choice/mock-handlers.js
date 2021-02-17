import { rest } from 'msw';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const handlers = [
  rest.get(`${API_ROOT}/custom_field_choices`, (request, response, context) => {
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
        results: [
          {
            key: 'foo',
            id: 0,
          },
          {
            key: 'bar',
            id: 1,
          },
        ],
        custom_field_choices: {
          foo: {
            custom_field_id: 0,
            label: 'Foo',
          },
          bar: {
            custom_field_id: 0,
            label: 'Bar',
          },
        },
      }),
    );
  }),
];

export default handlers;
