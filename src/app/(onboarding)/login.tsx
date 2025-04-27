import { Redirect } from 'expo-router';

export default function LoginRedirect() {
  // Redirect to the auth group's login screen
  return <Redirect href="/(auth)/login" />;
}
