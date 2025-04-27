import { Redirect } from 'expo-router';

export default function RegisterRedirect() {
  // Redirect to the auth group's register screen
  return <Redirect href="/(auth)/register" />;
}
