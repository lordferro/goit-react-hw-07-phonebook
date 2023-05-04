import { createAsyncThunk } from '@reduxjs/toolkit'
import * as contactsApi from 'services/contactsApi' 

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, {rejectWithValue}) => {
    try {
        const contacts = await contactsApi.fetchContacts();
        return contacts
    } catch (error) {
       return rejectWithValue(error) 
    }
})