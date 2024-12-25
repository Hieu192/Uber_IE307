import React, { use, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc ,GeoPoint} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import * as Location from "expo-location";
const auth = getAuth();
const createDriver = async (uid, formData) => {
  const { fullName, email, phone, license_plate } = formData;
  try {
    const docRef = doc(db, "drivers", uid); 
    const location = await Location.getCurrentPositionAsync({});
    await setDoc(docRef, {
      fullName,
      email,
      phone,
      license_plate,
      rating:5,
      vehicle:"motorbike",
      location:new GeoPoint(location.coords.latitude, location.coords.longitude),
      isAvailable:false
    });
  } catch (e) {
    console.error("Lỗi khi thêm hoặc cập nhật document:", e);
  }
};

export default function SignUpScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
    license_plate: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    re_password: "",
  });

  const validateFullName = (fullName) => {
    if (!fullName) {
      return "Họ và tên không được để trống!";
    }
    return "";
  };
  const validatePhone = (phone) => {
    if (!phone) {
      return "Số điện thoại không được để trống!";
    }
    // Regex kiểm tra số điện thoại Việt Nam từ 10 đến 11 chữ số
    const vietnamPhoneRegex = /^(0)(3|5|7|8|9)\d{8,9}$/;
    if (!vietnamPhoneRegex.test(phone)) {
      return "Số điện thoại phải 10,11 số. Vui lòng nhập chính xác số điện thoại của bạn";
    }
    return "";
  };
  const validateEmail = (email) => {
    if (!email) {
      return "Email không được để trống!";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email không hợp lệ!";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Mật khẩu không được để trống!";
    }
    if (password.length < 6) {
      return "Mật khẩu phải chứa ít nhất 6 ký tự!";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một chữ!";
    }
    if (!/\d/.test(password)) {
      return "Mật khẩu phải chứa ít nhất một chữ số!";
    }
    // if (!/[A-Z]/.test(password)) {
    //   setErrorValiPass('Mật khẩu phải chứa ít nhất một chữ in hoa!');
    // }
    return "";
  };
  const validateRePassword = (re_password) => {
    if (!re_password) {
      return "Bạn cần nhập lại mật khẩu để xác nhận";
    }
    if (formData.password !== re_password) {
      return "Mật khẩu không chính xác, vui lòng nhập lại mật khẩu!";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateFullName(formData.fullName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      re_password: validateRePassword(formData.re_password),
    };

    setErrors(newErrors);

    // Kiểm tra nếu không có lỗi
    return Object.values(newErrors).every((error) => error === "");
  };
  // Hàm đăng ký
  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Bắt đầu quá trình đăng ký

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      Alert.alert("Đăng ký thành công", "Tài khoản đã được tạo thành công!");
      setIsLoading(false);
      createDriver(userCredential.user.uid,formData)
      // Chuyển đến màn hình đăng nhập (hoặc trang chính)
      navigation.navigate("Login"); // Điều hướng tới trang đăng nhập (có thể thay đổi theo ý muốn)
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Đăng ký thất bại", error.message);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://img.lovepik.com/background/20211101/medium/lovepik-mobile-phone-wallpaper-for-tech-city-background-image_400521604.jpg",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Đăng Ký</Text>

          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={formData.fullName}
            onChangeText={(text) => {
              setFormData({ ...formData, fullName: text });
              setErrors({ ...errors, fullName: "" });
            }}
            // keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          {errors.fullName ? (
            <Text style={styles.errorMessage}>{errors.fullName}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={formData.phone}
            onChangeText={(text) => {
              setFormData({ ...formData, phone: text });
              setErrors({ ...errors, phone: "" });
            }}
            // keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          {errors.phone ? (
            <Text style={styles.errorMessage}>{errors.phone}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => {
              setFormData({ ...formData, email: text });
              setErrors({ ...errors, email: "" });
            }}
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />
          {errors.email ? (
            <Text style={styles.errorMessage}>{errors.email}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Biển số xe"
            value={formData.license_plate}
            onChangeText={(text) => {
              setFormData({ ...formData, license_plate: text });
              setErrors({ ...errors, license_plate: "" });
            }}
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            value={formData.password}
            onChangeText={(text) => {
              setFormData({ ...formData, password: text });
              setErrors({ ...errors, password: "" });
            }}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errors.password ? (
            <Text style={styles.errorMessage}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            value={formData.re_password}
            onChangeText={(text) => {
              setFormData({ ...formData, re_password: text });
              setErrors({ ...errors, re_password: "" });
            }}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
          {errors.re_password ? (
            <Text style={styles.errorMessage}>{errors.re_password}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Đang đăng ký..." : "Đăng ký"}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupLinkContainer}>
            <Text style={styles.text}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signupLink}>Đăng nhập</Text>
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
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Tạo lớp mờ cho hình nền
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    padding: 24,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signupLinkContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  signupLink: {
    fontSize: 14,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});
