import { useEffect } from "react";
import InputSearch from "../input/InputSearch";
import RadioFilter from "../radioButton/RadioFilter";
import PropTypes from "prop-types";
import { useState } from "react";
import axios from "../../config/axios";
import RadioFilterByValueID from "../radioButton/RadioFilterByValueID";

const Filter = ({
  handleSearchChange,
  handleSeasonValue,
  handleBrandValue,
  handleCategoryValue,
  handleGenderValue,
}) => {
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/category`);
        setCategoryData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/brand`);
        setBrandData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col h-full gap-2 w-72">
      <InputSearch maxWidth="max-w-[300px]" onChange={handleSearchChange} />
      <div className="flex flex-col my-5">
        <h3 className="font-normal">Season</h3>
        <RadioFilter
          label="All"
          name="season"
          value=""
          ripple={true}
          onChange={handleSeasonValue}
        />
        <RadioFilter
          label="Summer"
          name="season"
          value="SUMMER"
          ripple={true}
          onChange={handleSeasonValue}
        />
        <RadioFilter
          label="Winter"
          name="season"
          value="WINTER"
          ripple={true}
          onChange={handleSeasonValue}
        />
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">BRANDS</h3>
        <RadioFilter
          label="All"
          name="brand"
          value=""
          ripple={true}
          onChange={handleBrandValue}
        />
        {brandData?.length > 0 &&
          brandData.map((item) => (
            <RadioFilterByValueID
              key={item.id}
              label={item.name}
              name="brand"
              value={item.id}
              ripple={true}
              onChange={handleBrandValue}
            />
          ))}
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">CATEGORIES</h3>
        <RadioFilter
          label="All"
          name="category"
          value=""
          ripple={true}
          onChange={handleCategoryValue}
        />
        {categoryData?.length > 0 &&
          categoryData.map((item) => (
            <RadioFilterByValueID
              key={item.id}
              label={item.name}
              name="category"
              value={item.id}
              ripple={true}
              onChange={handleCategoryValue}
            />
          ))}
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">Gender</h3>
        <RadioFilter
          label="All"
          name="gender"
          value=""
          ripple={true}
          onChange={handleGenderValue}
        />
        <RadioFilter
          label="Male"
          name="gender"
          value="MALE"
          ripple={true}
          onChange={handleGenderValue}
        />
        <RadioFilter
          label="Female"
          name="gender"
          value="FEMALE"
          ripple={true}
          onChange={handleGenderValue}
        />
        <RadioFilter
          label="Other"
          name="gender"
          value="OTHER"
          ripple={true}
          onChange={handleGenderValue}
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleSearchChange: PropTypes.func,
  handleSeasonValue: PropTypes.func,
  handleGenderValue: PropTypes.func,
  handleCategoryValue: PropTypes.func,
  handleBrandValue: PropTypes.func,
};

export default Filter;
