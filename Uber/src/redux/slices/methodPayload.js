import { createSlice } from "@reduxjs/toolkit";

// State ban đầu
const initialState = {
  method: "Tiền mặt", // Lưu phương thức được chọn
  price: 0, // Lưu giá tiền
  discount: 0, // Lưu giảm giá
  discountCode: null, // Lưu mã giảm giá
  finalPrice: 0, // Lưu giá cuối cùng
  promos: [], // Danh sách mã khuyến mãi
  vehicle: "motorbike", // Lưu loại phương tiện
  idSelect  : 0 ,
  applyPrice: null,
  applyDiscount: null,
  applyFinalPrice: null,
  applyDiscountCode: null,
  applyIdSelect: null,
};

// Tạo slice
const methodSlice = createSlice({
  name: "method",
  initialState,
  reducers: {
    setMethod: (state, action) => {
      state.method = action.payload; // Cập nhật phương thức
    },
    clearMethod: (state) => {
      state.method = null; // Xóa phương thức
    },
    setPrice: (state, action) => {
      state.price = action.payload; // Cập nhật giá tiền
    },
    setDiscount: (state, action) => {
      state.discount = action.payload; // Cập nhật giảm giá
    },
    setDiscountCode: (state, action) => {
      state.discountCode = action.payload; // Cập nhật mã giảm giá
    },
    setFinalPrice: (state, action) => {
      state.finalPrice = action.payload; // Cập nhật giá cuối cùng
    },
    setVehicle: (state, action) => {
      state.vehicle = action.payload; // Cập nhật loại phương tiện
    },
    setIdSelect: (state, action) => {
      state.idSelect = action.payload; // Cập nhật giá cuối cùng
    },
    setApplyIdSelect: (state, action) => {
      state.applyIdSelect = action.payload; // Cập nhật giá cuối cùng
    },
    setApplyPrice: (state, action) => {
      state.applyPrice = action.payload; // Cập nhật giá tiền
    },
    setApplyDiscount: (state, action) => {
      state.applyDiscount = action.payload; // Cập nhật giảm giá
    },
    setApplyDiscountCode: (state, action) => {
      state.applyDiscountCode = action.payload; // Cập nhật mã giảm giá
    },
    setApplyFinalPrice: (state, action) => {
      state.applyFinalPrice = action.payload; // Cập nhật giá cuối cùng
    },
    setPromos: (state, action) => {
      state.promos = action.payload; // Cập nhật danh sách mã khuyến mãi
    },

    resetState(state) {
      return initialState;
    },
  },
});

// Export actions
export const { setMethod, clearMethod, setPrice, setDiscount, setFinalPrice, setDiscountCode, setPromos, setApplyPrice, 
  setApplyDiscount, setApplyFinalPrice, setApplyDiscountCode, setIdSelect, setApplyIdSelect, resetState, setVehicle
  } = methodSlice.actions;

// Export reducer
export default methodSlice.reducer;