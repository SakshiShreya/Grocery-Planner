import { Button, Input } from "@nextui-org/react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import * as yup from "yup";
import GroceryIcon from "../../assets/groceryIcon";
import UserContext from "../../context/userContext";

type Props = {
  onLogin: () => void;
  onClose: () => void;
};

const API_URL = process.env.REACT_APP_API_URL;

const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required")
});

export default function Signup({ onLogin, onClose }: Props) {
  const { addUserDetails } = useContext(UserContext)!;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: schema,
    onSubmit: values => {
      axios
        .post(API_URL + "/auth/signup", values)
        .then(({ data }) => {
          const { jwt, data: userData } = data;
          addUserDetails(userData, jwt);
          onClose();
        })
        .catch(err => {
          // Handle signup error
        });
    }
  });

  const onGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    axios
      .post(API_URL + "/auth/google", credentialResponse)
      .then(({ data }) => {
        const { jwt, data: userData } = data;
        addUserDetails(userData, jwt);
        onClose();
      })
      .catch(err => {
        // Handle login error
      });
  };

  return (
    <div className="pt-8">
      <div className="flex justify-center">
        <GroceryIcon width={75} height={75} />
      </div>
      <h1 className="text-2xl text-center">Welcome to Grocery Planner</h1>
      <p className="text-xs mt-2 mb-8 text-center">
        Already have an account?
        <Button size="sm" className="bg-white p-0 pl-1 min-w-0 h-auto underline" onClick={onLogin}>
          Log in
        </Button>
      </p>

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={onGoogleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
          shape="circle"
          size="medium"
          text="signup_with"
          width="250"
        />
      </div>

      <div className="my-4 flex justify-center items-center">
        <div className="w-full border-slate-300 border-t h-0" />
        <p className="mx-4">OR</p>
        <div className="w-full border-slate-300 border-t h-0" />
      </div>

      <form className="flex flex-col gap-y-2 mb-4" onSubmit={formik.handleSubmit}>
        <div className="flex gap-x-4">
          <Input
            label="First Name"
            size="sm"
            variant="bordered"
            {...formik.getFieldProps("firstName")}
            isInvalid={formik.touched.firstName && !!formik.errors.firstName}
            errorMessage={formik.errors.firstName}
          />
          <Input
            label="Last Name"
            size="sm"
            variant="bordered"
            {...formik.getFieldProps("lastName")}
            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
            errorMessage={formik.errors.lastName}
          />
        </div>
        <Input
          label="Email"
          size="sm"
          variant="bordered"
          {...formik.getFieldProps("email")}
          isInvalid={formik.touched.email && !!formik.errors.email}
          errorMessage={formik.errors.email}
        />
        <Input
          label="Password"
          size="sm"
          variant="bordered"
          type="password"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.errors.password}
        />
        <Input
          label="Confirm Password"
          size="sm"
          variant="bordered"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
          errorMessage={formik.errors.confirmPassword}
        />
        <Button type="submit" color="primary" isDisabled={!formik.isValid} className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
