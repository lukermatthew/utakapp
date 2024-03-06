import React from "react";

const Breadcrumbs = () => {
  return (
    <div className="flex justify-start text-sm breadcrumbs px-5 py-2 mt-2">
      <ul className="flex items-center space-x-2">
        <li>
          <a className="text-blue-500 hover:text-blue-700">Products</a>
        </li>
        {/* <li>
            <a className="text-blue-500 hover:text-blue-700">List</a>
          </li> */}
        <li>List</li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
