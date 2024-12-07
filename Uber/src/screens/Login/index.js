import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();
export default function SignInPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Hàm đăng nhập
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setIsLoading(true);  // Bắt đầu quá trình đăng nhập

    try {
      // Đăng nhập người dùng
      await signInWithEmailAndPassword(auth,email, password);
      Alert.alert('Đăng nhập thành công', 'Chào mừng bạn đến với ứng dụng!');
      setIsLoading(false);

      // Điều hướng đến trang chính sau khi đăng nhập thành công
      navigation.navigate('Home');  // Trang Home sau khi đăng nhập thành công
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button 
        title={isLoading ? "Đang đăng nhập..." : "Đăng nhập"} 
        onPress={handleSignIn} 
        disabled={isLoading}
      />

      <View style={styles.signupLinkContainer}>
        <Text>Bạn chưa có tài khoản? </Text>
        <Button title="Đăng ký" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  signupLinkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
