import axios from 'axios';

const RESOURCE_API_BASE_URL = 'http://localhost:8080/resources';

class ApiService {

    fetchUsers() {
        return axios.get(RESOURCE_API_BASE_URL);
    }

    fetchUserById(userId) {
        return axios.get(RESOURCE_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId) {
        return axios.delete(RESOURCE_API_BASE_URL + '/' + userId);
    }

    addUser(user) {
        return axios.post(""+RESOURCE_API_BASE_URL, user);
    }

    editUser(user) {
        return axios.put(RESOURCE_API_BASE_URL + '/' + user.id, user);
    }

}

export default new ApiService();