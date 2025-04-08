"use client";

import { useFormState } from "react-dom";


const FormSubmit = () => {
  const state = useFormState();
  if (state.pending) {
    return <p>Creating Post...</p>
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;