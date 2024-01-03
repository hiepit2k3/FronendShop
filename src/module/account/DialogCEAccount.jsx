import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Input from "../../components/input/Input";
import PropTypes from "prop-types";
import RadioButton from "../../components/radioButton/RadioButton";
import ImageUpload from "../../components/imageUpload/ImageUpload";
import Textarea from "../../components/textarea/Textarea";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEAccount = ({
  show,
  cancel,
  handleSubmitData,
  isUpdate,
  dataToEdit,
  loading,
}) => {
  const schema = yup
    .object({
      username: yup.string().required("Please enter username"),
      ...(!isUpdate && {
        password: yup.string().required("Please enter password"),
      }),
      email: yup.string().email("Invalid email").required("Email is required"),
      fullName: yup.string().required("Please enter full name"),
      phoneNumber: yup.number().required("Please enter phone number"),
      birthday: yup
        .date()
        .transform((originalValue) => {
          return isNaN(Date.parse(originalValue)) ? undefined : originalValue;
        })
        .typeError("Please enter a valid date for birthday")
        .required("Please enter birthday"),
      address: yup.string().required("Please enter address"),
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
  useEffect(() => {
    if (!show) {
      reset({
        username: "",
        password: "",
        fullName: "",
        birthday: "",
        sex: "",
        address: "",
        phoneNumber: "",
      });
    } else {
      reset(dataToEdit);
    }
  }, [dataToEdit, reset, show]);
  const onSubmitHandler = (data) => {
    if (!isValid) return;
    handleSubmitData(data);
    reset({
      username: "",
      password: "",
      fullName: "",
      birthday: "",
      sex: "",
      address: "",
      phoneNumber: "",
    });
  };
  return (
    <>
      <Dialog open={show} size="sm">
        {isUpdate ? (
          <DialogHeader className="text-lg text-center">
            Edit Account
          </DialogHeader>
        ) : (
          <DialogHeader className="text-lg text-center">
            Add New Account
          </DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="grid items-center justify-center grid-cols-2 gap-3">
              <div className="grid gap-2">
                <ImageUpload
                  name="image"
                  className="w-full"
                  control={control}
                  isUpdate={isUpdate}
                  errors={errors}
                ></ImageUpload>
              </div>
              <div className="grid gap-3">
                <Input
                  name="username"
                  label="Username"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  name="fullName"
                  label="Full Name"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="email"
                  name="email"
                  label="Email"
                  className="w-full"
                  control={control}
                  errors={errors}
                />

                <Input
                  type="Number"
                  name="phoneNumber"
                  label="Phone"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <Input
                  type="date"
                  name="birthday"
                  label="Birthday"
                  className="w-full"
                  control={control}
                  errors={errors}
                />
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">Gender</p>
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
                <Textarea label="Address" name="address" control={control} errors={errors} />
              </div>
            </div>
            <DialogFooter className="float-right">
              <div className="flex items-center justify-center gap-2">
                <Button className="bg-red-500" onClick={cancel}>
                  Cancle
                </Button>
                <Button
                  className="bg-green-500"
                  type="submit"
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
                    "Submit"
                  )}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogCEAccount.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitData: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  dataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEAccount;
