import React from "react";
import { useLocation } from "react-router-dom";

const Header = ({ title }) => {
  const location = useLocation();

  return (
    <div>
      <h4 className="header">{title}</h4>
      {/* <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb> */}
    </div>
  );
};

export default Header;
