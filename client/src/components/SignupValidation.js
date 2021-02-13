export default function SignupValidation(input, isValid) {
  console.log(isValid);

  let errors = {};

  if (!input.firstName.trim()) {
    errors.firstName = "name required";
  }
  //emial
  if (!input.userEmail) {
    errors.userEmail = "userEmail required";
  } else if (!/\S+@\S+\.\S+/.test(input.userEmail)) {
    errors.userEmail = "Email address is invalid";
  }
  if (!input.cyfCity.trim()) {
    errors.cyfCity = "city required";
  }

  if (!input.userClassId.trim()) {
    errors.userClassId = "Please enter your class";
  }
  if (!input.userRole.trim()) {
    errors.userRole = "Please select your role";
  }

  return errors;
}
