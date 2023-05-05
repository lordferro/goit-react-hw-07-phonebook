import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOperation';

const extraOperations = [addContact, deleteContact, fetchContacts];
const getOperations = type => extraOperations.map(operation => operation[type]);

const handlePending = state => {
  state.isLoading = true;
};
const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};
const handleFulfilledFetchAll = (state, { payload }) => {
  state.items = payload;
};
const handleFulfilledAdd = (state, { payload }) => {
  state.items.push(payload);
};
const handleFulfilledDelete = (state, { payload }) => {
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
      .addCase(fetchContacts.fulfilled, handleFulfilledFetchAll)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDelete)
      .addMatcher(isAnyOf(...getOperations('fulfilled')), handleFulfilled)
      .addMatcher(isAnyOf(...getOperations('pending')), handlePending)
      .addMatcher(isAnyOf(...getOperations('rejected')), handleRejected);
  },
});

export default contactsSlice.reducer;
