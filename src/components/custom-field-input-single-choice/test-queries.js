import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function clearChoice() {
  userEvent.click(screen.getByText('Remove selected choice'));
}

export function getSingleChoiceRootByName(fieldName) {
  return screen.getByRole('combobox', { name: fieldName });
}

export function openChoices(fieldName) {
  userEvent.click(screen.getByRole('combobox', { name: fieldName }));
}

export function selectChoice(fieldLabel, choiceText) {
  openChoices(fieldLabel);

  userEvent.click(screen.getByText(choiceText));
}

export async function waitForChoices(fieldName) {
  openChoices(fieldName);
  await waitForElementToBeRemoved(() => screen.queryAllByRole('progressbar'));
}
