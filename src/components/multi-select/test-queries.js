import {
  findByRole,
  queryByRole,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function findAutocompleter(fieldLabel) {
  return screen.findByRole('combobox', { name: fieldLabel });
}

export async function findAvailableOption(fieldLabel, optionLabel) {
  const listbox = await screen.findByRole('listbox', { name: fieldLabel });
  return findByRole(listbox, 'option', { name: optionLabel }); // eslint-disable-line testing-library/prefer-screen-queries
}

export function findRemoveButton(optionLabel) {
  if (optionLabel) {
    return screen.findByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.findByText('Remove all selected options');
}

export async function findSelectedOption(fieldLabel, optionLabel) {
  const taglist = await screen.findByRole('grid', { name: fieldLabel });
  return findByRole(taglist, 'gridcell', { name: optionLabel }); // eslint-disable-line testing-library/prefer-screen-queries
}

export async function openOptions(fieldName) {
  userEvent.click(await screen.findByRole('combobox', { name: fieldName }));
}

export async function queryAvailableOption(fieldLabel, optionLabel) {
  const listbox = await screen.findByRole('listbox', { name: fieldLabel });
  return queryByRole(listbox, 'option', { name: optionLabel }); // eslint-disable-line testing-library/prefer-screen-queries
}

export function queryRemoveButton(fieldLabel, optionLabel) {
  if (optionLabel) {
    return screen.queryByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.queryByText('Remove all selected options');
}

export async function querySelectedOption(fieldLabel, optionLabel) {
  const taglist = await screen.findByRole('grid', { name: fieldLabel });
  return queryByRole(taglist, 'gridcell', { name: optionLabel }); // eslint-disable-line testing-library/prefer-screen-queries
}

export async function waitForLoadingComplete(fieldLabel) {
  const listbox = await screen.findByRole('listbox', { name: fieldLabel });
  const loader = queryByRole(listbox, 'progressbar'); // eslint-disable-line testing-library/prefer-screen-queries

  if (!loader) {
    return Promise.resolve();
  }

  return waitForElementToBeRemoved(loader);
}
