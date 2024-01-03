import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <>
      <Card className="w-full h-auto max-w-xs">
        <div className="flex items-center justify-center">
          <Link to="/admin">
            <img src={logo} alt="" className="h-28 w-28" />
          </Link>
        </div>
        <div className="overflow-auto scrollbar scrollbar-thin scrollbar-thumb-blue-gray-100 max-h-[calc(100vh-72px)]">
          <List className="px-5">
            <Link to="/admin">
              <ListItem>
                <ListItemPrefix>
                  <PresentationChartBarIcon className="w-5 h-5" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
            <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="p-3 border-b-0"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <Link to="/admin/order">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Orders
                    </ListItem>
                  </Link>
                  <Link to="/admin/product">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Products
                    </ListItem>
                  </Link>
                  <Link to="/admin/category">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Category
                    </ListItem>
                  </Link>
                  <Link to="/admin/brand">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Brand
                    </ListItem>
                  </Link>
                  <Link to="/admin/account">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Account
                    </ListItem>
                  </Link>
                  <Link to="/admin/payment">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Payment
                    </ListItem>
                  </Link>
                  <Link to="/admin/problem">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Problem
                    </ListItem>
                  </Link>
                  <Link to="/admin/voucher">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Voucher
                    </ListItem>
                  </Link>
                  <Link to="/admin/hashtag">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Hashtag
                    </ListItem>
                  </Link>
                  <Link to="/admin/discount">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Discount
                    </ListItem>
                  </Link>
                  <Link to="/admin/evaluate">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Evaluate
                    </ListItem>
                  </Link>
                  <Link to="/admin/color">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Color
                    </ListItem>
                  </Link>
                  <Link to="/admin/feedback">
                    <ListItem>
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="w-5 h-3" />
                      </ListItemPrefix>
                      Feedback
                    </ListItem>
                  </Link>
                </List>
              </AccordionBody>
            </Accordion>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="w-5 h-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <Link to="/admin/profile">
              <ListItem>
                <ListItemPrefix>
                  <UserCircleIcon className="w-5 h-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="w-5 h-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </List>
        </div>
      </Card>
    </>
  );
};

export default SideBar;
