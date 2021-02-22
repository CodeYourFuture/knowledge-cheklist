import { useLocation } from "react-router-dom";

export default function useQuery(term) {
  return new URLSearchParams(useLocation().search).get(term);
}
