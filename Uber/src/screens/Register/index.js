import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hàm đăng ký
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
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
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký tài khoản</Text>

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
        title={isLoading ? "Đang đăng ký..." : "Đăng ký"}
        onPress={handleSignUp}
        disabled={isLoading}
      />

      <View style={styles.loginLinkContainer}>
        <Text>Bạn đã có tài khoản? </Text>
        <Button
          title="Đăng nhập"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  loginLinkContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
