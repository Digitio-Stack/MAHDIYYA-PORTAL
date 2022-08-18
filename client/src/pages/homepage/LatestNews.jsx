import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Axios from "../../Axios";

function LatestNews() {
  const [newses, setNewses] = useState([]);
  const getAllNews = async () => {
    try {
      let { data } = await Axios.get("/news");
      setNewses(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);
  return (
    <div className="container scroll">
      {newses.map((item) => (
        <div className="news-box">
          <div className="blog-post">
            <a>
              <img src={item.image} alt={item.newsName} />
            </a>
            <div className="post-content">
              <a className="category">{item.category.categoryName}</a>
              <h2>
                <a>{item.newsName}</a>
              </h2>
              <div className="post-meta date">
                <FontAwesomeIcon icon={faClock}/> {moment(item.newsDate).format('DD-MM-YYYY')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LatestNews;