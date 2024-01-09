import dataJson from "../../data.json";

export const getAPICourse = async () => {
  // const res = await fetch("../../data.json");
  // const data = await res.json();
  const data = dataJson;

  return data;
};
