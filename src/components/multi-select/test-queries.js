import {
  getByRole,
  queryByRole,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function getAutocompleter(fieldLabel) {
  return screen.getByRole('combobox', { name: fieldLabel });
}

export function getAvailableOption(fieldLabel, optionLabel) {
  const listbox = screen.getByRole('listbox', { name: fieldLabel });
  return getByRole(listbox, 'option', { name: optionLabel });
}

export function getRemoveButton(fieldLabel, optionLabel) {
  if (optionLabel) {
    return screen.getByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.getByText(`Remove all selected options on ${fieldLabel}`);
}

export function getSelectedOption(fieldLabel, optionLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return getByRole(taglist, 'gridcell', { name: optionLabel });
}

export function openOptions(fieldName) {
  userEvent.click(screen.getByRole('combobox', { name: fieldName }));
}

export function queryAvailableOption(fieldLabel, optionLabel) {
  const listbox = screen.getByRole('listbox', { name: fieldLabel });
  return queryByRole(listbox, 'option', { name: optionLabel });
}

export function queryRemoveButton(fieldLabel, optionLabel) {
  if (optionLabel) {
    return screen.queryByRole('button', { name: `Remove ${optionLabel}` });
  }

  return screen.queryByText(`Remove all selected options on ${fieldLabel}`);
}

export function querySelectedOption(fieldLabel, optionLabel) {
  const taglist = screen.getByRole('grid', { name: fieldLabel });
  return queryByRole(taglist, 'gridcell', { name: optionLabel });
}
