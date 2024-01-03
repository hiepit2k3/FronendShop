import Input from "../components/input/Input";
import Button from "../components/button/Button";
import logo from "../assets/images/logo-removebg.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import Heading from "../components/heading/Heading";
import { useForgotPWMutation } from "../redux/api/authApi";

const EnterNewPWPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [forgotPW] = useForgotPWMutation();
  const urlParams = new URLSearchParams(search);
  const token = urlParams.get("token");
  const schema = yup.object({
    password: yup.string().required("Please enter a new password"),
  });
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async ({ password }) => {
    if (!isValid) return;
    const lastData = {
      password,
      token,
    };
    try {
      const response = await forgotPW(lastData).unwrap();
      if (response.result === true) {
        navigate("/login");
      }
    } catch (error) {
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
          <div className="flex flex-col items-center justify-center gap-1 p-10 bg-white rounded-3xl w-[550px] shadow-lg">
            <img src={logo} width="30%" alt="" />
            <Heading className="text-lg">Enter New Password</Heading>
            <div className="flex flex-col items-center justify-center gap-3 mt-2 text-gray-400 ml-7">
              <ol className="list-decimal">
                <li>Please enter the new password in the form below..</li>
                <li>
                  Click the Confirm Password button, proceed to the login page,
                  and then log in.
                </li>
                <li>Thank you for choosing our service.</li>
              </ol>
            </div>

            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="flex flex-col items-center w-full gap-5">
                <div className="flex flex-col items-center justify-center gap-3 mt-2">
                  <Input
                    name="password"
                    label="Enter new password"
                    className="w-[455px]"
                    control={control}
                    errors={errors}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-[455px] bg-[#F7C59F]  text-gray-800"
                  disabled={isSubmitting}
                >
                  Confirm Password
                </Button>
              </div>
            </form>
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

export default EnterNewPWPage;
