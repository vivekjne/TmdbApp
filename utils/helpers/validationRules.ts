export const validationRules = {
  // password validation rules
  password: {
    maxLength: {
      value: 20,
      message: "password must not exceed length of 20",
    },
    minLength: {
      value: 8,
      message: "password must have minimum length of 8",
    },
    required: {
      value: true,
      message: "password is required",
    },
  },

  //   username validation rules
  username: {
    required: {
      message: "Username is required.",
      value: true,
    },
    minLength: {
      message: "Username must have more than 3 characters.",
      value: 3,
    },
  },

  //   email validation rules
  email: {
    required: {
      message: "Email is required.",
      value: true,
    },

    pattern: {
      message: "email format is incorrect.",
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    },
  },
};
