import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const ShippingTabs = ["TABLA DE ENVÍOS", "INFO ADICIONAL", "PRODUCTOS", "ENVIOS", "RASTREO"];

const ShippingNavTab = ({ setCurrentNameTabInShippingTab }) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTabIndex(newValue);
    setCurrentNameTabInShippingTab(ShippingTabs[newValue]);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={currentTabIndex}
        onChange={handleTabChange}
        aria-label="Shipping Tabs"
        variant="fullWidth"
      >
        {ShippingTabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default ShippingNavTab;
