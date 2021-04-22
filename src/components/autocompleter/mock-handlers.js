import { rest } from 'msw';
import mockConstants from '../../mocks/mock-constants.js';

const { API_ROOT } = mockConstants;

const models = [
  {
    id: '0',
    name: 'Foo',
  },
  {
    id: '1',
    name: 'Bar',
  },
  {
    id: '2',
    name: 'Fizz',
  },
  {
    id: '3',
    name: 'Buzz',
  },
  {
    id: '4',
    name: 'Baz',
  },
  {
    id: '5',
    name: 'Bax',
  },
];

export default function handlers(delay = 0) {
  return [
    rest.get(`${API_ROOT}/models`, (request, response, context) => {
      const searchString = request.url.searchParams.get('search');

      let modelsForData = [...models];
      if (searchString) {
        modelsForData = [...modelsForData.filter(model => model.name.match(searchString))];
      }

      const modelData = {};

      modelsForData.forEach((model) => {
        modelData[model.id] = model;
      });

      return response(
        context.status(200),
        context.json({
          count: modelsForData.length,
          meta: {
            count: modelsForData.length,
            page_count: 1,
            page_number: 0,
            page_size: models.length,
          },
          results: modelsForData.map((model) => {
            return {
              key: 'models',
              id: model.id,
            };
          }),
          models: modelData,
        }),
        context.delay(delay),
      );
    }),
  ];
}
