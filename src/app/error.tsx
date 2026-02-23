'use client';

import { useEffect } from 'react';
import { QuantumError } from '@/components/ui/QuantumError';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <QuantumError
            type="500"
            reset={reset}
        />
    );
}
