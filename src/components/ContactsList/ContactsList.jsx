import { ContactItem } from 'components/ContactItem/ContactItem';
import { StyledContactsList } from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilteredContacts } from 'redux/selectors';
import { useEffect } from 'react';
import { fetchContactsThunk } from 'redux/contactsOperation';
import { ProgressBar } from 'react-loader-spinner';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(selectContacts);
  const filteredContacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#F4442E"
          barColor="#51E5FF"
        />
      )}

      <StyledContactsList>
        {filteredContacts.map(contact => {
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
