"use client";

// 오류는 서버 작동중인 경우 말고도
// 클라이언트에서도 발생할 수 있다.
// 오류 폴백은 양쪽에서 작동해야 하기 때문에 use client를 사용
const FilterError = ({ error }) => {
  return (
    <div id="error">
      <h2>An error occurered!</h2>
      <p>{error.message}</p>
    </div>
  );
};

export default FilterError;