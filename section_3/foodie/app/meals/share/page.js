"use client";

import ImagePicker from "@/components/meals/image-picker";
import classes from "./page.module.css"
import { shareMeal } from "@/lib/action";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
// import { useActionState } from "react";
import { useFormState } from "react-dom";

const ShareMealPage = () => {
  // useActionState 훅: 2개의 인자 필요
  // form이 제출될 때 동작하는 실제 server action
  // 컴포넌트의 초기상태 -> 액션이 실행되기 전 초기값
  // const [state, formAction] = useActionState(shareMeal, {message: null});
  // 다음과 같은 에러 발견으로 useFormState 임시 사용
  // Error: (0 , react__WEBPACK_IMPORTED_MODULE_4__.useActionState) is not a function or its return value is not iterable
  const [state, formAction] = useFormState(shareMeal, {message: null});
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your Image" name="image" />
          {state.message && <p>{state.message}</p>}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
};

export default ShareMealPage;