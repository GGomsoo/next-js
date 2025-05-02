import { useRouter } from 'next/router';

const ClientsProjectPage = () => {
  const router = useRouter();
  const clientName = router.query.id;
  console.log(router.query);

  const handleLoadProject = () => {
    router.push({
      pathname: "/clients/[id]/[clientprojectid]",
      query: { id: "jonghyuk", clientprojectid: "1" },
    });
  };

  return (
    <div>
      <h1>{clientName}'s Project Page</h1>
      <button onClick={handleLoadProject}>Load Project A</button>
    </div>
  );
}

export default ClientsProjectPage;