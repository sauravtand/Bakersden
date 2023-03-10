import React from "react";

const Header = ({ title }) => {
  return (
    <div>
      <h4 className="header">{title}</h4>
      {/* <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb> */}
    </div>
  );
};

export default Header;
