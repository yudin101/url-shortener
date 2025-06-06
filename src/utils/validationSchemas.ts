import { Schema } from "express-validator";

export const UserRegister: Schema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
    isLength: {
      options: {
        min: 5,
        max: 15,
      },
      errorMessage: "Username must be 5-15 characters long",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: {
        min: 8,
      },
      errorMessage: "Password must be at least u character long",
    },
  },
};

export const UserLogin: Schema = {
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
  },
};

export const UrlAdd: Schema = {
  link: {
    in: ["body"],
    isString: {
      errorMessage: "Link must be a string",
    },
    isURL: {
      options: {
        require_protocol: true,
      },
      errorMessage: "Link must be a valid URL",
    },
  },
};
