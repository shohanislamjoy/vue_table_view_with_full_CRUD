import axios from 'axios';


const api =axios.create({
    baseURL : 'https://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api; 
