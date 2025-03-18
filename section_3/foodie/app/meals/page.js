import Link from "next/link";
import classes from "./page.module.css"
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

const Meals = async () => {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />
}

const MealsPage = () => {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, create{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            Share Your Favorite Recipe
          </Link>
        </p>
      </header>
      <main className={classes.main}>
        {/* Suspence: 데이터 불러올 때 까지 로딩 상태 처리하고 대체 컨텐츠를 표시할 수 있도록 도와줌*/}
        <Suspense fallback={<p className={classes.loading}>fetching meals...</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsPage;