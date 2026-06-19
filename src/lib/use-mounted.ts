"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

// false on the server + first client paint, true after hydration — without a setState-in-effect
export const useMounted = () => useSyncExternalStore(noop, () => true, () => false);
