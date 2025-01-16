// src/components/PartList.tsx
import React from "react";
import { useQuery } from "react-query";
import axios from "../api/axios";

const fetchParts = async () => {
  const { data } = await axios.get("/parts");
  return data;
};

const PartList: React.FC = () => {
  const { data, error, isLoading } = useQuery("parts", fetchParts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading parts</div>;

  return (
    <div>
      <h1>Parts</h1>
      <ul>
        {data.map((part: any) => (
          <li key={part.id}>
            {part.name} - ${part.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartList;
