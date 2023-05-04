import axios from 'axios'

axios.defaults.baseURL = 'https://6453a5b1c18adbbdfea35ef8.mockapi.io/';

export async function fetchContacts() {
    const {data}  = await axios.get('contacts')
    return data;
}

