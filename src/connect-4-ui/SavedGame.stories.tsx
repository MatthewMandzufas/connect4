import { Meta, StoryObj } from "@storybook/react";
import SavedGame from "./SavedGame";

const meta: Meta<typeof SavedGame> = {
  component: SavedGame,
};

type Story = StoryObj<typeof SavedGame>;

export const TheOneWithDateAndTime: Story = {
  render: () => (
    <SavedGame gameId={crypto.randomUUID()} dateSaved={new Date(Date.now())} />
  ),
};

export default meta;
