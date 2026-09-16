import { createContext, useContext } from 'react';

// Every screen wraps its content in a provider so leaf components (section titles,
// counters) can react to "my screen is on" instead of watching the scroll position.
// `active` is undefined in document mode (phones, tablets in portrait): there the
// page scrolls as usual and components fall back to their IntersectionObserver.
const ScreenContext = createContext({ mode: 'doc', active: undefined });

export const ScreenProvider = ScreenContext.Provider;

export function useScreen() {
  return useContext(ScreenContext);
}
