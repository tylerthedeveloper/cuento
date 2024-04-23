import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import 'regenerator-runtime/runtime';
import { AppStore } from '../context/store';

import '@styles/globals.css';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AppStore>
      <NextUIProvider navigate={router.push}>
        <Component {...pageProps} />;
      </NextUIProvider>
    </AppStore>
  );
}
