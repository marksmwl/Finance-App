import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RecentTransactions from "./RecentTransactions";
import Budget from "./Budget";
import Categories from "./Categories";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="max-w-5xl m-auto bg-white rounded-3xl shadow-md">
      <Box
        className="border-b flex justify-center bg-slate-300"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Categories" {...a11yProps(0)} />
          <Tab label="Transactions" {...a11yProps(1)} />
          {/* <Tab label="Budgeting" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Categories
          setTransactions={props.updateTransactions}
          categories={props.categories}
          updateCategories={props.updateCategories}
        ></Categories>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <RecentTransactions
          transactions={props.transactions}
          setTransactions={props.updateTransactions}
          categories={props.categories}
          updateCategories={props.updateCategories}
        ></RecentTransactions>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        <Budget
          categories={props.categories}
          updateCategories={props.updateCategories}
          totalBudget={props.totalBudget}
          setTotalBudget={props.setTotalBudget}
          savings={props.savings}
          setSavings={props.setSavings}
        ></Budget>
      </CustomTabPanel> */}
    </Box>
  );
}
