import { config } from "config";
import { LocationService } from "../app/views/home/location-service.service";


const locationService = new LocationService();

export const environment = {
  production: true,
  apiURL: config.apiUrl,
  port:'',
  host: locationService.getHost()
};