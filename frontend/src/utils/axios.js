import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:9999',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;
