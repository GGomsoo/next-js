import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "jonghyuk", name: "Jong Hyuk" },
    { id: "menu", name: "Menu" },
  ];

  return (
    <div>
      <h1>Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;