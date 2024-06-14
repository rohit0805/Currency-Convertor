import { IGetQuery } from "./interface";

export const getQueryResponse = async (props: IGetQuery)=>{
  const response = await fetch(props.query);
  if(!response.ok){
    return;
  }
  const data = await response.json();
  return data;
}