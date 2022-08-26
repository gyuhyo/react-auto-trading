import React from "react";
import useSocket from "../../utils/hooks/useSocket";

export default function index() {
  useSocket();

  return <div>index</div>;
}
