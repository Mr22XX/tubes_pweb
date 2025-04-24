import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect ke client home secara default
  return <Redirect href="/(client)/home" />;
}