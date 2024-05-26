import { createContext, useState } from "react";

import { Constants } from "../../utils/Constants";

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
  const [detailResponse, setDetailResponse] = useState();

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
        }}
      >
        {children}
      </DataContext.Provider>
    </>
  );
}
