import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

/**
 * Root index file that handles basic authentication redirects
 */
export default function Index() {
  const { authState } = useAuth();

  // Redirect based on authentication status
  if (authState.isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }

  // If not logged in, redirect to welcome screen in onboarding stack
  return <Redirect href="/(onboarding)/welcome" />;
}
