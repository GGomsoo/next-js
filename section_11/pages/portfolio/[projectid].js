import { useRouter } from 'next/router';

const PortfolioProjectPage = () => {
  const router = useRouter();

  // 개발자 도구에서
  // 디렉토리 경로를 보여주는 것 같다
  console.log(router.pathname);

  // 동적 경로에 대한 값을 키, 값 쌍으로 보여주는 것 같다
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Project Page</h1>
    </div>
  );
};

export default PortfolioProjectPage;