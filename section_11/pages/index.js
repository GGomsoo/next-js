import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          {/* replace 프로퍼티를 설정하면 
          새로운 페이지를 또 띄우지 않고 현재 페이지를 새 페이지로 설정 가능 */}
          <Link href="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link href="/clients">Clients</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;