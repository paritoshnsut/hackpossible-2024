import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Component1, Component3 } from '../components';
import Sidebar from '../components/Sidebar';
import WarehouseComponent from '../components/WarehouseComponent';

const Page1 = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(0);

  const handleItemClick = (index: number) => {
    setItem(index);
  };

  const handleRowClick = (id: any) => {
    navigate(`/details/${id}`);
  };

  const getComponent = () => {
    if (item === 0) return <Component1 />;
    if (item === 1) return <Component3 handleRowClick={handleRowClick} />;
    if (item === 2) return <WarehouseComponent />;
    return null;
  };

  return <Sidebar handleItemClick={handleItemClick}>{getComponent()}</Sidebar>;
};

export default Page1;
