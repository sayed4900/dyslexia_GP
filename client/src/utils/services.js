export const baseUrl  = " http://127.0.0.1:5000/api";


export const postRequest = async(url,body)=>{
  const response = await fetch(url,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    
    },
    body :JSON.stringify(body)// json object
  });

  const data = await response.json(); 

  if (!response.ok){
    let message ; 
    
    if (data?.message){
      message = data.message // message from the server which come from catch
    }else message = data; // message now is our custom error

    return {error: true , message}
  }
  return data;
}

export const getRequest = async(url)=>{
  const response = await fetch(url);

  const data = await response.json(); 
  
  if (!response.ok){
    let message ; 
    
    if (data?.message){
      message = "An error occured" ;
    }else message = data; // message now is our custom error

    return {error: true , message}
  }
  return data;
}