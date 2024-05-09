// import axios from 'axios';
import HttpService from '../services/HttpService';

const RESOURCE_API_BASE_URL = 'http://localhost:8080/resources';

class ApiService {

    testFetchResoureces(){
        return HttpService.getAxiosClient().get(RESOURCE_API_BASE_URL);
    }
    fetchResources(userId) {
        return HttpService.getAxiosClient().get(RESOURCE_API_BASE_URL + '/' + userId);
    }

    fetchResourceById(resourceId) {
        return HttpService.getAxiosClient().get(RESOURCE_API_BASE_URL + '/get-one/' + resourceId);
    }
    fetchResourcesToDropDown(userId){
        return HttpService.getAxiosClient().get(RESOURCE_API_BASE_URL + '/resource-dropdown/' + userId);
    }

    deleteResource(resourceId) {
        return HttpService.getAxiosClient().delete(RESOURCE_API_BASE_URL + '/' + resourceId);
    }

    addResource(resource, userId) {
        return HttpService.getAxiosClient().post("" + RESOURCE_API_BASE_URL + '/' + userId, resource);
    }

    editResource(resource) {
        return HttpService.getAxiosClient().put(RESOURCE_API_BASE_URL + '/' + resource.id, resource);
    }

}

export default new ApiService();