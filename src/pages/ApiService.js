import axios from 'axios';

const RESOURCE_API_BASE_URL = 'http://localhost:8080/resources';

class ApiService {

    fetchResources(userId) {
        return axios.get(RESOURCE_API_BASE_URL + '/' + userId);
    }

    fetchResourcesById(resourceId) {
        return axios.get(RESOURCE_API_BASE_URL + '/' + resourceId);
    }
    fetchResourcesToDropDown(userId){
        return axios.get(RESOURCE_API_BASE_URL + '/resource-dropdown/' + userId);
    }

    deleteResource(resourceId) {
        return axios.delete(RESOURCE_API_BASE_URL + '/' + resourceId);
    }

    addResource(resource) {
        return axios.post("" + RESOURCE_API_BASE_URL, resource);
    }

    editResource(resource) {
        return axios.put(RESOURCE_API_BASE_URL + '/' + resource.id, resource);
    }

}

export default new ApiService();