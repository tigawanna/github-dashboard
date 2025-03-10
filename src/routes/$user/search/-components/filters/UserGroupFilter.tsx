import { useParams } from "@tanstack/react-router";
import { useState } from "react";

interface UserGroupFilterProps {
  allFilters: string[];
  setAllFilters: React.Dispatch<React.SetStateAction<string[]>>;
}

export function UserGroupFilter({ allFilters, setAllFilters }: UserGroupFilterProps) {

  const userName = allFilters.find((f) => f.startsWith("user:"))?.split(":")[1];
  const [user, setUser] = useState(userName);
  const [org, setOrg] = useState("");
  return (
    <div className="w-full h-full flex items-center gap-2 justify-center">
      <input 
      placeholder="Github user" 
      className="input border" 
      value={user} onChange={(e) => setUser(e.target.value)} />
      <input placeholder="Github org" className="input border" value={org} onChange={(e) => setOrg(e.target.value)} />
      <button onClick={() => setAllFilters((prev) => [...prev, `user:${user}`])}>Add User</button>
    </div>
  );
}
