import Overlay from "@/connect-4-ui/Overlay";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import { v4 } from "uuid";
import LoadGameDialog from "./LoadGameDialog";
import SavedGame from "./SavedGame";

const meta: Meta<typeof Overlay> = {
  component: Overlay,
  decorators: [
    (Story) => (
      <div style={{ background: "red" }}>
        <h1>Container</h1>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const TheOneWithDefaults: Story = {
  render: () => <Overlay />,
};

export const TheOneWithAComponent: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ name }: { name: string }) => (
          <div style={{ color: "white" }}>{name}</div>
        ),
        props: {
          name: "Matt",
        },
      }}
    />
  ),
};

export const TheOneWithLoadDialogAndAClickHandler: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ closeDialog }: { closeDialog: () => void }) => (
          <LoadGameDialog handleCloseDialog={closeDialog} />
        ),
        props: {
          closeDialog: action("clicked!"),
        },
      }}
    />
  ),
};

export const TheOneWithLoadDialogWithChildrenAndAClickHandler: Story = {
  render: () => (
    <Overlay
      componentSpec={{
        Component: ({ closeDialog }: { closeDialog: () => void }) => (
          <LoadGameDialog handleCloseDialog={closeDialog}>
            <SavedGame dateSaved={new Date(Date.now())} gameId={v4()} />
            <SavedGame dateSaved={new Date(Date.now())} gameId={v4()} />
            <SavedGame dateSaved={new Date(Date.now())} gameId={v4()} />
          </LoadGameDialog>
        ),
        props: {
          closeDialog: action("Clicked!"),
        },
      }}
    />
  ),
};
