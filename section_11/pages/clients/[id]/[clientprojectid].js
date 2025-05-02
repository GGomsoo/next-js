import { useRouter } from 'next/router';

const SelectClientProjectPage = () => {
  const router = useRouter();

  console.log(router.pathname); // /clients/[id]/[clientprojectid]
  console.log(router.query); // { id: 'some-id', clientprojectid: 'some-clientprojectid' }
  
  return (
    <div>
      <h1>The Project Page for a Specific Project for a Selected Client</h1>
    </div>
  );
}

export default SelectClientProjectPage;