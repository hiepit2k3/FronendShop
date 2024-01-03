import { useEffect } from "react";
import { useState } from "react";
import SiteLayout from "../layout/SiteLayout";
import axios from "../config/axios";
import { Card, CardBody } from "@material-tailwind/react";

import baner from "../assets/images/voucher50.png";
import baner1 from "../assets/images/bannervoucher.png";
import baner2 from "../assets/images/bannervoucher2.png";
import baner3 from "../assets/images/bannevoucher1.png";
import Button from "../components/button/Button";
import { selectCurrentToken } from "../redux/features/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const VoucherPage = () => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [voucherData, setVoucherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/voucher/is-active`,
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {}
        );
        setVoucherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const handleSave = async (voucherId) => {
    if (!token) {
      navigate("/login");
    }
    const VoucherOfAccountDto = {
      voucherId: voucherId,
    };
    try {
      const response = await axios.post(`/voucher/add`, VoucherOfAccountDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Save Voucher successfully!");
        setVoucherData((prevData) =>
          prevData.filter((voucher) => voucher.id !== voucherId)
        );
      }
    } catch (response) {
      toast.error("Save Voucher Fail!");
    }
  };
  return (
    <>
      <SiteLayout>
        <div className="container mx-auto">
          <div className="grid grid-flow-row">
            <div className="text-center border grid-col max-h-80"></div>
            <div className="flex flex-auto w-full h-56 p-6 rounded-xl">
              <div>
                <img src={baner} className="object-cover rounded-xl"></img>
              </div>
              <div>
                <img src={baner2} className="object-cover"></img>
              </div>
              <div>
                <img src={baner3} className="object-cover"></img>
              </div>
              <div className="rounded-xl">
                <img src={baner1} className="object-cover"></img>
              </div>
            </div>
            <div className="h-10 mb-5">
              <div className="relative w-1/6 h-full bg-red-500 rounded-2xl">
                <div className="absolute top-0 right-0 w-1/2 h-full origin-top-right transform bg-black skew-x-45 rounded-2xl"></div>

                <h2 className="absolute left-0 p-5 text-2xl text-white transform -translate-y-1/2 top-1/2">
                  Voucher for you
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {voucherData.map((voucher) => (
                <Card
                  className="w-full border hover:duration-500 justify-center min-h-[170px]"
                  key={voucher.id}
                >
                  <CardBody className="grid items-center justify-center grid-cols-5 gap-3">
                    <div className="col-span-2">
                      <img
                        src={voucher.image}
                        alt="anh"
                        className="object-cover w-64"
                      />
                    </div>
                    <div className="col-span-2">
                      <div className="text-2xl font-medium font-eculid">
                        {voucher.name}
                      </div>
                      <div className="text-lg font-eculid">
                        {voucher.description}
                      </div>
                      <div className="text-sm text-red-900 font-eculid">
                        <span>Expiry: </span>
                        {moment(voucher.expirationDate).diff(
                          moment(),
                          "days"
                        ) >= 1
                          ? moment(voucher.expirationDate).format("DD/MM/YYYY")
                          : moment(voucher.expirationDate).diff(
                              moment(),
                              "hours"
                            ) + " hour"}
                      </div>
                    </div>
                    <div className="flex items-center justify-end col-span-1">
                      <Button
                        className="text-center bg-black"
                        onClick={() => handleSave(voucher.id)}
                      >
                        Save
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
};
export default VoucherPage;
