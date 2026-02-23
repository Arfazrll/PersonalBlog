'use client';

import { QuantumError } from '@/components/ui/QuantumError';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <QuantumError
                    type="500"
                    reset={reset}
                />
            </body>
        </html>
    );
}
