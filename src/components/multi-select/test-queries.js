import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function findAutocompleter(fieldLabel) {
  return screen.findByRole('combobox', { name: fieldLabel });
}

export async function findAvailableOption(optionLabel) {
  return screen.findByRole('option', { name: optionLabel });
}

export function findRemoveButton(optionLabel) {
  if (optionLabel) {
    return screen.findByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.findByText('Remove all selected options');
}

export async function findSelectedOption(optionLabel) {
  return screen.findByRole('gridcell', { name: optionLabel });
}

export async function openOptions(fieldName) {
  userEvent.click(await screen.findByRole('combobox', { name: fieldName }));
}

export async function queryAvailableOption(optionLabel) {
  return screen.queryByRole('option', { name: optionLabel });
}

export function queryRemoveButton(optionLabel) {
  if (optionLabel) {
    return screen.queryByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.queryByText('Remove all selected options');
}

export async function querySelectedOption(optionLabel) {
  return screen.queryByRole('gridcell', { name: optionLabel });
}

export async function waitForLoadingComplete() {
  const loader = screen.queryByRole('progressbar');

  if (!loader) {
    return Promise.resolve();
  }

  return waitForElementToBeRemoved(loader);
}
