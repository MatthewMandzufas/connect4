import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { v4 } from "uuid";
import LoadGameDialog from "./LoadGameDialog";
import SavedGame from "./SavedGame";

const meta: Meta<typeof LoadGameDialog> = {
  component: LoadGameDialog,
};

export default meta;

type Story = StoryObj<typeof LoadGameDialog>;

export const TheOneWithNoSavedGames: Story = {
  render: () => <LoadGameDialog />,
};

export const TheOneCloseDialogClickHandler: Story = {
  render: () => <LoadGameDialog onCloseDialogClick={action("Clicked!")} />,
};

export const TheOneWithASavedGame: Story = {
  render: () => (
    <LoadGameDialog onCloseDialogClick={action("Clicked!")}>
      <SavedGame gameId={v4()} dateSaved={new Date(Date.now())} />
    </LoadGameDialog>
  ),
};
export const TheOneWithMultipleSavedGames: Story = {
  render: () => (
    <LoadGameDialog onCloseDialogClick={action("Clicked!")}>
      <SavedGame gameId={v4()} dateSaved={new Date(Date.now())} />
      <SavedGame gameId={v4()} dateSaved={new Date(Date.now())} />
      <SavedGame gameId={v4()} dateSaved={new Date(Date.now())} />
    </LoadGameDialog>
  ),
};
