import NewsList from "@/components/news-list";
import { getAvailableNewsYears, getNewsForYear } from "@/lib/news";
import Link from "next/link";

const FilteredNewsPage = ({ params }) => {
  const filter = params.filter;
  const links = getAvailableNewsYears();
  // const news = getNewsForYear(newsYear);
  return (
    // <NewsList news={news}/>
    <header id="archive-header">
      <nav>
        <ul>
          {links.map(link => 
          <li key={link}>
            <Link href={`/archive/${link}`}>{link}</Link>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default FilteredNewsPage;