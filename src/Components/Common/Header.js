import { Breadcrumb } from 'antd';
import React from 'react'
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom'

const Header = ({ title }) => {
  const location = useLocation();


  // const pathSnippets = location.pathname.split('/').filter((i) => i);
  // // console.log("location", pathSnippets);

  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{url}</Link>
  //     </Breadcrumb.Item>
  //   );
  // });

  return (
    <div>
      <h3 className='header'>{title}</h3>
      {/* <Breadcrumb>{extraBreadcrumbItems}</Breadcrumb> */}
    </div>

  )
}

export default Header