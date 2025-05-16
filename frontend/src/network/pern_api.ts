import type { User } from "../model/user";

type PayementMethod= 'cach' | 'carte'
export interface pernInput {
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  accounts: PayementMethod[];
  password: string;
  provider: string;
  country: string;
  currency: string;
  
}

export interface SignUpCredentials{
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  accounts: PayementMethod[];
  password: string;
  provider: string;
  country: string;
  currency: string
}

export interface LoginCredentiels{
email:string;
password:string
}
async function fetchData(input:RequestInfo,init?:RequestInit){
  const response= await fetch(input,init)
  if(response.ok){
    return response
  }else{
    const errorBody= await response.json()
    const errorMessage=errorBody.error

    throw Error(errorMessage)
  }
}

export async function signUp(credentials:SignUpCredentials):Promise<User>{

  const response= await fetchData("/api-v1/auth/sign-up",{
    method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify(credentials)
  })

  return response.json()
}


export async function signIn(credentials:LoginCredentiels):Promise<User>{
  const response= await fetchData("/api-v1/auth/log-in",{
    method:"POST",
    headers:{
      "content-Type":"application/json"
    },
    body:JSON.stringify(credentials)
  })

  return response.json()
}