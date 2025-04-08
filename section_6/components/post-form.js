"use client";

import { useFormState } from "react-dom";
import FormSubmit from "./form-submit";

const PostForm = ({ action }) => {
  // useActionState
  // 서버 액션을 클라이언트에서 사용할 수 있도록 해주는 훅
  // 2개의 인자값을 가짐
  // 양식이 제출되거나 버튼이 눌렸을 때 호출되는 함수
  // 초기값
  const [state, formAction] = useFormState(action, {});

  return (
    <>
      <h1>Create a new post</h1>
      <form action={formAction}>
        <p className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Image URL</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            id="image"
            name="image"
          />
        </p>
        <p className="form-control">
          <label htmlFor="content">Content</label>
          <textarea id="content" name="content" rows="5" />
        </p>
        <p className="form-actions">
          <FormSubmit />
        </p>
        {state.errors && <ul className="form-errors">
          {state.errors.map((err) => (
            <li key={err}>
              {err}
            </li>
          ))}
        </ul>}
      </form>
    </>
  );
};

export default PostForm;