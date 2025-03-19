<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ImageOrString implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // Allow string (URLs or file paths)
        if (is_string($value)) {
            return;
        }

        // Ensure it's a file
        if (!$value instanceof UploadedFile) {
            $fail('The :attribute must be a valid image file or a string (URL) WHTF.');
            return;
        }

        // Check for upload errors
        if ($value->getError() !== UPLOAD_ERR_OK) {
            $fail('File upload error: ' . $this->getUploadErrorMessage($value->getError()));
            return;
        }

        // Check if file is valid
        if (!$value->isValid()) {
            $fail('The uploaded file is not valid.');
            return;
        }
    }

    // Helper function for file upload errors
    private function getUploadErrorMessage(int $errorCode): string
    {
        return match ($errorCode) {
            UPLOAD_ERR_INI_SIZE => 'The file is too large (exceeds server limit).',
            UPLOAD_ERR_FORM_SIZE => 'The file exceeds the maximum allowed size.',
            UPLOAD_ERR_PARTIAL => 'The file was only partially uploaded.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            default => 'An unknown error occurred during file upload.',
        };
    }
}
