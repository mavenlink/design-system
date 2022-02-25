import { rest } from 'msw';
import { API_ROOT } from '../../mocks/mock-constants.js';

const models = [
  {
    id: '55',
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
  {
    id: '6',
    title: 'Option 6',
  },
  {
    id: '7',
    full_name: 'Option 7',
  },
  {
    id: '8',
    currency: 'USD',
  },
  {
    id: '9',
    label: 'Option 9',
  },
];

const onlyModels = [{
  id: '731',
  label: 'Another page of models!',
}, {
  id: '732',
  label: 'Do not throw the object!',
}];

export default function handlers(delay = 0) {
  return [
    rest.get(`${API_ROOT}/models`, (request, response, context) => {
      const searchString = request.url.searchParams.get('matching');

      let modelsForData = [...models];
      if (searchString) {
        modelsForData = [...modelsForData.filter((model) => {
          const modelName = model.title || model.name || model.full_name || model.currency || model.label;
          return modelName.toLocaleLowerCase().match(searchString.toLocaleLowerCase());
        })];
      }

      const findStub = request.url.searchParams.get('find');
      if (findStub) {
        modelsForData = [{ name: 'Find-stub', id: '420' }];
      }

      const filterStub = request.url.searchParams.get('filter');
      if (filterStub && searchString) {
        modelsForData = [{ name: 'filter-stub', id: '9000' }];
      }

      const onlyParam = request.url.searchParams.get('only');
      if (onlyParam !== null) {
        modelsForData = models.concat(onlyModels).filter(model => onlyParam.split(',').includes(model.id));
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
