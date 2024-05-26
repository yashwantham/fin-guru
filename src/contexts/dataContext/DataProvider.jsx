import { createContext, useEffect, useState } from "react";

import { Constants } from "../../utils/Constants";
import { promptResponseData } from "../../db/promptResponseData";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { DEFAULT, SEARCHED } = Constants;

  const [contentState, setContentState] = useState(DEFAULT);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [searchedQueries, setSearchedQueries] = useState([
    "How Do I Save More Money?",
    "How Do I Improve My Credit Score?",
    "How Much Do I Need to Save for Retirement?",
    "Are Online Banks Safe?",
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
