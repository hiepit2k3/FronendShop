import Heading from "../../components/heading/Heading";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../config/axios";

const HomeBrand = () => {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/brand?size=8");
        setBrand(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Heading className="mb-4 text-center">BRANDS FOR YOU</Heading>
      <div className="flex items-center justify-center gap-14">
        {brand &&
          brand.length > 0 &&
          brand.map((item) => (
            <img key={item.id} src={item.image} alt="" className="w-20 h-20" />
          ))}
      </div>
    </>
  );
};

export default HomeBrand;
