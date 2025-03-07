import { router } from '@inertiajs/react';
import omit from 'lodash/omit';
import { toast } from 'sonner';

import { Schema } from '@/types/journal/schema';
import { mapData } from '@/utils/journal/map-data';
import { ErrorResponse } from '@/types';

interface PostJournalParams {
  journalData: Schema;
  setLoadingState?: (isLoading: boolean) => void;
  toggleFormOpen?: (isOpen: boolean) => void;
}

function handleErrorResponse(errorResponse: ErrorResponse): void {
  if (!errorResponse.message) return;

  toast.error('Uh oh! Something went wrong.', {
    description: errorResponse.message,
  });

  setTimeout(() => {
    errorResponse.message = null;
  }, 10000);
}

function handleSuccessResponse(
  toggleFormOpen?: (isOpen: boolean) => void,
): void {
  // toast({
  //   variant: 'success',
  //   title: 'Data saved successfully!',
  //   duration: 2000,
  // });
  toast.success('created.', {
    duration: 2000,
  });

  if (toggleFormOpen) {
    toggleFormOpen(false);
  }
}

export function postJournal({
  journalData,
  setLoadingState,
  toggleFormOpen,
}: PostJournalParams): void {
  const formattedData = omit(mapData(journalData), 'variant');

  router.post('/journal', formattedData, {
    onSuccess: (response) => {
      const errorResponse = response.props.err as ErrorResponse;

      if (errorResponse?.message) {
        return handleErrorResponse(errorResponse);
      }

      handleSuccessResponse(toggleFormOpen);
    },
    onFinish: () => {
      if (setLoadingState) {
        setLoadingState(false);
      }
    },
  });
}

export function deleteJournal() {}
