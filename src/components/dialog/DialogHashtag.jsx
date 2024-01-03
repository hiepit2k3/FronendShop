import {
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import axios from "../../config/axios";

const DialogHashtag = ({
  show,
  onUseDialogHashtag,
  handleCloseDialogHashtag,
  onSelectHashtag,
  selectedHashtag,
}) => {
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [hashtagData, setHashtagData] = useState([]);

  const handleHashtagClick = (hashtag) => {
    onSelectHashtag(hashtag);

    // Lọc ra hashtag đã nhấp
    const updatedHashtags = selectedHashtags.filter((item) => item.id !== hashtag.id);

    // Gọi hàm để thông báo việc sử dụng hashtag
    onUseDialogHashtag(hashtag);

    // Cập nhật state với danh sách đã lọc
    setSelectedHashtags(updatedHashtags);
  };

  useEffect(() => {
    // Call API để lấy danh sách hashtag khi Dialog mở
    const fetchData = async () => {
      try {
        const response = await axios.get("/hashtag");
        setHashtagData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Kiểm tra xem Dialog có đang được hiển thị không
    if (show) {
      fetchData(); // Gọi hàm fetchData khi Dialog được mở
    }
  }, [show]);

  // Lắng nghe sự thay đổi của selectedHashtag từ component cha
  useEffect(() => {
    setSelectedHashtags(selectedHashtag);
  }, [selectedHashtag]);

  return (
    <>
      <Dialog open={show}>
        <DialogHeader className="flex justify-between">
          <span>Choose your hashtag</span>
          <span className="cursor-pointer" onClick={handleCloseDialogHashtag}>
            <IoMdClose />
          </span>
        </DialogHeader>
        <DialogBody className="mb-5">
          <div>
            {hashtagData
              .filter((dbHashtag) => !selectedHashtags.find((selected) => selected.id === dbHashtag.id))
              .map((item) => (
                <Button
                  className="w-auto rounded-full"
                  onClick={() => handleHashtagClick(item)}
                  outline="outlined"
                  key={item.id}
                >
                  {item.name}
                </Button>
              ))}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

DialogHashtag.propTypes = {
  show: PropTypes.bool,
  handleCloseDialogHashtag: PropTypes.func,
  onUseDialogHashtag: PropTypes.func,
  onSelectHashtag: PropTypes.func,
  selectedHashtag: PropTypes.array,
};

export default DialogHashtag;
