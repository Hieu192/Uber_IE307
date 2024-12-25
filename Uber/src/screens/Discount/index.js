import React, { use, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Dùng để hiển thị icon check
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setApplyDiscountCode, setApplyFinalPrice, setApplyIdSelect, setApplyPrice, setDiscountCode, setFinalPrice, setPromos } from "../../redux/slices/methodPayload";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";


const DiscountScreen = () => {
  const [promoCode, setPromoCode] = useState("");
  const [selectedPromo, setSelectedPromo] = useState(null); // Lưu mã khuyến mãi đã chọn để hiện thị thông tin 
  const [usePromo, setUsePromo] = useState(null); // Lưu mã khuyến mãi đã chọn để chuẩn bị áp mã sử dụng 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const priceState = useSelector((state) => state.method.price);
  const promos = useSelector((state) => state.method.promos); // Lấy danh sách mã khuyến mãi từ store
  const idSelect = useSelector((state) => state.method.idSelect);
  const applyIdSelect = useSelector((state) => state.method.applyIdSelect);
  const applyDiscountCode = useSelector((state) => state.method.applyDiscountCode);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  console.log("selectedPromo:::", selectedPromo)
  console.log("usePromo:::", usePromo)

  // Danh sách mã khuyến mãi
  // const [promos, setPromos] = useState([
  //   { id: "1", condition: {price: 100000}, value: {maxDiscount: 50000, percent: 5}, code: "DISCOUNT1", description: "Giảm 5% cho ", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   { id: "2", condition: {price: 200000}, value: {maxDiscount: 50000, percent: 10}, code: "DISCOUNT2", description: "Miễn phí vận chuyển cho đơn hàng từ 200k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   { id: "3", condition: {price: 200000}, value: {value: 15000}, code: "DISCOUNT3", description: "Miễn phí vận chuyển cho đơn hàng từ 200k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   { id: "4", condition: {price: 500000}, value: {value: 50000}, code: "DISCOUNT4", description: "Miễn phí vận chuyển cho đơn hàng từ 200k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   // { id: "5", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 15}, code: "VIP20", description: "Giảm 20% cho thành viên VIP", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   // { id: "6", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   // { id: "7", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  //   // { id: "8", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
  // ]);

  const showModal = (promo) => {
    setSelectedPromo(promo);
    setIsModalVisible(true); // Hiển thị modal khi nhấn vào item
  };
 
  const usePromoCode = () => {
    const updatedPromos = promos.map((item) => selectedPromo.id === item.id ? { ...item, isSelected: !item.isSelected } : { ...item, isSelected: false
    });
    dispatch(setPromos(updatedPromos));  // Cập nhật mã được chọn
    setUsePromo(selectedPromo);
    setIsModalVisible(false); // Đóng modal sau khi chọn mã
  };

  const togglePromoSelection = (promo) => {
    const updatedPromos = promos.map((item) => promo.id === item.id ? { ...item, isSelected: !item.isSelected } : { ...item, isSelected: false
    });
    dispatch(setPromos(updatedPromos)); // Cập nhật mã được chọn
    setUsePromo(promo);
  };
  const applyHandle = () => {
    console.log("usePromo:::", usePromo.discount.percent)
    if(usePromo.discount.percent) {
      console.log("usePromo.discount.precent::: hoat dong")
      const discountPrice = (priceState * usePromo.discount.percent / 100) > usePromo.discount.maxDiscount ? usePromo.discount.maxDiscount : (priceState * usePromo.discount.percent / 100)
      console.log("discountPrice:::", discountPrice)
      const finalPrice = priceState - discountPrice
      console.log("finalPrice:::", finalPrice)
      dispatch(setApplyDiscountCode(usePromo.code))
      dispatch(setApplyPrice(priceState))
      dispatch(setApplyFinalPrice(finalPrice))
      dispatch(setApplyIdSelect(idSelect))
    } 
    if (usePromo.discount.value) {
      console.log("usePromo.discount.value::: hoat dong")
      const finalPrice = priceState - usePromo.discount.value
      dispatch(setApplyDiscountCode(usePromo.code))
      dispatch(setApplyFinalPrice(finalPrice))
      dispatch(setApplyIdSelect(idSelect))
      dispatch(setApplyPrice(priceState))
    }
    navigation.goBack()
  };
  useEffect(() => {
    const promoData = [
      { id: "1", condition: {price: 100000}, discount: {maxDiscount: 50000, percent: 5}, code: "DISCOUNT1", description: "Giảm 5% cho đơn hàng từ 100k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      { id: "2", condition: {price: 200000}, discount: {maxDiscount: 50000, percent: 10}, code: "DISCOUNT2", description: "Giảm 10% cho đơn hàng từ 200k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      { id: "3", condition: {price: 200000}, discount: {value: 15000}, code: "DISCOUNT3", description: "Giảm 15k cho đơn hàng từ 200k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      { id: "4", condition: {price: 500000}, discount: {value: 50000}, code: "DISCOUNT4", description: "Giảm 50k cho đơn hàng từ 500k", isAvailable: true, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      // { id: "5", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 15}, code: "VIP20", description: "Giảm 20% cho thành viên VIP", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      // { id: "6", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      // { id: "7", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
      // { id: "8", condition: {price: 100000}, value: {maxDiscount: 50000, value: 15000, percent: 20}, code: "NEWYEAR2024", description: "Giảm 10% cho năm mới", isAvailable: false, isSelected: false, imageUrl: "https://via.placeholder.com/50" },
    ];
    const updatedPromos = promoData.map((promo) => ({
      ...promo,
      isAvailable: promo.condition.price <= priceState,
      isSelected:  (applyIdSelect == idSelect) && (promo.code === applyDiscountCode),
    }));
    // const updatedPromos1 = updatedPromos.map((promo) => ({
    //   ...promo,
    //   isSelected: promo.id === idSelect,
    // }));
    if (updatedPromos) {
      dispatch(setPromos(updatedPromos)); 
    }
  }, [priceState]);

  const renderPromoItem = (item) => (
    <TouchableOpacity
      style={[
        styles.promoItem,
        {
          backgroundColor: item.isAvailable ? "#e0ffe0" : "#f0f0f0", // Xanh cho mã có thể dùng, xám cho mã không đủ điều kiện
          borderColor: item.isAvailable ? "#28a745" : "#ccc", // Đổi màu đường viền
        },
      ]}
      onPress={() => showModal(item)} // Mở modal khi nhấn vào item
    >
      {/* Ảnh ở bên trái */}
      <Image source={{ uri: item.imageUrl }} style={styles.promoImage} />
      
      <View style={styles.promoInfo}>
        <Text style={[styles.promoCode, { color: item.isAvailable ? "#333" : "#888" }]}>
          {item.code}
        </Text>
        <Text style={[styles.promoDescription, { color: item.isAvailable ? "#333" : "#888" }]}>
          {item.description}
        </Text>
      </View>
      {/* Checkbox tròn bên phải */}
      <TouchableOpacity onPress={() => togglePromoSelection(item)}>
        <MaterialIcons
          name={item.isSelected ? "radio-button-checked" : "radio-button-unchecked"} 
          size={24}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh nhập mã khuyến mãi */}
      <View style={styles.promoInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã khuyến mãi hoặc mã quà tặng "
          placeholderTextColor="#888"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        {/* <TouchableOpacity style={styles.applyButton} onPress={() => Alert.alert("Áp dụng mã", promoCode.trim())}>
          <Text style={styles.applyButtonText}>Áp dụng</Text>
        </TouchableOpacity> */}
      </View>

      {/* Danh sách mã khuyến mãi */}
      <FlatList
        data={promos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderPromoItem(item)}
        style={styles.promoList}
      />
      <View style={styles.footer}>
          <Text style={styles.selectedPromoText}>
            Đã chọn {promos.filter((promo) => promo.isSelected).length} ưu đãi
          </Text>
          <TouchableOpacity
            style={styles.applyFooterButton}
            onPress={() => applyHandle()}
          >
            <Text style={styles.applyFooterButtonText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>

      {/* Modal hiển thị thông tin mã khuyến mãi */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Thông tin mã {selectedPromo?.code}</Text>
              <Text style={styles.modalDescription}>{selectedPromo?.description}</Text>
              {/* Nếu mã có thể sử dụng */}
              {selectedPromo?.isAvailable ? (
                <Text style={styles.modalInfoText}>Mã này có thể sử dụng ngay!</Text>
              ) : (
                <Text style={styles.modalInfoText}>Điều kiện sử dụng: {selectedPromo?.description}</Text>
              )}
              {/* Nút sử dụng ngay */}
              <TouchableOpacity
                style={[styles.useButton, { backgroundColor: selectedPromo?.isAvailable ? "#28a745" : "#ccc" }]}
                onPress={selectedPromo?.isAvailable ? (() => {
                  usePromoCode()
                  // dispatch(setDiscountCode(selectedPromo?.code))
                  }) : null} // Chỉ cho phép sử dụng nếu mã có thể dùng
                disabled={!selectedPromo?.isAvailable} // Nếu không thể dùng thì nút sẽ bị vô hiệu hóa
              >
                <Text style={styles.useButtonText}>{selectedPromo?.isSelected ? "Bỏ chọn ": "Sử dụng ngay"}</Text>
              </TouchableOpacity>
              {/* Nút đóng modal */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      {/* View cố định ở cuối màn hình */}
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
  },
  promoInputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  applyButton: {
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  promoList: {
    marginTop: 10,
  },
  promoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
  },
  promoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15, // Khoảng cách giữa ảnh và thông tin
  },
  promoInfo: {
    flex: 1,
  },
  promoCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promoDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInfoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  useButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  useButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  selectedPromoText: {
    fontSize: 16,
    color: "#333",
  },
  applyFooterButton: {
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyFooterButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

});

export default DiscountScreen;
