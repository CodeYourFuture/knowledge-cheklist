import { useLocation } from "react-router-dom";

export default function useQuery(term) {
  console.log(useLocation);
  return new URLSearchParams(useLocation().search).get(term);
}
