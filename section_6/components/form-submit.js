"use client";

import { useActionState } from "react";

const FormSubmit = () => {
  const state = useActionState();

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
};

export default FormSubmit;