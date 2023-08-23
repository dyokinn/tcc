import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    headers: {
        "x-api-key": "192b9bdd22ab9ed4d12e236c78afcb9a393ec15f71bbf5dc987d54727823bcbf##-2",
    },    
});

export default api