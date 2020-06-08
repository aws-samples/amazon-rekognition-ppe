import React from "react";
import ProtectionCard from "./ProtectionCard";

export default ({ testResults }) => (
  <div className="people-container">
    {testResults.map((person) => (
      <ProtectionCard person={person} key={person.id}></ProtectionCard>
    ))}
  </div>
);
