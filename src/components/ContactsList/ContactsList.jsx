import { ContactItem } from 'components/ContactItem/ContactItem';
import { StyledContactsList } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contactsOperation';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.contacts);
  const filteredContacts = useSelector(selectFilteredContacts)

  useEffect(() => {dispatch(fetchContacts())}, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <StyledContactsList>
          {filteredContacts.map(contact => {
            return (
              <li key={contact.id}>
                <ContactItem contact={contact} />
              </li>
            );
          })}
        </StyledContactsList>
      )}
    </>
  );
};
