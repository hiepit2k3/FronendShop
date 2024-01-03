import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";

const ProfileCard = ({ item }) => {
  const { name, role, img } = item;
  return (
    <Card className="h-full w-72">
      <CardHeader floated={false} className="h-80">
        <img src={img} alt="" className="object-cover w-full h-full" />
      </CardHeader>
      <CardBody className="p-3 mt-2 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-0">
          {name}
        </Typography>
        <Typography color="blue-gray" className="font-medium">
          {role}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-10 pt-0">
        <Tooltip content="Like">
          <Typography as="a" href="#facebook" variant="lead" color="blue">
            <FontAwesomeIcon icon={faFacebook} size="1x" color="blue" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#tiktok" variant="lead" color="light-blue">
            <FontAwesomeIcon icon={faTiktok} size="1x" color="black" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography as="a" href="#instagram" variant="lead" color="purple">
            <FontAwesomeIcon icon={faInstagram} size="1x" color="purple" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  item: PropTypes.object,
  img: PropTypes.string,
};

export default ProfileCard;
