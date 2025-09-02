import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
// Update the import path to the correct location of your supabase client
import { supabase } from '../config/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setStatus(error.message);
    else setStatus('Check your email for the login link / code!');
  };

  return (
    <View style={{ flex:1, justifyContent:'center', padding:20 }}>
      <Text style={{ fontSize:20, marginBottom:10 }}>Login</Text>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth:1, padding:10, marginBottom:10 }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send OTP" onPress={handleLogin} />
      <Text style={{ marginTop:20 }}>{status}</Text>
    </View>
  );
}
