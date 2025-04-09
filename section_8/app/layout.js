import Header from '@/components/header';
import './globals.css';

// 자체 메타데이터를 사용하지 않는 모든 페이지에 해당 메타데이터가 적용된다
// 다른 페이지에 이미 메타데이터가 구성되어 있지만, 덮어씌우고 싶을 때 레이아웃 메타데이터를 사용한다
export const metadata = {
  title: 'NextPosts',
  description: 'Browse and share amazing posts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
