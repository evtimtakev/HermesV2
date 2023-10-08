import axios from "axios";
import {HttpRequest} from "../../models/http/http-request.model";

export const GET = (bearerToken?: string, headers?: Record<string, string>) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor): any => {
        const originalFunction = descriptor.value;

        descriptor.value = async function (...args) {
           const { url, params }: HttpRequest =  originalFunction.apply(target, args);
            try {
                const config = {
                    params : params,

                };

                if(headers) {
                    config["headers"] = headers
                }

                if(bearerToken) {
                    config["headers"] = { Authorization: `Bearer ${bearerToken}` }
                }

               const { data } =  await axios.get(url, config);
               return data;
            } catch (e) {
                console.log(e)
                return undefined;
            }
        };

        return descriptor;
    }
