import { router } from '@inertiajs/react';
import omit from 'lodash/omit';

import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';
import { toast } from '@/hooks/use-toast';
import { ErrorResponse } from '@/types';

interface PostJournalParams {
  journalData: Schema;
  setLoadingState?: (isLoading: boolean) => void;
  toggleDrawer?: (isOpen: boolean) => void;
}

function handleErrorResponse(errorResponse: ErrorResponse): void {
  if (!errorResponse.message) return;

  toast({
    variant: 'destructive',
    title: 'Uh oh! Something went wrong.',
    description: errorResponse.message,
    duration: 5000,
  });

  setTimeout(() => {
    errorResponse.message = null;
  }, 10000);
}

function handleSuccessResponse(toggleDrawer?: (isOpen: boolean) => void): void {
  toast({
    variant: 'success',
    title: 'Data saved successfully!',
    duration: 2000,
  });

  if (toggleDrawer) {
    toggleDrawer(false);
  }
}

export function postJournal({
  journalData,
  setLoadingState,
  toggleDrawer,
}: PostJournalParams): void {
  const formattedData = omit(mapData(journalData), 'variant');

  router.post('/journal', formattedData, {
    onSuccess: (response) => {
      const errorResponse = response.props.err as ErrorResponse;

      if (errorResponse?.message) {
        return handleErrorResponse(errorResponse);
      }

      handleSuccessResponse(toggleDrawer);
    },
    onFinish: () => {
      if (setLoadingState) {
        setLoadingState(false);
      }
    },
  });
}

export function deleteJournal() {}
