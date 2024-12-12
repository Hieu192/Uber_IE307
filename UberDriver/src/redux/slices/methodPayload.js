import { createSlice } from "@reduxjs/toolkit";

// State ban đầu
const initialState = {
  method: "Tiền mặt", // Lưu phương thức được chọn
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
  },
});

// Export actions
export const { setMethod, clearMethod } = methodSlice.actions;

// Export reducer
export default methodSlice.reducer;