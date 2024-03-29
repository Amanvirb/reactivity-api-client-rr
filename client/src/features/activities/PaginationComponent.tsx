import { Box, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import useAxios from "../../app/hooks/useAxios";
import useEventListner from "../../app/hooks/useEventListner";
import useUtilities from "../../app/hooks/useUtilities";

const PaginationComponent = () => {
  const { activityList } = useAxios();
  const { appFontSize } = useUtilities();
  const { onPageChangeHandler } = useEventListner();

  const [currentPageNumber, setCurrentPageNumber] = useState(
    activityList.pagination.currentPage
  );
  function handlePageChange(page: number) {
    setCurrentPageNumber(page);
    onPageChangeHandler(page);
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        p: 2,
      }}
    >
      <Typography fontSize={appFontSize}>
        Displaying{" "}
        {(activityList.pagination.currentPage - 1) *
          activityList.pagination.itemsPerPage +
          1}
        -
        {activityList.pagination.currentPage *
          activityList.pagination.itemsPerPage &&
          activityList.pagination.currentPage *
            activityList.pagination.itemsPerPage}{" "}
        of {activityList.pagination.totalItems} items
      </Typography>
      <Pagination
        color="secondary"
        count={activityList.pagination.totalPages} //total Page
        page={currentPageNumber} //current Page Number
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
};

export default PaginationComponent;
