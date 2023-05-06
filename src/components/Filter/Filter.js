import { Wrapper } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectContactsItems, selectFilter } from 'redux/selectors';
import { filter } from 'redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filterQuery = useSelector(selectFilter);
  const items = useSelector(selectContactsItems);

  const filterHandler = e => dispatch(filter(e.target.value));

  return (
    <>
      {items.length !== 0 ? (
        <Wrapper>
          <label htmlFor="filter">Find contacts by name</label>
          <input
            type="text"
            id="filter"
            value={filterQuery}
            onChange={filterHandler}
          />
        </Wrapper>
      ) : (
        <p>no contacts</p>
      )}
    </>
  );
};
