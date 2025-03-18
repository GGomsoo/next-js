import Image from "next/image";
import clasess from "./page.module.css"
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";

const MealDetailsPage = ({ params }) => {
  const meal = getMeal(params.mealSlug);

  // 원하는 음식을 못 찾았을 경우 ( not found )
  // 제일 가까운 not-found 페이지를 보여준다.
  if (!meal) {
    notFound()
  }

  // 특수문자로 식별되는 줄바꿈을 <br /> 로 변환
  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={clasess.header}>
        <div className={clasess.image}>
          <Image src={meal.image} alt={meal.title} fill/>
        </div>
        <div className={clasess.headerText}>
          <h1>{meal.title}</h1>
          <p className={clasess.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={clasess.summary}>
            {meal.summary}
          </p>
        </div>
      </header>
      <main>
        {/* 설명서를 아웃풋 시키고싶다. => html 코드로 출력되어야 한다 */}
        {/* dangerouslySetInnerHTML 프로퍼티 사용. 출력시키면 XSS 공격에 노출되기 쉽다. */}
        <p className={clasess.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions,
        }}></p>
      </main>
    </>
  );
};

export default MealDetailsPage;