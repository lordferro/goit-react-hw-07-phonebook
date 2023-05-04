import { ContactItem } from 'components/ContactItem/ContactItem';
import { StyledContactsList } from './ContactsList.styled';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactsList = () => {
  const contacts = useSelector(selectFilteredContacts)
  
  return (
    <>
      <StyledContactsList>
        {contacts.map(contact => {
          return (
            <li key={contact.id}>
              <ContactItem contact={contact} />
            </li>
          );
        })}
      </StyledContactsList>
    </>
  );
};
