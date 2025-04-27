import { Redirect } from 'expo-router';

// This index file ensures that navigating to /(auth) redirects to the login page
export default function AuthIndex() {
  return <Redirect href={{ pathname: '/(auth)/login' }} />;
}
