import ProductCard from "../components/card/ProductCard";
import SiteLayout from "../layout/SiteLayout";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../config/axios";
import Pagination from "../components/pagination/Pagination";
import Filter from "../components/filter/Filter";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import useDebounce from "../hook/useDebounce";
import { CarouselTransition } from "../components/carousel/Carousel";

const ProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query, 1500);
  const [currentPage, setCurrentPage] = useState(0); // Thêm state trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Thêm state tổng số trang

  const fetchData = async (url) => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setProductData(response.data || response.content);
      const totalPages = Math.ceil(response["all-item"] / response.size);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (brand || category || gender || season) {
      fetchData(
        `/product?season=${season}&gender=${gender}&category=${category}&brand=${brand}&size=16`
      );
    } else if (queryDebounce) {
      fetchData(`/product/search?key=${queryDebounce}&size=16`);
    } else {
      fetchData(`/product?page=${currentPage}&size=16`);
    }
  }, [brand, category, gender, queryDebounce, season, currentPage]);
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setBrand("");
    setGender("");
    setCategory("");
    setSeason("");
  };
  console.log(productData);
  const handleChangePage = (page) => {
    setCurrentPage(page);
  };
  const handleSeasonValue = (e) => {
    setSeason(e.target.value);
  };
  const handleGenderValue = (e) => {
    setGender(e.target.value);
  };
  const handleCategoryValue = (e) => {
    setCategory(e.target.value);
  };
  const handleBrandValue = (e) => {
    setBrand(e.target.value);
  };
  return (
    <>
      <SiteLayout>
        <CarouselTransition></CarouselTransition>
        <div className="flex justify-center gap-10 mx-20 my-10">
          <div className="flex-none mx-6 w-96">
            <Filter
              handleSearchChange={handleSearchChange}
              handleSeasonValue={handleSeasonValue}
              handleGenderValue={handleGenderValue}
              handleCategoryValue={handleCategoryValue}
              handleBrandValue={handleBrandValue}
            />
          </div>
          <div className="justify-start flex-1 gap-5">
            {loading && (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
                <ProductCardLoading />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {!loading &&
                productData &&
                productData.length > 0 &&
                productData.map((item) => (
                  <ProductCard
                    className="mx-2 my-2 cursor-pointer w-72 hover:scale-105 focus:scale-105 active:scale-100"
                    key={item.id}
                    item={item}
                  ></ProductCard>
                ))}
            </div>
            <div className="flex items-center justify-center mt-4">
              {totalPages && totalPages > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onChange={handleChangePage}
                ></Pagination>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {!loading && !productData && (
                <p className="text-xl font-semibold text-center font-eculid">
                  There are no products to display at the moment
                </p>
              )}
            </div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
};

const ProductCardLoading = () => {
  return (
    <Card className="mx-2 my-2 cursor-pointer w-72 hover:scale-105 focus:scale-105 active:scale-100">
      <CardHeader shadow={false} floated={false} className="h-80">
        <LoadingSkeleton height="100%" />
      </CardHeader>
      <CardBody>
        <LoadingSkeleton height="20px" />
        <div
          color="blue-gray"
          className="flex items-center justify-start gap-2 py-2 text-xl font-medium"
        >
          <LoadingSkeleton height="20px" width="50%" />
        </div>
        <div
          color="blue-gray"
          className="flex items-center justify-between gap-8 font-medium"
        >
          <LoadingSkeleton height="10px" width="100%" />
          <LoadingSkeleton height="10px" width="50%" />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductPage;
