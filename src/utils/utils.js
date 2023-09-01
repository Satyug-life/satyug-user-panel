
export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const debouncing = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 500);
  };
};

export const validatePincode = (value, setUserError) => {
  // Check if the value is empty
  if (!value) {
    setUserError({ error: true, message: "Please enter Pincode" });
    return false;
  }

  if (!/^\S*$/.test(value)) {
    setUserError({
      error: true,
      message: "Whitespace is not allowed",
    });
    return false;
  }
  // Check if the value contains only alphanumeric characters
  // if (!FORMIK_REGEX.POSTAL_REGEX.test(value)) {
  //   setUserError({
  //     error: true,
  //     message: "Enter Valid Pincode.",
  //   });
  //   return false;
  // }

  // Perform any additional custom validations here
  setUserError({ error: false, message: "" });
  // Return null if the value is valid
  return true;
};

export const copyText = (text) => {
  return navigator.clipboard.writeText(text).then(() => { });
};
