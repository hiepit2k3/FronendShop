import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import SelectDefault from "../../components/select/SelectDefault";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const typeAccount = [
  {
    id: 1,
    value: "LOCKED",
    name: "LOCKED",
  },
  {
    id: 2,
    value: "ACTIVE",
    name: "ACTIVE",
  },
];
const DialogEditTypeAccount = ({
  show,
  handleCancelClick,
  dataToEdit,
  handleChangeTypeAccount,
  loading,
}) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
  } = useForm();
  useEffect(() => {
    if (!show && dataToEdit) {
      reset({
        id: null,
        typeAccount: "",
      });
    } else {
      reset({
        id: dataToEdit?.id,
        typeAccount: dataToEdit?.typeAccount,
      });
    }
  }, [show, dataToEdit, reset]);
  const onSubmitHandler = (data) => {
    handleChangeTypeAccount(data);
    reset({
      id: null,
      typeAccount: "",
    });
    handleCancelClick();
  };
  return (
    <>
      <Dialog open={show} size="xs">
        <DialogHeader>{`Select the appropriate order type.`}</DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogBody>
            <div className="flex items-center justify-start gap-2 mx-8">
              <Input
                type="number"
                name="id"
                label="Id"
                className="hidden w-full"
                control={control}
                errors={errors}
              />
              <SelectDefault
                className2="text-lg font-normal w-[150px]"
                className="p-[10px] rounded-lg border-blue-gray-300 w-full"
                title="Type Order"
                name="typeAccount"
                control={control}
                errors={errors}
                options={typeAccount}
              />
            </div>
          </DialogBody>
          <DialogFooter>
            <Button className="mr-1 bg-red-500" onClick={handleCancelClick}>
              <span>Cancel</span>
            </Button>
            <Button
              className="bg-green-500"
              type="submit"
              disabled={isSubmitting}
            >
              <span>
                {loading ? (
                  <ClipLoader
                    color="#fff"
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Change"
                )}
              </span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </>
  );
};

DialogEditTypeAccount.propTypes = {
  show: PropTypes.bool,
  handleCancelClick: PropTypes.func,
  handleChangeTypeAccount: PropTypes.func,
  dataToEdit: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default DialogEditTypeAccount;
