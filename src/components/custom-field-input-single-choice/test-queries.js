import {
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function clearChoice() {
  userEvent.click(screen.getByText('Remove selected choice'));
}

export function openChoices(fieldLabel) {
  userEvent.click(screen.getByLabelText(fieldLabel));
}

export function selectChoice(fieldLabel, choiceText) {
  openChoices(fieldLabel);

  userEvent.click(screen.getByText(choiceText));
}

export async function waitForChoices() {
  await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
}
