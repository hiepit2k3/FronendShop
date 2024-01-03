import ProfileCard from "../../components/card/ProfileCard";
import Heading from "../../components/heading/Heading";
import hieu from "../../assets/images/hieu.jpg";
import thanh from "../../assets/images/thanh.jpg";
import manh from "../../assets/images/manh.jpg";
import phuong from "../../assets/images/phuong.jpg";
import hiep from "../../assets/images/hiep.jpg";

const profileData = [
  {
    id: 1,
    name: "Trần Hữu Hiếu",
    role: "Co-founder",
    img: hieu,
  },
  {
    id: 2,
    name: "Phạm Sông Hiệp",
    role: "Adminstator",
    img: hiep,
  },
  {
    id: 3,
    name: "Phạm Tiến Mạnh",
    role: "CEO/Founder",
    img: manh,
  },
  {
    id: 4,
    name: "Trần Lê Kiều Phương",
    role: "Adminstator",
    img: phuong,
  },
  {
    id: 5,
    name: "Lê Ngọc Thanh",
    role: "Co-Founder",
    img: thanh,
  },
];

const HomeProfile = () => {
  return (
    <>
      <Heading className="text-center">ABOUT US</Heading>
      <div className="flex items-center justify-center gap-5">
        {profileData.length > 0 &&
          profileData.map((item) => (
            <ProfileCard key={item.id} item={item}></ProfileCard>
          ))}
      </div>
    </>
  );
};

export default HomeProfile;
