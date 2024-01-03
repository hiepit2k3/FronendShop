import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

const DialogDelete = ({
  title,
  show,
  confirm,
  cancel,
  question = "Delete",
}) => {
  const questionLowerCase = question.toLowerCase();
  return (
    <>
      <Dialog open={show} size="xs">
        <DialogHeader>{`${question} this ${title}`}</DialogHeader>
        <DialogBody>{`Do you want to ${questionLowerCase} this ${title}`}</DialogBody>
        <DialogFooter>
          <Button color="red" onClick={cancel} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={confirm}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

DialogDelete.propTypes = {
  question: PropTypes.string,
  title: PropTypes.string,
  confirm: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
};

export default DialogDelete;
