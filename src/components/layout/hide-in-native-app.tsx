"use client";

import { useEffect, useState, type ReactNode } from "react";

// Renders children only when the site is NOT running inside the Capacitor native app.
// Starts as "not native" on the server and first client render (no hydration mismatch),
// then checks the Capacitor bridge after mount.
export function HideInNativeApp({ children }: { children: ReactNode }) {
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(
      !!(window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
        .Capacitor?.isNativePlatform?.(),
    );
  }, []);

  if (isNative) return null;
  return <>{children}</>;
}
