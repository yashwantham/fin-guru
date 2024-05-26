import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import "./Home.css";
import { DataContext } from "../../contexts/dataContext/DataProvider";
import { Constants } from "../../utils/Constants";
function Home() {
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
    selectedResponse,
    setSelectedResponse,
  } = useContext(DataContext);

  //   const [searchedTerm, setSearchedTerm] = useState("");

  function handleSearch() {
    if (searchedTerm.trim().length === 0) {
      alert("Please enter your query.");
      return;
    }

    setContentState(() => DISPLAYRESPONSE);
    setSearchedQueries((searchedQueries) => {
      let newList = [...searchedQueries, searchedTerm];
      newList = newList.filter((item, ind) => newList.indexOf(item) === ind);
      return [...newList];
    });
    const searchResult = detailResponse.find(
      ({ Prompt, Response }) => searchedTerm === Prompt
    );
    console.log("searchResult", searchResult);
    setSelectedResponse(() => searchResult);
  }

  return (
    <>
      <div className="home-page-container">
        <div className="app-heading">
          <h1 className="app-h1">FinGuru</h1>
        </div>
        {contentState === DEFAULT && (
          <div className="welcome-message-container">
            <div className="greetings">Namaste!</div>
            <div className="hchy">Ask me Finance...</div>
          </div>
        )}
        {contentState === DISPLAYRESPONSE && (
          <div className="content-container">
            <p>{selectedResponse?.Response}</p>
          </div>
        )}
        <div className="input-send-container">
          <div className="input-container">
            <input
              type="text"
              className="input-box"
              placeholder="Search your query here"
              onChange={(e) => setSearchedTerm(e.target.value)}
              value={searchedTerm}
            />
          </div>
          <div
            className="send-container"
            onClick={handleSearch}
            style={
              searchedTerm.trim().length === 0
                ? { color: "#9f9fa1", cursor: "auto" }
                : { color: "#000000", cursor: "pointer" }
            }
          >
            <FontAwesomeIcon icon={faPaperPlane} />
            {/* <FontAwesomeIcon icon={faCircleArrowUp} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
