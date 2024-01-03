import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import axios from "../../config/axios.js";
import FormProductVariant from "./FormProductVariant.jsx";
import Button from "../../components/button/Button.jsx";
import { useForm } from "react-hook-form";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { selectCurrentToken } from "../../redux/features/authSlice.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ProductAddPage = () => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([]);
  const { reset: resetProductForm } = useForm();
  const [categories, setCategories] = useState([]);
  const [fileDatas, setFileDatas] = useState([]);
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);

  const [productDtoRequest, setProductDtoRequest] = useState({
    productDto: {}, // Assuming fixed form data structure
    hashtagOfProductsDto: [],
    productVariantsDto: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingData(true)
        const response = await axios.get("/category");
        setCategories(response.data);
        setLoadingData(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  // 
  const handleProductFormSubmit = async (data) => {
    try {
      // Thực hiện các bước xử lý dữ liệu ở đây
      // console.log("Handling product form data:", data);

      setFileDatas((prevFileDatas) => {
        const newFileDatas = [...prevFileDatas];
        const imageFile = data.image;

        // Đặt ảnh mới với ID là 0
        imageFile.id = 0;

        const existingIndex = newFileDatas.findIndex((item) => item.id === imageFile.id);

        if (existingIndex !== -1) {
          // Nếu đã tồn tại, thay thế nó
          newFileDatas[existingIndex] = imageFile;
        } else {
          // Nếu không, thêm mới
          newFileDatas.unshift(imageFile);
        }
        return newFileDatas;
      });

      // Lưu trữ phần còn lại của dữ liệu vào productDto trong productDtoRequest
      setProductDtoRequest((prevData) => ({
        ...prevData,
        productDto: {
          name: data.name,
          season: data.season,
          gender: data.gender,
          categoryId: data.categoryId,
          brandId: data.brandId,
          description: data.description,
          // Thêm các trường khác nếu cần
        },
        hashtagOfProductsDto: data.hashtags,
      }));
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error handling product form:", error);
    }
  };

  const handleDynamicFormSubmit = async (data, index) => {
    setProductDtoRequest((prevProductDtoRequest) => {
      const existingIndex = prevProductDtoRequest.productVariantsDto.findIndex((variant) => variant.id === index);
      const isDuplicate = prevProductDtoRequest.productVariantsDto.some((variant) => (
        variant.colorId === data['colorId-' + index] && variant.size === data['size-' + index]
      ));
      const productvariant = fields.find((item) => item.id === index);
      const index2 = fields.indexOf(productvariant);
      if (existingIndex !== -1) {
        // Nếu tồn tại, cập nhật dữ liệu
        const updatedVariants = [...prevProductDtoRequest.productVariantsDto];
        updatedVariants[existingIndex] = {
          ...updatedVariants[existingIndex],
          colorId: data['colorId-' + index],
          size: data['size-' + index],
          quantity: data['quantity-' + index],
          price: data['price-' + index],
        };

        return {
          ...prevProductDtoRequest,
          productVariantsDto: updatedVariants,
        };
      } else {
        // Kiểm tra xem có trùng lặp không
        if (isDuplicate) {
          toast.warning(`Sizes and colors already exist ! Please fix the form ${index2 + 1}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          // Trả về state hiện tại nếu có trùng lặp
          return prevProductDtoRequest;
        }
      }
      // Nếu không tồn tại và không trùng lặp, thêm mới
      return {
        ...prevProductDtoRequest,
        productVariantsDto: [
          ...prevProductDtoRequest.productVariantsDto,
          {
            id: index,
            colorId: data['colorId-' + index],
            size: data['size-' + index],
            quantity: data['quantity-' + index],
            price: data['price-' + index],
          },
        ],
      };
    });

    // Thêm file vào mảng fileDatas
    setFileDatas((prevFileDatas) => {
      const newFileDatas = [...prevFileDatas];
      const imageFile = data['image-' + [index]];

      // Đặt ID cho ảnh mới là index
      imageFile.id = index;
      // Kiểm tra xem có phần tử nào có cùng ID không
      const existingIndex = newFileDatas.findIndex((item) => item.id === imageFile.id);

      if (existingIndex !== -1) {
        // Nếu đã tồn tại, thay thế nó
        newFileDatas[existingIndex] = imageFile;
      } else {
        // Nếu không, thêm mới
        newFileDatas.push(imageFile);
      }
      return newFileDatas;
    });
  };


  const handleAddField = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100;
    const newFields = [...fields, { id: randomNumber }];
    setFields(newFields);

  };

  const handleRemoveField = (index) => {
    const newFiles = fileDatas.filter((file) => file.id !== index);
    const newFields = [...fields];

    // Xóa đối tượng từ productVariantsDto theo Id
    const newVariants = productDtoRequest.productVariantsDto.filter((variant) => variant.id !== index);
    setProductDtoRequest({
      ...productDtoRequest,
      productVariantsDto: newVariants,
    });

    // Tìm vị trí của phần tử cần xóa trong newFields dựa trên id
    const fieldIndex = newFields.findIndex((field) => field.id === index);

    if (fieldIndex !== -1) {
      // Xóa phần tử tại vị trí fieldIndex
      newFields.splice(fieldIndex, 1);

      // Cập nhật state với newFields mới
      setFields([...newFields]);
    }
    setFileDatas(newFiles);
    setFields(newFields);
    toast.success("Delete ProductVariant successfully!", {
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
  const postData = async () => {
    const formData = new FormData();
    formData.append('productDtoRequest', JSON.stringify(productDtoRequest));
    fileDatas.forEach((fileData) => {
      formData.append('files', fileData);
    });

    try {
      setLoading(true);
      const response = await axios.post("/product/create", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Create product successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/admin/product");
        setFields([]);
        setFileDatas([]);
        setProductDtoRequest({
          productDto: {}, // Assuming fixed form data structure
          hashtagOfProductsDto: [],
          productVariantsDto: [],
        });
      }
      setLoading(false);
    } catch (response) {
      setLoading(false);
      console.log(response);
      toast.error("Create new product fail!", {
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
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2">
        {/* form product  */}
        <ProductForm
          category={categories}
          onSubmitCallback={handleProductFormSubmit}
          onResetForm={resetProductForm}
        />

        <div className="float-none w-full">
          <div className="grid grid-cols-2 scrollbar scrollbar-thin border-spacing-y-1.5 mb-3 gap-3 w-full shadow-md rounded shadow-blue-gray-100 h-[350px] overflow-y-auto">
            {fields.map((field) => (
              <div className="p-1 shadow shadow-blue-gray-400" key={field.id}>
                <div className="grid items-end justify-end"><Button className="w-[70px] text-2xl justify-end" outline="text" onClick={() => handleRemoveField(field.id)}>
                  <AiTwotoneDelete />
                </Button></div>

                <FormProductVariant
                  index={field.id}
                  onSubmitCallback={handleDynamicFormSubmit}
                />
              </div>
            ))}

          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="flex items-center justify-start">
              <Button
                className="text-sm"
                outline="outlined"
                onClick={handleAddField}
              >
                Add new product variant
              </Button>
            </div>
            <div className="flex justify-end">
              <Button className="text-sm" onClick={postData}>
                {loading ? (
                  <ClipLoader
                    color="#fff"
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Add New Product"
                )}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductAddPage;