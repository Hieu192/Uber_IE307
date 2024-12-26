import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc ,GeoPoint,getDoc} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../redux/slices/auth"
const auth = getAuth();
export default function SignInPage({ navigation }) {
  const dispatch=useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorValiPass, setErrorValiPass] = useState('');
  const checkUserExists = async (collectionName, uid) => {
    const docRef = doc(db, collectionName, uid); // Tạo tham chiếu đến document
    const docSnap = await getDoc(docRef); // Lấy document từ Firestore
  
    if (docSnap.exists()) {
      console.log("User tồn tại:", docSnap.data());
      return true; // User tồn tại
    } else {
      throw new Error(`Driver không tồn tại`);
    }
  };
  // Hàm đăng nhập
  const handleSignIn = async () => {
    // if (!email || !password) {
    //   Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin.');
    //   return;
    // }
    if (!email) {
      return setErrorEmail('Bạn cần nhập email');
    }
    if(!password) {
      setErrorValiPass('Bạn cần nhập mật khẩu');
      return;
    }

    setIsLoading(true);  // Bắt đầu quá trình đăng nhập

    try {
      // Đăng nhập người dùng
      const userCredential =await signInWithEmailAndPassword(auth,email, password);
      await checkUserExists("drivers",userCredential.user.uid)
      Alert.alert('Đăng nhập thành công', 'Chào mừng bạn đến với ứng dụng!');
      dispatch(login(userCredential.user))
      console.log("Đăng nhập thành công:", userCredential);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Đăng nhập thất bại', error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.lovepik.com/background/20211101/medium/lovepik-mobile-phone-wallpaper-for-tech-city-background-image_400521604.jpg' }}
      style={styles.background}
    >
    <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng nhập</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrorEmail('');
            }}
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
              setErrorValiPass('');
            }}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errorValiPass ? (
            <Text style={styles.errorMessage}>{errorValiPass}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupLinkContainer}>
            <Text style={styles.text}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
