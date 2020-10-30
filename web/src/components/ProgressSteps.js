import { useState } from "react";

export default ({ children, current }) => {
  return <>{children[current]}</>;
};

export const Step = ({ children }) => <>{children}</>;
