import Input from "../components/input/Input";
import Button from "../components/button/Button";
import logo from "../assets/images/logo-removebg.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useVerifyEmailMutation } from "../redux/api/authApi";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const ForgotPWPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyEmailMutation();
  const schema = yup
    .object({
      email: yup.string().email().required("Please enter your email"),
    })
    .required();
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async ({ email }) => {
    if (!isValid) return;
    try {
      setLoading(true);
      const response = await verifyEmail({ email }).unwrap();
      if (response.result === true) {
        navigate("/checkmail");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    reset({
      email: "",
    });
  };

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-[#F7C59F] bg-gradient-to-b"></div>
      <div className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="z-10 flex self-center">
          <div className="p-12 mx-auto bg-white rounded-3xl w-[550px] shadow-lg">
            <img
              src={logo}
              width="30%"
              alt=""
              className="flex items-center justify-center"
            />
            <div className="mb-1">
              <h1 className="mt-3 text-2xl font-semibold text-gray-800">
                Forgot your password?
              </h1>
              <h2 className="mt-2 text-gray-500">
                Follow these simple steps to reset your account:
              </h2>
              <div className="mt-3 ml-6 text-gray-400">
                <ol className="list-decimal">
                  <li>Enter your username or email.</li>
                  <li>
                    Visit your email account, open the email sent by The Trendy
                    Fashionista
                  </li>
                  <li>
                    Follow the instruction in the mail to change password.
                  </li>
                </ol>
              </div>
            </div>
            <div className="flex flex-col items-center w-full gap-5 mb-4">
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Input
                  name="email"
                  type="email"
                  label="Enter your email"
                  className="w-[455px] my-4"
                  control={control}
                  errors={errors}
                />
                <Button
                  type="submit"
                  className="w-[455px] bg-[#F7C59F]  text-gray-800"
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
                    "Get new password"
                  )}
                </Button>
              </form>
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

export default ForgotPWPage;
