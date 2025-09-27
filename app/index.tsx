// app/index.tsx
import React from 'react';
import { Redirect } from 'expo-router';  // ✅ add this import

export default function Index() {
  return <Redirect href="/onboarding/welcome" />;
}
