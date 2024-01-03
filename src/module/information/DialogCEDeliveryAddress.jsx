import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../config/axios.js";
import Input from "../../components/input/Input";
import { useState } from "react";
import CustomSelect from "../../components/select/CustomSelect";
import ClipLoader from "react-spinners/ClipLoader";

const DialogCEDeliveryAddress = ({
  show,
  isUpdate,
  handleSubmitAddress,
  cancel,
  title,
  dataToEdit,
  loading,
}) => {
  const host = "https://provinces.open-api.vn/api/";
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [province, setProvinces] = useState([]);
  const schema = yup.object({
    phoneNumber: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^[0-9]+$/, "Please enter a valid phone number"),
    apartmentNumber: yup
      .string()
      .required("Please enter your apartment number"),
  });
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
        phoneNumber: "",
        apartmentNumber: "",
        city: "",
        district: "",
        ward: "",
        cityCode: "",
        districtCode: "",
        wardCode: "",
      });
    } else {
      reset({
        phoneNumber: dataToEdit.phoneNumber,
        apartmentNumber: dataToEdit.apartmentNumber,
        city: dataToEdit.city,
        district: dataToEdit.district,
        ward: dataToEdit.ward,
        cityCode: dataToEdit.cityCode,
        districtCode: dataToEdit.districtCode,
        wardCode: dataToEdit.wardCode,
      });
    }
  }, [dataToEdit, show, reset]);

  const onSubmitHandler = (data) => {
    if (!isValid) return;
    const lastData = {
      ...data,
      cityCode,
      districtCode,
      wardCode,
      selectedCity,
      selectedDistrict,
      selectedWard,
    };
    handleSubmitAddress(lastData);
    reset({
      phoneNumber: "",
      apartmentNumber: "",
      city: "",
      district: "",
      ward: "",
      cityCode: "",
      districtCode: "",
      wardCode: "",
    });
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(`${host}?depth=1`);
        setProvinces(response);
      } catch (error) {
        console.error("Error fetching province:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleCityChange = (e) => {
    const selectedCityOption = e.target.options[e.target.selectedIndex];
    const selectedCityName = selectedCityOption.text;
    const selectedCityCode = selectedCityOption.value;
    setSelectedCity(selectedCityName);
    setCityCode(selectedCityCode);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictOption = e.target.options[e.target.selectedIndex];
    const selectedDistrictName = selectedDistrictOption.text;
    const selectedDistrictCode = selectedDistrictOption.value;
    setDistrictCode(selectedDistrictCode);
    setSelectedDistrict(selectedDistrictName);
    setSelectedWard("");
  };

  const handleWardChange = (e) => {
    const selectedWardOption = e.target.options[e.target.selectedIndex];
    const selectedWardName = selectedWardOption.text;
    setWardCode(selectedWardOption.value);
    setSelectedWard(selectedWardName);
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`${host}p/${cityCode}?depth=2`);
        setDistrict(response.districts);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, [cityCode]);
  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get(`${host}d/${districtCode}?depth=2`);
        setWard(response.wards);
      } catch (error) {
        console.error("Error fetching wards:", error);
      }
    };
    fetchWards();
  }, [districtCode]);

  return (
    <>
      <Dialog open={show} size="sm">
        {isUpdate ? (
          <DialogHeader className="text-lg">Edit {title}</DialogHeader>
        ) : (
          <DialogHeader className="text-lg">Add New {title}</DialogHeader>
        )}
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex items-center">
              <Input
                name="phoneNumber"
                label="Phone Number"
                className="w-[355px]"
                control={control}
                errors={errors}
              />
              <Input
                type="text"
                name="apartmentNumber"
                label="Enter your apartment number"
                className="w-[355px] ml-3"
                control={control}
                errors={errors}
              />
            </div>
            <div className="mt-2">
              <CustomSelect
                className="w-full p-2 border-2 rounded-md"
                title="Province"
                titleOption="Chọn tỉnh/thành phố"
                name="city"
                options={province}
                onChange={handleCityChange}
                control={control}
                errors={errors}
              ></CustomSelect>
            </div>
            <div className="mt-2">
              <CustomSelect
                className="w-full p-2 border-2 rounded-md"
                title="District"
                titleOption="Chọn huyện/quận"
                name="district"
                onChange={handleDistrictChange}
                control={control}
                errors={errors}
                options={district}
              ></CustomSelect>
            </div>
            <div className="mt-2">
              <CustomSelect
                className="w-full p-2 border-2 rounded-md"
                title="Ward"
                titleOption="Chọn xã/phường"
                name="ward"
                onChange={handleWardChange}
                control={control}
                errors={errors}
                options={ward}
              ></CustomSelect>
            </div>
            <DialogFooter>
              <Button className="bg-red-500" onClick={cancel}>
                Cancle
              </Button>
              <Button
                className="ml-2 bg-green-500"
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
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
};
DialogCEDeliveryAddress.propTypes = {
  isUpdate: PropTypes.bool,
  handleSubmitAddress: PropTypes.func,
  cancel: PropTypes.func,
  show: PropTypes.bool,
  title: PropTypes.string,
  dataToEdit: PropTypes.object,
  loading: PropTypes.bool,
};

export default DialogCEDeliveryAddress;
