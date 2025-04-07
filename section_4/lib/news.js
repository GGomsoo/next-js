import sql from "better-sqlite3";
import { DUMMY_NEWS } from '@/dummy-news';
import { resolve } from "styled-jsx/css";

// 루트 프로젝트 디렉토리에서 상대 경로를 사용하여 데이터베이스 파일을 지정합니다.
const db = sql("data.db")

export async function getAllNews() {
  // DB의 모든 데이터 불러오기
  const news = db.prepare("SELECT * FROM news").all();
  await new Promise(resolve => setTimeout(resolve, 2000));
  return news;
};

export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3);
}

export function getAvailableNewsYears() {
  return DUMMY_NEWS.reduce((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function getAvailableNewsMonths(year) {
  return DUMMY_NEWS.reduce((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year) {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year
  );
}

export function getNewsForYearAndMonth(year, month) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  });
}
