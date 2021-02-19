import {
  getByRole,
  queryByRole,
  screen,
} from '@testing-library/react';

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

export function getSelectedChoice(fieldLabel, choiceLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return getByRole(taglist, 'gridcell', { name: choiceLabel });
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
