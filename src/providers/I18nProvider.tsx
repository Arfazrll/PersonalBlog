'use client';

import { ReactNode } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';

interface I18nProviderProps {
    children: ReactNode;
    locale: string;
    messages: AbstractIntlMessages;
    timeZone?: string;
}

export function I18nProvider({ children, locale, messages, timeZone = 'Asia/Jakarta' }: I18nProviderProps) {
    return (
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
            {children}
        </NextIntlClientProvider>
    );
}
