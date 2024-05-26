import { useContext } from "react";
import "./Components.css";
import { DataContext } from "../contexts/dataContext/DataProvider";
import { Constants } from "../utils/Constants";
function HistoryTab() {
  const { DEFAULT, DISPLAYRESPONSE } = Constants;
  const {
    contentState,
    setContentState,
    detailResponse,
    setDetailResponse,
    searchedQueries,
    setSearchedQueries,
    searchedTerm,
    setSearchedTerm,
  } = useContext(DataContext);

  function handleNewchat() {
    setContentState(() => DEFAULT);
    setSearchedTerm(() => "");
  }

  return (
    <>
      <div className="history-tab-container">
        <button className="new-chat-button" onClick={handleNewchat}>
          New Chat
        </button>
        <div className="recent-container">
          <p className="recent">Recent</p>
          <div className="searched-queries">
            {searchedQueries.map((item) => {
              return <div className="one-history-item">{item}</div>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryTab;
