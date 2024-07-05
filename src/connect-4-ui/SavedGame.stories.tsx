import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import SavedGame from "./SavedGame";

const meta: Meta<typeof SavedGame> = {
  component: SavedGame,
};

type Story = StoryObj<typeof SavedGame>;

export const TheOneWithDateAndTime: Story = {
  render: () => (
    <SavedGame
      gameId={window.crypto.randomUUID()}
      dateSaved={new Date(Date.now())}
    />
  ),
};

export const TheOneWithALoadButtonAndClickHandler: Story = {
  render: () => (
    <SavedGame
      gameId={window.crypto.randomUUID()}
      dateSaved={new Date(Date.now())}
      handleLoadGame={action("Clicked")}
    />
  ),
};

export default meta;
