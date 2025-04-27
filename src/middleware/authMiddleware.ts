import { useSegments, useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * Middleware function to handle protected routes based on authentication status
 * @param isLoggedIn Authentication status
 * @param isLoading Loading state of auth
 */
export function useAuthMiddleware(isLoggedIn: boolean, isLoading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Don't do anything while auth is being checked
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';
    const isWelcomePage = segments[0] === 'welcome';

    // Handle route protection based on auth status
    if (isLoggedIn) {
      // If logged in, restrict access to auth routes
      if (inAuthGroup || isWelcomePage) {
        router.replace({
          pathname: '/(tabs)/home',
        });
      }
    } else {
      // If not logged in, restrict access to protected routes
      if (inTabsGroup) {
        router.replace({
          pathname: '/welcome',
        });
      }
      // Initial redirect if not on welcome or auth pages
      else if (
        segments instanceof Array &&
        segments.length > 0 &&
        !inAuthGroup &&
        !isWelcomePage
      ) {
        router.replace({
          pathname: '/welcome',
        });
      }
    }
  }, [isLoggedIn, segments, isLoading, router]);
}
