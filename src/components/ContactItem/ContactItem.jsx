import PropTypes from 'prop-types';
import { Wrapper } from './ContactItem.styled';
import { useDispatch } from 'react-redux';
import { deleteContactThunk } from 'redux/contactsOperation';

export const ContactItem = ({ contact: { name, phone, id } }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContactThunk(id));
  };

  return (
    <Wrapper>
      <span>
        {name}: {phone}
      </span>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </Wrapper>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};
