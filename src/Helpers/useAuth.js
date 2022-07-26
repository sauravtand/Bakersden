import useToken from "./useToken";

export default function useAuth(){
  const {token} = useToken()
  // console.log("token use token" , token)

  return typeof token === 'object' && token.id > 0 ? true : false
}