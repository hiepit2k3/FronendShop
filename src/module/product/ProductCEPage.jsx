import { useEffect, useState } from "react";
import ProductForm from "./update/ProductForm";
import axios from "../../config/axios.js";
import FormProductVariant from "./update/FormProductVariant";
import Button from "../../components/button/Button.jsx";
import { FcPlus } from "react-icons/fc";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ProductCEPage = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({});
  const [hashtags, setHashtags] = useState([]);
  const [productVariantData, setProductVariantsData] = useState([]);
  const [selectedSizesByColor, setSelectedSizesByColor] = useState([]);
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  const [dataProductAll, setDataProductAll] = useState({
    productDto: {},
    hashtagOfProducts: {},
  });

  const [dataProductVariantAll, setDataProductVariantAll] = useState({
    PVRequest: [],
  }); 
  //!Đổ dữ liệu thông qua id lấy trên url
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`product/id/${id}`);
        setIsUpdate(true);
        console.log(response.data);
        setHashtags(response.data.hashtagDtos);
        setCategories(response.data.categoryDto);
        setProductVariantsData(response.data.productVariantsDto);
        setProductData(response.data.productDto);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  //Tách ra để lưu ảnh của mainImage
  const [fileImageDatas, setFileImageDatas] = useState([]);
  const [fileImageDatasVar, setFileImageDatasVar] = useState([]);
  //*Thêm variant mới khi click vào nút add +
  const handleAddDiv = () => {
    setProductVariantsData((prevData) => {
      const newData = [...prevData, createEmptyVariant()];
      return newData;
    });
  };

  const handleRemoveDiv = (index) => {
    // Xóa productVariant tại vị trí index
    const updatedVariants = [...productVariantData];
    updatedVariants.splice(index, 1);
    setProductVariantsData(updatedVariants);

    // Xóa tương ứng trong dataProductAll.PVRequest
    setDataProductVariantAll((prevData) => {
      const updatedPVRequest = [...prevData.PVRequest];
      updatedPVRequest.splice(index, 1);
      return {
        ...prevData,
        PVRequest: updatedPVRequest,
      };
    });
    toast.success("delete product variant successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDynamicFormSubmit = async (data) => {
    try {
      const selectedColorSize = selectedSizesByColor.find(
        (item) => item.colorId === data.colorId && item.size === data.size
      );
      if (selectedColorSize) {
        toast.warning("This color and size combination is already selected!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setFileImageDatasVar((prevFileDatas) => {
          const newFileDatas = [...prevFileDatas];
          const imageFile = data.image;
          newFileDatas.push(imageFile);
          test(data);
          // Thêm màu và size mới vào mảng selectedSizesByColor
          setSelectedSizesByColor((prevSelectedSizes) => [
            ...prevSelectedSizes,
            { colorId: data.colorId, size: data.size },
          ]);
          return newFileDatas;
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function test(data) {
    setDataProductVariantAll((prevData) => ({
      // ...prevData, //FIXME: Nếu lỗi xem lại chỗ này
      PVRequest: [
        ...prevData.PVRequest,
        {
          data: {
            id: data.id,
            colorId: data.colorId,
            size: data.size,
            quantity: data.quantity,
            price: data.price,
            image: "",
            productId: data.productId,
          },
          imageFile: data.image,
        },
      ],
    }));
  }
  const handleProductFormSubmit = async (data) => {
    try {
      setFileImageDatas((prevFileDatas) => {
        const newFileDatas = [...prevFileDatas];
        const imageFile = data.image;
        newFileDatas.unshift(imageFile);
        callSetDataProductAndProductVariant(data, imageFile);
        return newFileDatas;
      });
    } catch (error) {
      console.error("Error handling product form:", error);
    }
  };
  function callSetDataProductAndProductVariant(data, imageFile) {
    setDataProductAll((prevData) => ({
      ...prevData,
      productDto: {
        id: id,
        name: data.name,
        season: data.season,
        gender: data.gender,
        categoryId: data.categoryId,
        brandId: data.brandId,
        description: data.description,
        image: productData ? productData.image : "", // Kiểm tra trước khi sử dụng,
      },
      hashtagOfProducts: data.hashtags,
      mainImage: imageFile,
    }));
  }

  const createEmptyVariant = () => ({
    index: productVariantData.length + 1,
    image: "http://product-variant/nothing.png",
    colorId: "#333",
    size: "S",
    quantity: 1,
    price: 1,
    productId: Number.parseInt(id),
    // Thêm các trường khác nếu cần
  });

  const updateData = async () => {
    try {
      const formData = new FormData();
      dataProductVariantAll.PVRequest.forEach((data, index) => {
        formData.append(`pvRequests[${index}].data`, JSON.stringify(data.data));
        if (data.imageFile && data.imageFile instanceof File) {
          formData.append(`pvRequests[${index}].imageFile`, data.imageFile);
        }
        //FIXME: cái ni không thẻ bỏ nỉ
        // const imageFile = fileImageDatasVar[index];
        // if (imageFile && imageFile instanceof File) {
        //   formData.append(`pvRequests[${index}].imageFile`, imageFile);
        // }
      });
      formData.append("productDto", JSON.stringify(dataProductAll.productDto));
      fileImageDatas.forEach((fileData) => {
        formData.append("mainImage", fileData);
      });
      formData.append(
        "hashtagOfProducts",
        JSON.stringify(dataProductAll.hashtagOfProducts)
      );
      setLoading(true);
      await axios.put(`product/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("update product and product variant successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false);
      navigate("/admin/product");
    } catch (error) {
      console.error("Error:", error);
      toast.error("update product and product variant fail!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <ProductForm
          hashtags={hashtags}
          category={categories}
          onSubmitCallback={handleProductFormSubmit}
          initialData={productData}
          isUpdate={isUpdate}
        />

        <div className="float-none w-full">
          <div className="grid grid-cols-2 scrollbar scrollbar-thin border-spacing-y-1.5 mb-3 gap-3 w-full h-[350px] overflow-y-auto">
            {productVariantData &&
              productVariantData.map((variant, index) => (
                <div
                  className="border border-gray-400 rounded-lg"
                  key={`${variant.id}-${index}`}
                >
                  <div className="grid items-end justify-end">
                    <Button
                      className="w-[70px] text-2xl justify-end"
                      outline="outlined"
                      onClick={() => handleRemoveDiv(index)}
                    >
                      <AiTwotoneDelete />
                    </Button>
                  </div>
                  <FormProductVariant
                    index={variant.id}
                    onSubmitCallback={handleDynamicFormSubmit}
                    initialData={variant}
                    isUpdate={isUpdate}
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="flex items-center justify-start">
              <Button
                className="text-sm"
                outline="outlined"
                onClick={handleAddDiv}
              >
                Add new product variant
              </Button>
            </div>
            <div className="flex justify-end">
              <Button className="text-sm" onClick={updateData}>
                {loading ? (
                  <ClipLoader
                    color="#fff"
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCEPage;
