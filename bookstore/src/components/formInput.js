const formValidation = (state, action) => {
  if (action.type === "EMAIL") {
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (action.data.match(pattern)) {
      state.errorMsg = "Okay";
      return {
        errorMsg: "",
        isError: false,
      };
    } else {
      return {
        errorMsg: "Wrong Format of email address",
        isError: true,
      };
    }
  }

  if (action.type === "PASSWORD") {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (action.data.match(pattern)) {
      return {
        errorMsg: "",
        isError: false,
      };
    } else {
      return {
        errorMsg:
          "Password Should have 6 characters, at least one letter and one number",
        isError: true,
      };
    }
  }

  if (action.type === "FULLNAME") {
    const pattern = /^[A-z]([-']?[A-z]+)*( [A-z]([-']?[A-z]+)*)+$/;

    if (action.data.match(pattern)) {
      return {
        errorMsg: "",
        isError: false,
      };
    } else {
      return {
        errorMsg: "Full name is in wrong format (ex. John Doe Jr.)",
        isError: true,
      };
    }
  }

  if (action.type === "ADDRESS") {
    const pattern = /^[a-zA-Z0-9\s,.'-]{3,}$/;

    if (action.data.match(pattern)) {
      return {
        errorMsg: "",
        isError: false,
      };
    } else {
      return {
        errorMsg: "Please Input the correct format",
        isError: true,
      };
    }
  }

  if (action.type === "CONTACT_NO") {
    const pattern = /((^(\+)(\d){12}$)|(^\d{10}$))/;

    if (action.data.match(pattern)) {
      return {
        errorMsg: "",
        isError: false,
      };
    } else {
      return {
        errorMsg: "Please Input the correct format",
        isError: true,
      };
    }
  }

  return state;
};

export default formValidation;
