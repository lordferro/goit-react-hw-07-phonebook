import { ContactsForm } from './ContactForm/ContactsForm';

import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import 'index.css';
import { Wrapper } from './App.styled';
import { ToastContainer } from 'react-toastify';


export const App = () => {

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactsForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactsList />
      <ToastContainer/>
    </Wrapper>
  );
};
