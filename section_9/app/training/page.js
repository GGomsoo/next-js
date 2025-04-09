import { verifyAuth } from '@/lib/auth';
import { getTrainings } from '@/lib/training';
import { redirect } from 'next/navigation';

export default async function TrainingPage() {
  const result = await verifyAuth();

  // 로그인 하지않고 해당 페이지 접속시도시, 홈으로 리다이렉트
  if (!result.user) {
    return redirect("/");
  };

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul id="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <img src={`/trainings/${training.image}`} alt={training.title} />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
