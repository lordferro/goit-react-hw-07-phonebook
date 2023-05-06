import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContactThunk,
  deleteContactThunk,
  fetchContactsThunk,
} from './contactsOperation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const STATUS = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const notifyAdd = name =>
  toast.success(`${name} is added`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const notifyDeleted = name =>
  toast.warn(`${name} was deleted`, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });

const extraReducers = [addContactThunk, deleteContactThunk, fetchContactsThunk];
const getActions = type =>
  isAnyOf(...extraReducers.map(operation => operation[type]));

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
  state.isAdding = false;
  notifyAdd(payload.name);
  state.items.push(payload);
};
const handleFulfilledDelete = (state, { payload }) => {
  const index = state.items.findIndex(contact => contact.id === payload.id);
  notifyDeleted(payload.name);
  state.items.splice(index, 1);
};
const handleRejected = (state, { payload }) => {
  state.error = payload;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { items: [], isLoading: false, isAdding: false, error: null },
  reducers: {
    startAddingContact: state => {
      state.isAdding = true;
    },
  },

  extraReducers: builder => {
    const { REJECTED, FULFILLED, PENDING } = STATUS;
    builder
      .addCase(fetchContactsThunk.fulfilled, handleFulfilledFetchAll)
      .addCase(addContactThunk.fulfilled, handleFulfilledAdd)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDelete)
      .addMatcher(isAnyOf(getActions(FULFILLED)), handleFulfilled)
      .addMatcher(isAnyOf(getActions(PENDING)), handlePending)
      .addMatcher(isAnyOf(getActions(REJECTED)), handleRejected);
  },
});

export default contactsSlice.reducer;
export const { startAddingContact } = contactsSlice.actions;
