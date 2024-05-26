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
    if (searchResult !== undefined) {
      console.log("searchResult", searchResult);
      setSelectedResponse(() => searchResult);
    } else {
      setSelectedResponse(() => ({
        Prompt: "How Do I Save More Money?",
        Response:
          "A budget can help you save money, but many people won't use one if it feels difficult, dull or restrictive. Here's how to\nmake budgeting and saving easy and empowering.\nFirst, play detective by tracking your income and expenses for 30 days—an app can save time here. Next, use the\nresults to set up a budget that fits your goals and your daily routine. For example, if your month of tracking reveals\nyou're spending more than you want on dining out, set a monthly ceiling. Then, before you order takeout, check your\nspending so you stay on budget. You don't have to completely revamp your spending in one month. Use your tracking data to identify changes that feel\neasy, and implement them one at a time. This way, you'll boost your savings balance without feeling overwhelmed or\ndeprived. Adding a \"cheat day\" category to your budget can also give you a little wiggle room for expenses during\nthose extra-hard day.Accelerate your progress by bucketing—automatically depositing money in separate accounts, each designated\nfor a key goal. You'll save time and stay on track because once you've set up the automatic deposit, you don't have to\ndo a thing.",
      }));
    }
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
