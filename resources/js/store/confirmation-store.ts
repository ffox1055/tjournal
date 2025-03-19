// confirmationStore.ts
import { create } from 'zustand';

type ActionVariant =
  | 'link'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost';

interface ConfirmationState {
  open: boolean;
  title: string | null;
  description: string | null;
  cancelLabel: string | null;
  actionLabel: string | null;
  actionVariant: ActionVariant;
  onAction: () => void;
  onCancel: () => void;
}

interface ConfirmationActions {
  openConfirmation: (data: {
    title: string;
    description: string;
    cancelLabel: string;
    actionLabel: string;
    actionVariant?: ActionVariant;
    onAction?: () => void;
    onCancel?: () => void;
  }) => void;
  closeConfirmation: () => void;
}

const useConfirmationStore = create<ConfirmationState & ConfirmationActions>(
  (set) => ({
    open: false,
    title: null,
    description: null,
    cancelLabel: null,
    actionLabel: null,
    actionVariant: 'default',
    onAction: () => {},
    onCancel: () => {},

    // populate the dialog
    openConfirmation: (data) =>
      set(() => ({
        open: true,
        title: data.title,
        description: data.description,
        cancelLabel: data.cancelLabel,
        actionLabel: data.actionLabel,
        actionVariant: data.actionVariant,
        onAction: data.onAction,
        onCancel: data.onCancel,
      })),

    // reset the dialog
    closeConfirmation: () =>
      set(() => ({
        open: false,
        title: null,
        description: null,
        cancelLabel: null,
        actionLabel: null,
        actionVariant: 'default',
        onAction: () => {},
        onCancel: () => {},
      })),
  }),
);

export default useConfirmationStore;
