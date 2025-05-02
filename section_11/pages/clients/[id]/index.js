import { useRouter } from 'next/router';

const ClientsProjectPage = () => {
  const router = useRouter();
  const clientName = router.query.id;
  console.log(router.query);
  return (
    <div>
      <h1>{clientName}'s Project Page</h1>
    </div>
  );
}

export default ClientsProjectPage;