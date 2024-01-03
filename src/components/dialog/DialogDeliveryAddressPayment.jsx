import {
  Card,
  CardBody,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../../redux/features/authSlice";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { MdOutlinePlace } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const DialogDeliveryAddressPayment = ({
  show,
  onUseDeliveryAddress,
  handleCloseDeliveryAddress,
}) => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [deliveryAddressData, setDeliveryAddressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/deliveryAddress/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeliveryAddressData(response.data);
      } catch (error) {
        setDeliveryAddressData([]);
      }
    };
    fetchData();
  }, [token]);
  const handleUseDeliveryAddress = (usedDeliveryAddress) => {
    const username = user.fullName;
    onUseDeliveryAddress(usedDeliveryAddress, username);
    handleCloseDeliveryAddress();
  };
  return (
    <>
      <Dialog open={show}>
        <DialogHeader className="flex justify-between">
          <span>Choose your delivery address</span>
          <span className="cursor-pointer" onClick={handleCloseDeliveryAddress}>
            <IoMdClose />
          </span>
        </DialogHeader>
        <DialogBody>
          <Card>
            {deliveryAddressData?.length > 0 &&
              deliveryAddressData.map((item) => (
                <CardBody key={item.id}>
                  <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center justify-center gap-2">
                      <MdOutlinePlace className="w-8 h-8" />
                      <div className="flex flex-col items-start justify-start">
                        <p className="text-gray-700">
                          {user.fullName}, {item.phoneNumber}
                        </p>
                        <p className="w-[407px]">
                          {" "}
                          {item.apartmentNumber}, {item.ward}, {item.district},{" "}
                          {item.city},{" "}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outlined"
                      className="w-20"
                      onClick={() => handleUseDeliveryAddress(item)}
                    >
                      Use
                    </Button>
                  </div>
                </CardBody>
              ))}
          </Card>
        </DialogBody>
        <DialogFooter>
          <div
            className="flex items-center justify-center gap-2 p-2 cursor-pointer outline outline-1 outline-blue-gray-800"
            onClick={() => navigate("/user/address")}
          >
            <AiOutlinePlus />
            <span>Add new address</span>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

DialogDeliveryAddressPayment.propTypes = {
  show: PropTypes.bool,
  handleCloseDeliveryAddress: PropTypes.func,
  onUseDeliveryAddress: PropTypes.func,
};

export default DialogDeliveryAddressPayment;
