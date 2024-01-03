import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/button/Button";
import Input from "../components/input/Input";
import logo from "../assets/images/logo-removebg.png";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();
  const urlParams = new URLSearchParams(search);
  const tokenUrl = urlParams.get("token");
  const schema = yup.object().shape({
    usernameOrEmail: yup.string().required("Username or email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    if (tokenUrl) {
      handleLogin({ token: tokenUrl });
    }
  }, [tokenUrl]);
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
  const handleLogin = async (data) => {
    dispatch(loginStart());
    try {
      setLoading(true);
      const response = await loginMutation(data).unwrap();
      const userInfo = {
        username: response?.data.username,
        fullName: response?.data.fullName,
        email: response?.data.email,
        phoneNumber: response?.data.phoneNumber,
        sex: response?.data.sex,
        typeAccount: response?.data.typeAccount,
        path: response?.data.path,
        address: response?.data.address,
        birthday: response?.data.birthday,
        image: response?.data.image,
      };
      dispatch(
        loginSuccess({
          userInfo: userInfo,
          userToken: response?.data.accessToken,
          refreshToken: response?.data.refreshToken,
        })
      );
      if (response.data.path === 2) {
        navigate("/");
      } else {
        navigate("/admin");
      }
      reset({
        username: "",
        password: "",
      });
      toast.success("Login successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
    } catch (error) {
      if (error.status == 400) {
        toast.error("Username or password is incorrect", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (error.status === 404) {
        toast.error("Your account does not exist", {
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
      dispatch(loginFailure());
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="flex items-center justify-center gap-3">
          <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md w-[550px]">
            <div className="flex-col items-center self-start justify-center hidden gap-0 text-gray-300 lg:flex">
              <img
                src={logo}
                alt="Logo"
                width="80%"
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />
              <h1 className="text-3xl font-semibold text-gray-900 font-eculid">
                Welcome Back
              </h1>
              <p className="px-4 mx-2 text-xl text-gray-900 opacity-75 font-eculid">
                Welcome back to your fashion destination! Enter your details and
                explore the latest trends. Let's make this comeback stylish
                together!
              </p>
            </div>
          </div>
          <div className="z-10 flex self-center justify-center">
            <div className="p-12 mx-auto bg-white rounded-3xl w-[450px] shadow-lg">
              <div className="mb-3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-400">
                  Don't have an account?
                  <Link
                    to="/signup"
                    className="text-sm text-purple-700 hover:text-purple-700"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <div className="space-y-1">
                <form onSubmit={handleSubmit(handleLogin)}>
                  <div className="flex flex-col gap-3">
                    <Input
                      type="text"
                      label="Enter your username"
                      className="w-[355px]"
                      name="usernameOrEmail"
                      control={control}
                      errors={errors}
                    />
                    <Input
                      type="password"
                      label="Enter your password"
                      className="w-[355px]"
                      name="password"
                      control={control}
                      errors={errors}
                    />
                  </div>

                  <div className="flex items-center justify-between my-2">
                    <div className="ml-auto text-sm">
                      <Link
                        to="/forgotPW"
                        className="text-purple-700 hover:text-purple-600"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-[355px] bg-[#F7C59F] text-gray-800"
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
                        "Sign In"
                      )}
                    </Button>
                  </div>
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
                </form>
              </div>
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

export default SignInPage;
