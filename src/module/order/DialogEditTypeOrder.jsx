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

const typeOrder = [
  {
    id: 1,
    value: "PENDING",
    name: "PENDING",
  },
  {
    id: 2,
    value: "WAIT_TO_PAY",
    name: "TO PAY",
  },
  {
    id: 3,
    value: "PROCESSING",
    name: "PROCESSING",
  },
  {
    id: 4,
    value: "DELIVERING",
    name: "DELIVERING",
  },
  {
    id: 5,
    value: "SUCCESSFUL",
    name: "SUCCESSFUL",
  },
  {
    id: 6,
    value: "CANCELLED",
    name: "CANCELLED",
  },
  {
    id: 7,
    value: "RETURNED",
    name: "RETURNED",
  },
];
const DialogEditTypeOrder = ({
  show,
  handleCancelClick,
  dataToEdit,
  handleChangeTypeOrder,
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
        typeOrder: "",
      });
    } else {
      reset({
        id: dataToEdit?.orderDto?.id,
        typeOrder: dataToEdit?.orderDto?.typeOrder,
      });
    }
  }, [show, dataToEdit, reset]);
  const onSubmitHandler = (data) => {
    handleChangeTypeOrder(data);
    reset({
      id: null,
      typeOrder: "",
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
                name="typeOrder"
                control={control}
                errors={errors}
                options={typeOrder}
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

DialogEditTypeOrder.propTypes = {
  show: PropTypes.bool,
  handleCancelClick: PropTypes.func,
  handleChangeTypeOrder: PropTypes.func,
  dataToEdit: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default DialogEditTypeOrder;
