import NewsList from "@/components/news-list";

const NewsPage = async () => {
  const res = await fetch("http://localhost:8080/news");

  if (!res.ok) {
    throw new Error("Failed to fetch news");
  };

  const news = await res.json();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
};

export default NewsPage;