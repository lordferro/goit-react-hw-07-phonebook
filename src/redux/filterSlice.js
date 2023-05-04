const { createSlice } = require('@reduxjs/toolkit');

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filter(state, action) {
      return (state = action.payload);
    },
  },
});

export default filterSlice.reducer;
export const { filter } = filterSlice.actions;
