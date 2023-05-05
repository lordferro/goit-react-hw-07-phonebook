import { useDispatch, useSelector } from 'react-redux';
import { StyledContactsForm } from './ContactsForm.styled';

import { selectContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsOperation';

export const ContactsForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    const form = e.target;
    e.preventDefault();

    const newContact = {
      name: form.name.value,
      phone: form.number.value,
    };

    const normalizedName = newContact.name.toLowerCase();

    if (checkDobleName(normalizedName)) {
      return alert(`${form.name.value} is already in contacts`);
    }

    dispatch(addContact(newContact));
    form.reset();
  };

  const checkDobleName = name =>
    contacts.find(contact => contact.name.toLowerCase() === name);

  return (
    <StyledContactsForm onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="number">Number</label>
      <input
        type="tel"
        name="number"
        id="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </StyledContactsForm>
  );
};
