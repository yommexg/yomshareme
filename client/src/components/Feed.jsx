import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import Pins from "../container/Pins";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const querySearch = searchQuery(categoryId);
      client.fetch(querySearch).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      const queryFeed = feedQuery();
      client.fetch(queryFeed).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="Adding New ideas to your feed!" />;
  }
  if (!pins?.length) return <h2>No Pins Avaliable</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};
export default Feed;
