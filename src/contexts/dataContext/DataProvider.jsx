import { createContext, useEffect, useState } from "react";

import { Constants } from "../../utils/Constants";
import { promptResponseData } from "../../db/promptResponseData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { DEFAULT, SEARCHED } = Constants;

  const [contentState, setContentState] = useState(DEFAULT);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchedQueries, setSearchedQueries] = useState([
    "What is Mutual Fund?",
    "Difference between savings and current account",
    "What is SIP?",
  ]);
  const [detailResponse, setDetailResponse] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState([]);

  function getDetailResponse() {
    // const resp = JSON.parse(promptResponseData);
    const resp = promptResponseData;
    setDetailResponse(() => resp);
  }

  useEffect(() => {
    getDetailResponse();
  }, []);

  return (
    <>
      <DataContext.Provider
        value={{
          contentState,
          setContentState,
          detailResponse,
          setDetailResponse,
          searchedQueries,
          setSearchedQueries,
          searchedTerm,
          setSearchedTerm,
          selectedResponse,
          setSelectedResponse,
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
}
