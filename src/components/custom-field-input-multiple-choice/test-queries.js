import {
  findByRole,
  getByRole,
  queryByRole,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export async function findAutocompleter(fieldLabel) {
  return screen.findByRole('combobox', { name: fieldLabel });
}

export function getAutocompleter(fieldLabel) {
  return screen.getByRole('combobox', { name: fieldLabel });
}

export function getAvailableChoice(fieldLabel, choiceLabel) {
  const listbox = screen.getByRole('listbox', { name: fieldLabel });
  return getByRole(listbox, 'option', { name: choiceLabel });
}

export function getRemoveButton(fieldLabel, choiceLabel) {
  if (choiceLabel) {
    return screen.getByRole('button', { name: `Remove ${choiceLabel}` });
  }

  return screen.getByText(`Remove all selected choices on ${fieldLabel}`);
}

export async function findBySelectedChoice(fieldLabel, choiceLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return findByRole(taglist, 'gridcell', { name: choiceLabel });
}

export function getSelectedChoice(fieldLabel, choiceLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return getByRole(taglist, 'gridcell', { name: choiceLabel });
}

export function openChoices(fieldName) {
  userEvent.click(screen.getByRole('combobox', { name: fieldName }));
}

export function queryAvailableChoice(fieldLabel, choiceLabel) {
  const listbox = screen.getByRole('listbox', { name: fieldLabel });
  return queryByRole(listbox, 'option', { name: choiceLabel });
}

export function queryRemoveButton(fieldLabel, choiceLabel) {
  if (choiceLabel) {
    return screen.queryByRole('button', { name: `Remove ${choiceLabel}` });
  }

  return screen.queryByText(`Remove all selected choices on ${fieldLabel}`);
}

export function querySelectedChoice(fieldLabel, choiceLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return queryByRole(taglist, 'gridcell', { name: choiceLabel });
}

export async function waitForChoices(fieldLabel) {
  openChoices(fieldLabel);

  const listbox = screen.getByRole('listbox', { name: fieldLabel });
  const progressbar = queryByRole(listbox, 'progressbar');
  if (progressbar) await waitForElementToBeRemoved(progressbar);
}

export async function waitForChoicesNoOpen() {
  await waitForElementToBeRemoved(() => screen.queryAllByRole('progressbar'));
}
