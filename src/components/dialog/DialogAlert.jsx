import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import Button from "../button/Button";
import { AiOutlineNotification } from "react-icons/ai";
import PropTypes from "prop-types";

const DialogAlert = ({ show, cancel }) => {
  return (
    <>
      <Dialog open={show} size="xs">
        <DialogHeader>
          <div className="flex items-center justify-start gap-3">
            <AiOutlineNotification className="w-12 h-12 text-orange-500" />
            <p className="text-3xl text-orange-500 font-eculid">
              Access Denied !
            </p>
          </div>
        </DialogHeader>
        <DialogBody className="text-xl text-center font-eculid">{`You do not have permission to access this feature.`}</DialogBody>
        <DialogFooter>
          <Button color="orange" onClick={cancel} className="mr-1">
            <span>OK</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
DialogAlert.propTypes = {
  cancel: PropTypes.func,
  show: PropTypes.bool,
};
export default DialogAlert;
