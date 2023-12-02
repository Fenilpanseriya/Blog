const dataset=new Set();

const checkUser=(userdata)=>{
    return dataset.has(userdata);
}
const addUser=(userdata)=>{
        dataset.add(userdata)
}
export const User=(action,userdata)=>{
    if(action==="addUser"){
        addUser(userdata);
        console.log(dataset);
    }
    else{
        return checkUser(userdata);
    }
}
