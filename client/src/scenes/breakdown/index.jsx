import React from 'react'
import { Box } from '@mui/system'
import Header from 'components/Header'
import BreakdownChart from "components/BreakdownChart";

const Breakfdown = () => {
  return (
    <Box m="1.5rem 2.5rem"> 
      <Header title="BREAKDOWN" subTitle="Breakdown of Sales by Category"/>
      <Box mt="40px" height="75vh">
        <BreakdownChart/>
      </Box>
    </Box> 
  )
}

export default Breakfdown
