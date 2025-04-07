import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";

const FilteredNewsPage = async ({ params }) => {
  const filter = params.filter;
  const selectedYear = filter?.[0]; // 선택한 년도를 가져오기
  const selectedMonth = filter?.[1]; // 선택한 월을 가져오기

  let news;
  let links = await getAvailableNewsYears();

  // 선택한 연도가 있다면 해당연도의 뉴스를 가져오기
  if (selectedYear && !selectedMonth) {
    news = await getNewsForYear(selectedYear);

    // 연도를 함수에 전달하면 월 식별자를 얻을 수 있음
    links = getAvailableNewsMonths(selectedYear);
  };

  // 선택한 연도와 월이 있다면 해당 연도와 월의 뉴스를 가져오기
  // 뉴스를 불러온후엔 links를 빈 배열로 설정하여 연/월 헤더를 보여주지 않음
  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = []
  };

  let newsContent = <p>No news found for the selected period.</p>

  // 뉴스가 있는 경우
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />;
  };

  // 선택한 연도는 있지만, 해당 연도에 뉴스가 없는 경우 에러를 출력
  // 선택한 날짜의 type이 숫자가 아니기에 숫자로 변환해줘야 함
  const availableYears = await getAvailableNewsYears();

  // 이제 데이터를 DB에서 가져오므로, 선택한 연도와 월을 숫자로 변환할 필요가 없음
  if (selectedYear && !availableYears.includes(selectedYear) ||
    selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth)
  ) {
    throw new Error("Invalid filter.");
  };

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {newsContent}
    </>
  );
};

export default FilteredNewsPage;