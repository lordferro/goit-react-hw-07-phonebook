import { createSelector } from '@reduxjs/toolkit';

export const selectContactsItems = state => state.contacts.items;
export const selectContacts = state => state.contacts;
export const selectFilter = state => state.filter;
export const selectIsAdding = state => state.contacts.isAdding;


// export const selectFilteredContacts = state => {
//     console.log('1')
//     const contacts = selectContactsItems(state);
//     const filterQuery = selectFilter(state)
//    return contacts.filter(contact =>
//      contact.name.toLowerCase().includes(filterQuery.toLowerCase())
//    );
//  };
export const selectFilteredContacts = createSelector(
  [selectContactsItems, selectFilter],
  (contacts, filterQuery) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
  }
);
