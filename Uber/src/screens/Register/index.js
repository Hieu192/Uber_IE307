import React, { use, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorValiPass, setErrorValiPass] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  console.log("password", password);
  console.log("password2", password2);
  console.log("errorMessage", errorMessage);

  const validateEmail = () => {
    if (!email) {
      return setErrorEmail('Email không được để trống!');
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setErrorEmail('Email không hợp lệ!');
    }
    return setErrorEmail('');
  };

  const validatePassword = () => {
    if (!password) {
      return setErrorValiPass('Mật khẩu không được để trống!');
    }
    if (password.length < 6) {
      console.log("do dai", password.length); 
      return setErrorValiPass('Mật khẩu phải chứa ít nhất 6 ký tự!');
    }
    if (!/[a-zA-Z]/.test(password)) {
      return setErrorValiPass('Mật khẩu phải chứa ít nhất một chữ!');
    }
    if (!/\d/.test(password)) {
      return setErrorValiPass('Mật khẩu phải chứa ít nhất một chữ số!');
    }
    // if (!/[A-Z]/.test(password)) {
    //   setErrorValiPass('Mật khẩu phải chứa ít nhất một chữ in hoa!');
    // }
    return setErrorValiPass('');
  };
  // Hàm đăng ký
  const handleSignUp = async () => {
    // if (!email || !password || !password2) {
    //   Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
    //   return;
    // }
    if(!password2) {
      setErrorMessage('Bạn cần nhập trường này');
      return;
    }
    if (password !== password2) {
      setErrorMessage('Mật khẩu không chính xác, vui lòng nhập lại mật khẩu!');
      return;
    } else { 
      setErrorMessage('');
    }

    setIsLoading(true); // Bắt đầu quá trình đăng ký

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Signed up
      Alert.alert("Đăng ký thành công", "Tài khoản đã được tạo thành công!");
      setIsLoading(false);
      const user = userCredential.user;

      // Chuyển đến màn hình đăng nhập (hoặc trang chính)
      navigation.navigate("SignIn"); // Điều hướng tới trang đăng nhập (có thể thay đổi theo ý muốn)
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Đăng ký thất bại", error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.lovepik.com/background/20211101/medium/lovepik-mobile-phone-wallpaper-for-tech-city-background-image_400521604.jpg' }}
      style={styles.background}
    >
    <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng Ký</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorMessage(''); 
            }}
            onBlur={validateEmail}
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          {errorEmail ? (
            <Text style={styles.errorMessage}>{errorEmail}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage(''); 
            }}
            secureTextEntry
            placeholderTextColor="#aaa"
            onBlur={validatePassword} 
          />
          {errorValiPass ? (
            <Text style={styles.errorMessage}>{errorValiPass}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={password2}
            onChangeText={(text) => {
              setPassword2(text);
              setErrorValiPass('');
            }}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupLinkContainer}>
            <Text style={styles.text}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Tạo lớp mờ cho hình nền
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupLinkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
  signupLink: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
