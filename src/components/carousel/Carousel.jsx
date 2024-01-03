import { Carousel, IconButton } from "@material-tailwind/react";
import axios from "../../config/axios";
import { useEffect, useState } from "react";

export function CarouselTransition() {
  const [discount, setDiscountData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/discount/is-active");
        setDiscountData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Carousel
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4 hidden"
        >
          null
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 hidden"
        >
          null
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute z-50 hidden gap-2 bottom-4 left-2/4 -translate-x-2/4">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
      transition={{ duration: 2 }}
      autoplay={true}
      autoplayDelay={5000}
      loop={true}
    >
      {discount &&
        discount.length > 0 &&
        discount.map((item) => (
          <img
            key={item.id}
            src={`data:image/png;base64,${item.image}`}
            alt="image 1"
            className="object-fill w-full h-[300px]"
          />
        ))}
    </Carousel>
  );
}
