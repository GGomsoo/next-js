"use client";

import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

const NewsPage = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState();

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch("http://localhost:8080/news");

      if (!res.ok) {
        setError("Failed to fetch news.");
        setIsLoading(false);
      };

      const news = await res.json();
      setIsLoading(false);
      setNews(news)
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  };

  if (error) {
    return <p>{error}</p>;
  };

  // 뉴스 존재여부 확인 후 제공
  let newsContent
  if (news) {
    newsContent = <NewsList news={news} />
  };

  return (
    <>
      <h1>News Page</h1>
      {newsContent}
    </>
  );
};

export default NewsPage;