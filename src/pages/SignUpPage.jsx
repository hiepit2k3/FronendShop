import Input from "../components/input/Input";
import Button from "../components/button/Button";
import logo from "../assets/images/logo-removebg.png";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import RadioButton from "../components/radioButton/RadioButton";
import Checkbox from "../components/checkbox/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerFailure,
  registerStart,
  registerSuccess,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";
import Label from "../components/label/Label";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();
  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    fullName: yup.string().required("Full name is required"),
    birthday: yup
      .date()
      .transform((originalValue) => {
        return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
      })
      .required("Please choose your birth day"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    email: yup.string().email("Invalid email").required("Email is required"),
    sex: yup.boolean().required("Gender is required"),
    term: yup
      .boolean()
      .oneOf([true], "You must agree to the Terms and Conditions"),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleRegister = async (data) => {
    if (!isValid) return;
    dispatch(registerStart());
    try {
      setLoading(true);
      await registerMutation(data).unwrap();
      dispatch(registerSuccess());
      reset({
        username: "",
        fullName: "",
        birthday: "",
        password: "",
        email: "",
        gender: "",
        term: false,
      });
      navigate("/checkmail");
      setLoading(false);
    } catch (error) {
      if (error.status === 400) {
        toast.error(error.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.status === 500) {
        toast.error("Internal Server Error. Please try again later.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      dispatch(registerFailure(error.data.message));
      setLoading(false);
    }
  };
  const handleOpenGoogle = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/google";
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenFaceBook = () => {
    try {
      window.location.href =
        "http://localhost:8080/oauth2/authorization/facebook";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="flex items-center justify-center gap-0">
          <div className="z-10 flex self-center">
            <div className="p-12 mx-auto bg-white rounded-3xl w-[500px] shadow-lg">
              <div className="mb-3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Sign Up{" "}
                </h3>
                <p className="text-gray-400">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-sm text-purple-700 hover:text-purple-700"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
              <div className="space-y-1">
                <form onSubmit={handleSubmit(handleRegister)}>
                  <div className="flex flex-col gap-3">
                    <Input
                      type="text"
                      label="Enter your username"
                      className="w-[400px]"
                      name="username"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      type="password"
                      label="Enter your password"
                      className="w-[400px]"
                      name="password"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      type="text"
                      label="Enter your fullname"
                      className="w-[400px]"
                      name="fullName"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      label="Choose your birth day"
                      type="date"
                      className="w-[400px]"
                      name="birthday"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      type="email"
                      label="Enter your email"
                      className="w-[400px]"
                      name="email"
                      control={control}
                      errors={errors}
                    />
                    <div className="flex items-center gap-5">
                      <Label className="text-gray-600">Gender:</Label>
                      <RadioButton
                        label="Male"
                        name="sex"
                        ripple={true}
                        value={true}
                        control={control}
                        errors={errors}
                      ></RadioButton>
                      <RadioButton
                        label="Female"
                        name="sex"
                        ripple={true}
                        value={false}
                        control={control}
                        errors={errors}
                      ></RadioButton>
                    </div>
                    <Checkbox
                      label="I agree to the Terms and Conditions of Shop"
                      className="font-eculid"
                      name="term"
                      control={control}
                      errors={errors}
                    ></Checkbox>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-[400px] bg-[#F7C59F] text-gray-800"
                      disabled={isSubmitting}
                    >
                      {loading ? (
                        <ClipLoader
                          color="#fff"
                          size={15}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </div>
                </form>
                <div className="flex items-center justify-center space-x-3">
                  <span className="w-16 h-px bg-gray-300"></span>
                  <span className="font-normal text-gray-600">or</span>
                  <span className="w-16 h-px bg-gray-300"></span>
                </div>
                <div className="flex justify-center w-full gap-7">
                  <Button
                    className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900"
                    onClick={handleOpenGoogle}
                  >
                    <FcGoogle className="w-4 h-4" />
                    <span>Google</span>
                  </Button>
                  <Button
                    className="flex justify-center w-full gap-2 mx-1 my-0 text-gray-800 bg-gray-300 hover:border-gray-900 hover:bg-gray-900"
                    onClick={handleOpenFaceBook}
                  >
                    <BsFacebook color="blue" className="w-4 h-4" />
                    <span>Facebook</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="z-10 flex flex-col justify-center sm:max-w-4xl w-[620px]">
            <div className="flex-col items-center justify-center hidden w-full gap-2 text-gray-300 lg:flex ">
              <img
                src={logo}
                alt="Logo"
                width="50%"
                className="cursor-auto"
                onClick={() => navigate("/")}
              />
              <h1 className="mx-2 text-2xl font-semibold text-gray-900 font-eculid">
                Register Now for Exclusive Shopping Benefits!
              </h1>
              <p className="px-4 text-xl text-gray-900 opacity-75 mx-14 text-start font-eculid">
                Ready to elevate your shopping experience? Unlock a world of
                exclusive deals, personalized recommendations, and seamless
                transactions by registering your account with The Trendy
                Fashionista.
              </p>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="absolute bottom-0 left-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </>
  );
};

export default SignUpPage;
