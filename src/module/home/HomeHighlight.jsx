import Heading from "../../components/heading/Heading";

const HomeHighlight = () => {
  return (
    <>
      <Heading className="mb-5 text-center">This Weeks Highlights</Heading>
      <div className="grid grid-cols-3 text-[#FAFAFA] gap-4 mx-24">
        <div className="text-center bg-image-grid-one h-[506px] object-cover">
          <h3 className="mx-12 text-[56px] font-semibold text-center my-44 font-eculid">
            Exclusive Shoes
          </h3>
        </div>
        <div className="col-span-2 bg-image-grid-two h-[506px] object-cover">
          <h3 className="mx-28 text-[56px] text-center font-semibold my-44 font-eculid">
            Exquisite Styles & Collections
          </h3>
        </div>
        <div className="col-span-2 text-center bg-image-grid-three h-[506px] object-cover">
          <h3 className="mx-56 text-[56px] text-center font-semibold my-48 font-eculid">
            New Arrivals
          </h3>
        </div>
        <div className="text-center bg-image-grid-four h-[506px] object-cover">
          <h3 className="mx-14 text-[56px] text-center font-semibold my-40 font-eculid">
            Exclusive Items
          </h3>
        </div>
      </div>
    </>
  );
};

export default HomeHighlight;
