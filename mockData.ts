export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", role: "Editor" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", role: "User" },
  { id: 5, name: "Edward Norton", email: "edward@example.com", role: "Admin" },
];

