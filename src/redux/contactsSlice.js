import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOperation';

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};
const handleFulfilledAdd = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};
const handleFulfilledDelete = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(contact => contact.id === payload.id);
  state.items.splice(index, 1);
};

const handleRejected = (state, { payload }) => {
  state.error = payload;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, error: null },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(deleteContact.pending, handlePending)
      .addCase(addContact.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFulfilled)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.rejected, handleRejected);
    // тут в массив может добавляться много actions
    // .addMatcher(isAnyOf([fetchContacts.pending]), handlePending);
  },
});

export default contactsSlice.reducer;

// устаревший вариант
// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { items: [], isLoading: false, error: null },

//   extraReducers: {
//     [fetchContacts.fulfilled]:(state, { payload })=> {
//       state.isLoading = false;
//       state.error = null;
//       state.items = payload;
//     },
//     [fetchContacts.pending]:(state) =>{
//       state.isLoading = true;
//     },
//     [fetchContacts.rejected]:(state, { payload }) =>{
//       state.isLoading = false;
//       state.error = payload;
//     },
//   },
// });

// export default contactsSlice.reducer;
