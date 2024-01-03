import imgBanner from "/src/assets/images/imagebanner.png";
import eclipBanner from "/src/assets/images/eclipsebanner.png";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../config/axios";
import { Link } from "react-router-dom";
const HomeBanner = () => {
  const [discount, setDiscount] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/discount/is-active?");
        setDiscount(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex w-full">
      <div className="bg-[#1C2333] basis-3/5 flex justify-center items-center">
        <div className="flex flex-col items-start p-5 lg:w-[750px] md:w-[580px] sm:w-[350px] gap-8 bg-[#1F2937]">
          <div className="flex flex-col items-start gap-8">
            <h1 className="flex flex-col text-[#FAFAFA] gap-5 font-semibold not-italic font-eculid lg:text-[40px] md:text-[20px] sm:text-[20px]">
              {discount[0]?.description}
              <span className="text-[#F7C59F] font-eculid text-3xl">
                New Arrivals
              </span>
            </h1>
            <p className="lg:text-xl md:text-base sm:text-sm font-eculid text-[#F3F4F6] not-italic font-semibold">
              Introducing our latest collection of products
            </p>
          </div>
          <button className="px-4 py-3 border lg:w-[210px] md:w-[180px] sm:w-[120px]">
            <Link
              to="/product"
              className="font-semibold text-white lg:text-base md:text-sm sm:text-[8px] font-eculid"
            >
              PLACE YOUR ORDER
            </Link>
          </button>
        </div>
      </div>
      <div className="basis-2/5 bg-[#F7C59F] relative">
        <img
          src={eclipBanner}
          alt="eclipse"
          className="absolute inset-0 m-auto"
        />
        <img
          src={imgBanner}
          alt="Img banner"
          className="relative z-0 mx-auto mt-4"
        />
      </div>
    </div>
  );
};

export default HomeBanner;
