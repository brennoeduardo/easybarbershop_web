import type { UseFetchOptions } from "nuxt/app";
import { defu } from 'defu'

interface ApiResponse {
  success: boolean;
  data: any;
  message: string
}

export const useApi = async <T>(path: string, options?: UseFetchOptions<T>): Promise<ApiResponse> => {
  
  const {
    public:{
      apiURL: baseURL
    }
  } = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL,
    key: path.toString(),
    watch: false,
    headers: {
      'Content-Type': 'application/json',
    },
    onResponse (_ctx) {
      // _ctx.response._data = new myBusinessResponse(_ctx.response._data)
    },
    onResponseError (_ctx) {
      // throw new myBusinessError()
    }
  }
  const params = defu(options, defaults)

  try {
    const { data: { value } } = await useFetch(path, params)
    const response: ApiResponse = value as unknown as ApiResponse;

    // console.log('response', response);
    

    return response;
  } 
  catch (error) {
    return  {
      success: false,
      message: 'Erro na consulta com a api',
      data: null
    }
  }
    
}