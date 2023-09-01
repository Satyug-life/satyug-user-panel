import { toasts } from "../components/common/Toast/Toast";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_HOST;
let isLoading = false;

export const axiosApi = axios.create({
  baseURL: BASE_URL,
});

//request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (config?.headers?.noAuth === 'true') {
      config.headers["api-access-token"] = `${token}`;
    } else {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function formatUrl(url, params) {
  params =
    params && Object.keys(params).length > 0
      ? `?${new URLSearchParams(params).toString()}`
      : "";
  return `${url}${params}`;
}

function handleError(error) {
  if (
    error?.response?.status &&
    (error?.response?.status === 403 || error?.response?.status === 401)
  ) {
    toasts.error("Please re-login, last login session expired.");
    localStorage.clear();
  } else {
    error?.data?.message && toasts.error(error.data.message);
    error?.response?.data?.message && toasts.error(error.response.data.message);
  }
}

function handleSuccess(res) {
  if (res?.status === 200 || res?.status === 201) {
    res?.message && toasts?.success(res?.message);
    res?.data?.message && toasts?.success(res?.data?.message);
  }
  if (res.status === 403 || res.status === 400) {
    res.message && toasts.warning(res.message);
  }
}

export const apiCallGet = async (
  url,
  header,
  params = {},
  toastOn,
  toastError = true
) => {
  try {
    const resp = await axiosApi.get(formatUrl(url, params), header);
    if (toastOn === true) {
      handleSuccess(resp.data);
    }
    return resp.data;
  } catch (error) {
    if (error?.response?.status && error?.response?.status === 401) {
      toasts.error("Please re-login, last login session expired.");
      localStorage.clear();
    }
    if (
      (error?.response?.data && error?.response?.data?.message) ||
      error?.response?.data?.message === "Network Error"
    ) {
      toastError && toasts.error(error?.response?.data?.message);
    }
    return error?.response?.data;
  }
};

export const apiCallPost = async (
  url,
  data,
  params = {},
  toastOn,
  loader = false,
  toastError = true
) => {
  if (loader) {
    isLoading = true;
  }
  try {
    const resp = await axiosApi.post(formatUrl(url, params), data, {});
    if (toastOn === true) {
      handleSuccess(resp.data);
    }
    if (loader) {
      isLoading = false;
    }
    return resp.data;
  } catch (error) {
    if (loader) {
      isLoading = false;
    }
    if (error?.response?.status && error?.response?.status === 401) {
      toasts.error("Please re-login, last login session expired.");
      localStorage.clear();
    }
    if (
      (error?.response?.data && error?.response?.data?.message) ||
      error?.response?.data?.message === "Network Error"
    ) {
      toastError && toasts.error(error?.response?.data?.message);
    }
    return error?.response?.data;
  }
};

export const apiCallPut = async (
  url,
  data,
  params = {},
  toastOn,
  loader = false
) => {
  if (loader) {
    isLoading = true;
  }
  try {
    const resp = await axiosApi.put(formatUrl(url, params), data);
    if (toastOn === true) {
      handleSuccess(resp.data);
    }
    if (loader) {
      isLoading = false;
    }
    return resp.data;
  } catch (error) {
    if (loader) {
      isLoading = false;
    }
    if (error?.response?.status && error?.response?.status === 401) {
      toasts.error("Please re-login, last login session expired.");
      localStorage.clear();
    }
    if (
      (error?.response?.data && error?.response?.data?.message) ||
      error?.response?.data?.message === "Network Error"
    ) {
      toasts.error(error?.response?.data?.message);
    }
    return error?.response?.data;
  }
};

export const apiCallPatch = async (
  url,
  data,
  params = {},
  toastOn,
  loader = false
) => {
  if (loader) {
    isLoading = true;
  }
  try {
    const resp = await axiosApi.patch(formatUrl(url, params), data);
    if (toastOn === true) {
      handleSuccess(resp.data);
    }
    if (loader) {
      isLoading = false;
    }
    return resp.data;
  } catch (error) {
    if (loader) {
      isLoading = false;
    }
    if (error?.response?.status && error?.response?.status === 401) {
      toasts.error("Please re-login, last login session expired.");
      localStorage.clear();
    }
    if (
      (error?.response?.data && error?.response?.data?.message) ||
      error?.response?.data?.message === "Network Error"
    ) {
      toasts.error(error?.response?.data?.message);
    }
    return error?.response?.data;
  }
};

export const apiCallDelete = (url, params = {}, toastOn) => {
  return new Promise((resolve, reject) => {
    axiosApi
      .delete(formatUrl(url, params))
      .then((res) => {
        if (toastOn === true) {
          handleSuccess(res);
        }
        resolve(res.data);
      })
      .catch((error) => {
        handleError(error);
        reject(error);
      });
  });
};


// import { setLoader } from "../redux/loader";
// import { toasts } from "../components/common/Toast/Toast";
// import axios from "axios";
// import { storeInstance } from "..";

// const BASE_URL = process.env.REACT_APP_API_HOST;

// export const axiosApi = axios.create({
//   baseURL: BASE_URL,
// });

// // Request interceptor
// axiosApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (config?.headers?.noAuth === 'true') {
//       config.headers["api-access-token"] = `${token}`;
//     } else {
//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// function formatUrl(url, params) {
//   params =
//     params && Object.keys(params).length > 0
//       ? `?${new URLSearchParams(params).toString()}`
//       : "";
//   return `${url}${params}`;
// }

// function handleError(error) {
//   if (
//     error?.response?.status &&
//     (error?.response?.status === 403 || error?.response?.status === 401)
//   ) {
//     toasts.error("Please re-login, last login session expired.");
//     localStorage.clear();
//   } else {
//     error?.data?.message && toasts.error(error.data.message);
//     error?.response?.data?.message && toasts.error(error.response.data.message);
//   }
// }

// function handleSuccess(res) {
//   if (res?.status === 200 || res?.status === 201) {
//     res?.message && toasts?.success(res?.message);
//     res?.data?.message && toasts?.success(res?.data?.message);
//   }
//   if (res.status === 403 || res.status === 400) {
//     res.message && toasts.warning(res.message);
//   }
// }

// export const apiCallGet = async (
//   url,
//   header,
//   params = {},
//   toastOn,
//   toastError = true
// ) => {
//   const resp = await axiosApi
//     .get(formatUrl(url, params), header)
//     .then(async (res) => {
//       if (toastOn === true) {
//         handleSuccess(res.data);
//       }
//       return res.data;
//     })
//     .catch((error) => {
//       if (error?.response?.status && error?.response?.status === 401) {
//         toasts.error("Please re-login, last login session expired.");
//         localStorage.clear();
//       }
//       if (
//         (error?.response?.data && error?.response?.data?.message) ||
//         error?.response?.data?.message === "Network Error"
//       ) {
//         toastError && toasts.error(error?.response?.data?.message);
//       }
//       return error?.response?.data;
//     });

//   return resp;
// };

// export const apiCallPost = async (
//   url,
//   data,
//   params = {},
//   toastOn,
//   loader = false,
//   toastError = true
// ) => {
//   loader && storeInstance.dispatch(setLoader(true));
//   try {
//     const resp = await axiosApi.post(formatUrl(url, params), data, {});
//     if (toastOn === true) {
//       handleSuccess(resp.data);
//     }
//     loader && storeInstance.dispatch(setLoader(false));
//     return resp.data;
//   } catch (error) {
//     loader && storeInstance.dispatch(setLoader(false));
//     if (error?.response?.status && error?.response?.status === 401) {
//       toasts.error("Please re-login, last login session expired.");
//       localStorage.clear();
//     }
//     if (
//       (error?.response?.data && error?.response?.data?.message) ||
//       error?.response?.data?.message === "Network Error"
//     ) {
//       toastError && toasts.error(error?.response?.data?.message);
//     }
//     return error?.response?.data;
//   }
// };

// export const apiCallPut = async (
//   url,
//   data,
//   params = {},
//   toastOn,
//   loader = false
// ) => {
//   loader && storeInstance.dispatch(setLoader(true));
//   const resp = await axiosApi
//     .put(formatUrl(url, params), data)
//     .then(async (res) => {
//       if (toastOn === true) {
//         handleSuccess(res.data);
//       }
//       loader && storeInstance.dispatch(setLoader(false));
//       return res.data;
//     })
//     .catch((error) => {
//       loader && storeInstance.dispatch(setLoader(false));
//       if (error?.response?.status && error?.response?.status === 401) {
//         toasts.error("Please re-login, last login session expired.");
//         localStorage.clear();
//       }
//       if (
//         (error?.response?.data && error?.response?.data?.message) ||
//         error?.response?.data?.message === "Network Error"
//       ) {
//         toasts.error(error?.response?.data?.message);
//       }
//       return error?.response?.data;
//     });

//   return resp;
// };

// export const apiCallPatch = async (
//   url,
//   data,
//   params = {},
//   toastOn,
//   loader = false
// ) => {
//   loader && storeInstance.dispatch(setLoader(true));
//   const resp = await axiosApi
//     .patch(formatUrl(url, params), data)
//     .then(async (res) => {
//       if (toastOn === true) {
//         handleSuccess(res.data);
//       }
//       loader && storeInstance.dispatch(setLoader(false));
//       return res.data;
//     })
//     .catch((error) => {
//       loader && storeInstance.dispatch(setLoader(false));
//       if (error?.response?.status && error?.response?.status === 401) {
//         toasts.error("Please re-login, last login session expired.");
//         localStorage.clear();
//       }
//       if (
//         (error?.response?.data && error?.response?.data?.message) ||
//         error?.response?.data?.message === "Network Error"
//       ) {
//         toasts.error(error?.response?.data?.message);
//       }
//       return error?.response?.data;
//     });

//   return resp;
// };

// export const apiCallDelete = (url, params = {}, toastOn) => {
//   return new Promise((resolve, reject) => {
//     axiosApi
//       .delete(formatUrl(url, params))
//       .then((res) => {
//         if (toastOn === true) {
//           handleSuccess(res);
//         }
//         resolve(res.data);
//       })
//       .catch((error) => {
//         handleError(error);
//         reject(error);
//       });
//   });
// };

