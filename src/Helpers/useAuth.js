import useToken from "./useToken";

export default function useAuth() {
  const { token } = useToken();

  return typeof token === "object" && token.id > 0 ? true : false;
}
