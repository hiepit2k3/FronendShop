import { FaPlusCircle, FaMinusCircle, FaShippingFast } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSecurity } from "react-icons/md";
import Button from "../components/button/Button";
import { Collapse, Typography } from "@material-tailwind/react";
import SiteLayout from "../layout/SiteLayout";
import Comment from "../components/comment/Comment";
import { useParams } from "react-router";
import axios from "../config/axios";
import { useEffect } from "react";
import { useState } from "react";
import Color from "../components/color/Color";
import Size from "../components/size/Size";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { toast } from "react-toastify";
const ProductDetailPage = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [evaluateData, setEvaluateData] = useState([]);
  const { productVariantsDto, productDto, discount } = productDetail;
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedColors, setSelectedColors] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [visibleReviews, setVisibleReviews] = useState(5);
  const toggleOpen = () => setOpen((cur) => !cur);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedVariant =
    productVariantsDto &&
    productVariantsDto.find(
      (variant) =>
        variant.size === selectedSize && variant.colorId === selectedColor
    );
  const findDarkestColor = (colors) => {
    // Hàm để chuyển màu sang giá trị số để so sánh
    const calculateBrightness = (color) => {
      const hex = color.slice(1); // Loại bỏ ký tự '#' từ mã màu hex
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);

      // Sử dụng giá trị trung bình của các thành phần màu để đánh giá sáng tối
      return (r + g + b) / 3;
    };

    // Tìm màu tối nhất trong danh sách
    return colors.reduce((darkestColor, currentColor) => {
      return calculateBrightness(currentColor) <
        calculateBrightness(darkestColor)
        ? currentColor
        : darkestColor;
    }, colors[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/id/${productId}`);
        console.log(response.data);
        setProductDetail(response.data);
        if (response.data.productVariantsDto?.length > 0) {
          const firstSize = response.data.productVariantsDto[0].size;
          setSelectedSize(firstSize);

          const colorsForFirstSize = response.data.productVariantsDto
            .filter((variant) => variant.size === firstSize)
            .map((variant) => variant.colorId);

          // Chọn màu tối nhất từ danh sách màu sắc của size đầu tiên
          const darkestColorForFirstSize = findDarkestColor(colorsForFirstSize);
          setSelectedColors(colorsForFirstSize);
          setSelectedColor(darkestColorForFirstSize);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productId]);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`/evaluate/product/${productId}`);
        setEvaluateData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReview();
  }, [productId]);
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Lấy ảnh mới tương ứng với kích thước đã chọn
    const image = productVariantsDto.find(
      (variant) => variant.size === size
    )?.image;
    if (image) {
      // Cập nhật ảnh hiện tại
      setCurrentImage(image);
    }
    const variantsForSelectedSize = productVariantsDto.filter(
      (variant) => variant.size === size
    );

    const colorsForSelectedSize = Array.from(
      new Set(variantsForSelectedSize.map((variant) => variant.colorId))
    );

    // Chọn màu tối nhất từ danh sách màu sắc của size đó
    const darkestColorForSelectedSize = findDarkestColor(colorsForSelectedSize);

    const firstColorForSelectedSize =
      colorsForSelectedSize.length > 0 ? darkestColorForSelectedSize : null;

    setSelectedColors(colorsForSelectedSize);
    setSelectedColor(firstColorForSelectedSize || null);
  };

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 3); // Tăng số lượng đánh giá hiển thị
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // Lấy ảnh mới tương ứng với màu sắc đã chọn
    const image = productVariantsDto.find(
      (variant) => variant.colorId === color
    )?.imageProductDto?.image;
    if (image) {
      // Cập nhật ảnh hiện tại
      setCurrentImage(image);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = async () => {
    if (selectedVariant) {
      const cartItem = {
        productVariantId: selectedVariant.id,
        image: productDto.image,
        name: productDto.name,
        price: selectedVariant.price,
        quantity,
        color: selectedColor,
        size: selectedSize,
        discount: discount || 0,
      };
      dispatch(addToCart(cartItem));
    }
    navigate("/cart");
    toast.success("Add to cart successfully!", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <SiteLayout>
      <div className="flex justify-center gap-5">
        <div className="inline-flex items-start gap-5 p-6">
          <div className="flex flex-col gap-3">
            {productVariantsDto
              ?.filter((variant, index, self) =>
                index < 4
                  ? self.findIndex((v) => v.id === variant.id) === index
                  : false
              )
              .map((variant) => (
                <img
                  key={variant.id}
                  src={`data:image/png;base64,${variant.image}`}
                  alt="Image"
                  className="w-[146px] h-[130px] object-fill flex-shrink-0 rounded-md"
                />
              ))}
          </div>
          <img
            src={`data:image/png;base64,${currentImage || productDto?.image}`}
            alt=""
            className="w-[476px] h-[567px] object-fill hover:scale-105 hover:duration-500 flex-shrink-0 rounded-md"
          />
        </div>

        <div className="inline-flex flex-col items-start gap-8 p-6">
          <div className="flex flex-col items-start gap-7">
            <div className="flex flex-col items-start gap-3">
              <p className="text-3xl not-italic font-normal font-eculid">
                {productDto?.name}
              </p>
              <span className="text-2xl not-italic font-bold leading-normal font-eculid">
                ${selectedVariant?.price}
              </span>
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Size:
              </h5>
              <Size
                size={productVariantsDto || []}
                onSizeChange={handleSizeChange}
                selectedSize={selectedSize}
              />
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Color:
              </h5>
              <Color
                color={productVariantsDto || []}
                onColorChange={handleColorChange}
                selectedColor={selectedColor}
                availableColors={selectedColors} // Truyền danh sách màu sắc có sẵn
              />
            </div>
            <div className="inline-flex flex-col items-start gap-2">
              <h5 className="text-lg not-italic font-semibold font-eculid">
                Quantity:
              </h5>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center gap-2 p-2 h-9">
                  <button onClick={handleDecrease}>
                    <FaMinusCircle />
                  </button>
                  <span
                    type="number"
                    min="0"
                    value="1"
                    className="w-20 text-center"
                  >
                    {quantity}
                  </span>
                  <button onClick={handleIncrease}>
                    <FaPlusCircle />
                  </button>
                </div>
              </div>
              {selectedVariant && selectedVariant.quantity < 0 && <p>Hi</p>}
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            className={`w-full shadow-none 'bg-[#1F2937]'} text-[#FFF] hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100`}
          >
            Add to Cart
          </Button>
          <div className="flex flex-col items-start gap-14">
            <div className="flex gap-3 px-4 py-8 bg-[#F3F4F6] w-[560px]">
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-6">
                  <div className="flex items-center justify-center">
                    <FaShippingFast />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="font-medium">Free shipping</h5>
                    <p className="text-sm">
                      Free standard shipping on orders over 9,00€ Estimated to
                      be delivered on 28/02/2022 - 03/03/2022.
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-6">
                  <div className="flex items-center justify-center">
                    <MdSecurity />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="font-medium">Return Policy</h5>
                    <p className="text-sm">Learn More</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-10">
              <div className="flex items-center justify-center gap-[465px]">
                <p className="text-lg font-semibold font-eculid">Description</p>
                <button onClick={toggleOpen}>
                  <AiOutlinePlus />
                </button>
              </div>
              <div>
                <Collapse
                  open={open}
                  className="flex flex-col items-center justify-center"
                >
                  <Typography className="w-[480px]">
                    {productDto?.description || "It's perfect"}
                  </Typography>
                </Collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mx-40">
        <h3 className="text-2xl font-semibold font-eculid">Customer Reviews</h3>
        {evaluateData.slice(0, visibleReviews).map((item) => (
          <Comment key={item.id} items={item}></Comment>
        ))}
        {visibleReviews < evaluateData?.length && (
          <div className="flex items-center justify-center my-8">
            <Button
              className="text-base font-semibold w-60 bg-blue-gray-800 hover:scale-105"
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
        {evaluateData.length === 0 && (
          <div className="flex items-center justify-center my-8 text-xl font-medium font-eculid">
            No reviews have been submitted for the product yet.
          </div>
        )}
      </div>
    </SiteLayout>
  );
};

export default ProductDetailPage;
