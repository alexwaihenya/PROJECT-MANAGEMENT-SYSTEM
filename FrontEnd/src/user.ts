const users= document.getElementById('username') as HTMLParagraphElement
const username=localStorage.getItem('name')
if (username) {
    users.textContent = ` Welcome user : ${username}`
  }



 const userlogout = document.querySelector('.btn_logout_user') as HTMLButtonElement
 userlogout.addEventListener('click',(e)=>{
    
   e.preventDefault();
   window.location.href="index.html"
   localStorage.clear()
 
 })



 

 fetch("http://localhost:5000/users/assigned/",{
  headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
  },
  method:"POST"
}).then(
  res=>{
      res.json().then(
          data=>{ 
                // console.log(data);
                             
              const assign_project : projectInterface[] = data.assignedproject

              const usertask = assign_project.filter((el)=>{
                return el.email == localStorage.getItem("email")
              })
               console.log(usertask);
 
              if (usertask.length == 0){
                  const projects_assigned = document.querySelector(".projects_assigned") as HTMLDivElement;
                  projects_assigned.textContent="No task at the moment" 
              }
              console.log(usertask.length);
              
              if ( usertask.length > 0){
                  console.log(usertask.length);
                  
                  let disp = "<table border >"

                  disp += '<thead>'+ '<b>'
                  disp += '<tr>'
                  disp += '<td>' + 'project_id' + '</td>'
                  disp += '<td>' + 'project_name' + '</td>'
                  disp += '<td>' + 'project_desc' + '</td>'
                  disp += '<td>' + 'project_timeline' + '</td>'
                  disp += '</tr>'
                  disp += '</b>'+'</thead>'

                  
                  usertask.forEach(({id,project_name,project_desc,project_timeline})=>{
               
                      disp += '<tr>'
                      disp += '<td>' + id + '</td>'
                      disp += '<td>' + project_name + '</td>'
                      disp += '<td>' + project_desc + '</td>'
                      disp += '<td>' + project_timeline + '</td>'
                      disp += '</tr>'
                  })
                  const projects_assigned=document.querySelector(".projects_assigned") as HTMLDivElement;
                  projects_assigned.innerHTML=disp;
                }
              else{
                  const projects_assigned=document.querySelector(".projects_assigned") as HTMLDivElement;
                  projects_assigned.textContent="No Pending Projects at the moment";
              }
          }
          
      )
  }
)
//mark project done
const mark_complete= document.getElementById("mark_complete") as HTMLSelectElement
const mark_complete_project = document.getElementById("mark_complete_project") as HTMLInputElement
fetch("http://localhost:5000/users/assigned",{
  headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
  },
  method:"POST"
}).then(
  res=>{
      res.json().then(
          data=>{
            //    console.log(data.assignedproject)              
              const assigned_project : projectInterface[] = data.assignedproject

              const id = assigned_project.filter((el)=>{
                  return el.email== localStorage.getItem("email")
              })
                  if (id.length==0){
                      mark_complete.innerHTML="no task"; 
                  }
                  else if ( id ){
                  
                      id.forEach(({id})=>{
                                            
                      mark_complete.innerHTML  = (id)
                  })                   
                  
              }else{
                  mark_complete.innerHTML="no task";
              } 
          }
      )
  }
)
mark_complete_project.addEventListener('click', (e)=>{
  e.preventDefault();

  if(!mark_complete.innerHTML){
      mark_complete.innerHTML="No task at the moment"
  }else{
     CompleteProject.getprojectId().getProject(mark_complete.innerHTML)
  }
})

class CompleteProject{
  static getprojectId(){
      return new CompleteProject
  }
  constructor(){}
  
  getProject( id:string){
      const promise= new Promise<{error?:string, message?: string}>((resolve, reject)=>{
          fetch('http://localhost:5000/users/markdone',{
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },method:"POST",
              body:JSON.stringify({
                  "id": id
              })
          }).then(res=>{
              resolve(res.json())
          }).catch(err=>{
              reject(err)
          })
      })
      promise.then((data=>console.log(data))).catch(err=>console.log(err));
      return promise;
    //   setTimeout(() => {
    //   window.location.reload()   
    //   }, 1000);
      
  }
}
