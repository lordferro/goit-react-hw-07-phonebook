import axios from 'axios';

axios.defaults.baseURL = 'https://6453a5b1c18adbbdfea35ef8.mockapi.io/';

export async function fetchContacts() {
  const { data } = await axios.get('contacts');
  return data;
}

export async function deleteContact(contactId) {
  const { data } = await axios.delete(`contacts/${contactId}`);
  return data;
}
export async function addContact(contact) {
  const { data } = await axios.post(`contacts`,contact);
  return data;
}
