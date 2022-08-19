
// const projectTable = document.getElementById("project_display")! as HTMLDivElement;
// const completeTable = document.getElementById("completedProjects")! as HTMLDivElement;
// const projectsTableBody = document.getElementById("projects_table_body")! as HTMLTableElement;




const project_name = document.getElementById('projectname') as HTMLInputElement
const project_desc = document.getElementById('projectdesc') as HTMLInputElement
const project_timeline = document.getElementById('projecttimeline') as HTMLInputElement
const add_project = document.getElementById('add_project') as HTMLButtonElement


const project_id = document.getElementById('projectid') as HTMLInputElement
const user_idp = document.getElementById('user_idp') as HTMLInputElement

const assign_project = document.getElementById('assign_project1') as HTMLButtonElement

const addproject = document.querySelector(".add_project") as HTMLDivElement;








const admin = document.getElementById('admin') as HTMLParagraphElement
const adminName = localStorage.getItem('name')
if (adminName) {
  admin.textContent = ` Welcome Admin : ${adminName}`
}

const logout = document.querySelector('.btn_logout') as HTMLButtonElement
logout.addEventListener('click',(e)=>{
  e.preventDefault();
  localStorage.clear()
  location.href="index.html"
  

})





interface projectInterface {

  id: string;
  project_name: string;
  project_desc: string;
  project_timeline: string;
  project_status: string;
  user_id: number;
  email:string

}

interface user{
    id: number
    username:string
    email: string
    password: string
}

const add = document.getElementById("add_project_div");
const show_project = document.getElementById("project_display") as HTMLDivElement;
const user_display = document.getElementById("users") as HTMLDivElement;
const completed_projects = document.getElementById('completedProjects')  as HTMLDivElement;


const createBtn = document.querySelector('#createBtn') as HTMLButtonElement;
const viewBtn = document.querySelector('#viewBtn') as HTMLButtonElement;
const userBtn = document.querySelector('#userBtn') as HTMLButtonElement;
const complete_project = document.querySelector('#completeBtn') as HTMLButtonElement;

window.onload =() =>{
  addproject.style.display = 'block';
  show_project.style.display = 'none';
  user_display.style.display = 'none';
  completed_projects.style.display = 'none';
}

createBtn.addEventListener('click',() =>{
  addproject.style.display = 'block';
  show_project.style.display = 'none';
  user_display.style.display = 'none';
  completed_projects.style.display = 'none';
});
viewBtn.addEventListener('click',() =>{
  addproject.style.display = 'none';
  show_project.style.display = 'block';
  user_display.style.display = 'none';
  completed_projects.style.display = 'none';
});
userBtn.addEventListener('click',() =>{
  addproject.style.display = 'none';
  show_project.style.display = 'none';
  user_display.style.display = 'block';
  completed_projects.style.display = 'none';
});
complete_project.addEventListener('click',() =>{
  addproject.style.display = 'none';
  show_project.style.display = 'none';
  user_display.style.display = 'none';
  completed_projects.style.display = 'block';
});



class Projects {
  static getProject() {
    return new Projects
  }
  constructor() { }



  addProject(project_name: string, project_description: string, project_timeline: string, email:string) {

    const promise = new Promise<{ error?: string, message?: string }>((resolve, reject) => {
      fetch('http://localhost:5000/projects/createproject', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "project_name": project_name,
          "project_desc": project_description,
          "project_timeline": project_timeline,
          "email":email
        }
        )
      }).then(res => {
        resolve(res.json())
      }).catch(err => {
        reject(err)
      })
    })

    promise.then(data => console.log(data)).catch(err => console.log(err))

  }

  assignProject(project_id: number, user_id: number) {

    const promise = new Promise<{ error?: string, message?: string }>((resolve, reject) => {
      fetch('http://localhost:5000/projects/assignproject', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          "project_id": project_id,
          "user_id": user_id
        }
        )
      }).then(res => {
        resolve(res.json())
      }).catch(err => {
        reject(err)
      })
    })

    promise.then(data => console.log(data)).catch(err => console.log(err))

  }

  
 
}
//assign projects
const nullUserEmails = document.getElementById("nullemails") as HTMLSelectElement
fetch("http://localhost:5000/users/nullusers",{
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
                
                let pendingUsers : user[]=data
                    
                // console.log(pendingUsers);
                
                pendingUsers.forEach((element)=>{
                    // const id= element.email

                    const option= document.createElement("option")
                    option.innerHTML = `${element.email}`
                    nullUserEmails.appendChild(option)
                })
                
            }
        )
    }
)

//unassigned projects

fetch('http://localhost:5000/projects/pendingprojects', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",

})
.then(res =>{
  res.json().then(
    data => {
      // console.log('data',data.project);
      
      let projects : projectInterface[] = data.project

      if(projects.length>0){
        let disp ="<table border>"

        disp += '<thead>'
        disp += '<tr>'
        disp += '<td>' + 'project_id' + '</td>'
        disp += '<td>' + 'project_name' + '</td>'
        disp += '<td>' + 'project_desc' + '</td>'
        disp += '<td>' + 'project_timeline' + '</td>'
      

        disp += '</tr>'
        disp += '</thead>'
       
        projects.forEach(({id,project_desc,project_name,project_timeline})=>{
        disp += '<tr>'
        disp += '<td>' + id + '</td>'
        disp += '<td>' + project_desc + '</td>'
        disp += '<td>' + project_name + '</td>'
        disp += '<td>' + project_timeline + '</td>'
        

        disp += '</tr>'

        })
        // console.log('disp',disp);
        

        
        let projectdisplay= document.querySelector('.projectdisplay') as HTMLDivElement
        projectdisplay.innerHTML=disp
      }else{
        let projectdisplay= document.querySelector('.projectdisplay') as HTMLDivElement
        projectdisplay.innerHTML=`no pending projects...`
        
      }
  
      

    }
  )

})

const pending_projects = document.getElementById("pending_projects") as HTMLSelectElement
fetch("http://localhost:5000/projects/pendingProjects",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
                // console.log('allusers',data);
                
                let unallocated_projects :projectInterface[]= data
                if(unallocated_projects.length>0){
                    const projectids = unallocated_projects.filter((element)=>{
                        return element.id
                    })
                    projectids.forEach((element)=>{
                        let projectid= element.id
                        const option1= document.createElement("option")
                        option1.innerHTML=`${projectid}`
                        pending_projects.appendChild(option1)
                    })
                }else{
                    pending_projects.innerText="no pending projects"
                }
            }
        )
    }
)


fetch("http://localhost:5000/projects/completeproject",{
    headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
    },
    method:"POST"
}).then(
    res=>{
        res.json().then(
            data=>{
              console.log(data);
              
                let finishedproject : projectInterface[]= data.complete
                // console.log(finishedproject);
                
            
                if (finishedproject.length > 0){
                    let disp = "<table border  background color='red'>"

                    disp += '<thead>'+ '<b>'
                    disp += '<tr>'
                    disp += '<td>' + 'id' + '</td>'
                    disp += '<td>' + 'project_name' + '</td>'
                    disp += '<td>' + 'project_desc' + '</td>'
                    disp += '<td>' + 'project_timeline' + '</td>'
                    disp += '</tr>'
                    disp += '</b>'+'</thead>'

                    finishedproject.forEach(({id, project_name, project_desc, project_timeline})=>{

                        disp += '<tr>'
                        disp += '<td>' + id + '</td>'
                        disp += '<td>' + project_name + '</td>'
                        disp += '<td>' + project_desc + '</td>'
                        disp += '<td>' + project_timeline+ '</td>'
                        disp += '</tr>'

                        // console.log(disp);
                        
                    })
                    const completedata = document.createElement('div')
                    completedata.innerHTML = disp
                   
                    

                    const displayComplete=document.getElementById("completeness") as HTMLDivElement;
                    displayComplete.appendChild(completedata)

                    
                }else{
                    const displayComplete=document.getElementById("completeness") as HTMLDivElement;
                    displayComplete.textContent="!!no completed projects...";
                }
            }
        )
    }
)



fetch('http://localhost:5000/users/getallusers', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",

})
.then(res =>{
  res.json().then(
    data => {
      // console.log(data);
      
      let users : user[] = data
      

      if(users.length>0){
        let disp ="<table border>"

        disp += '<thead>'
        disp += '<tr>'
        disp += '<td>' + 'user_id' + '</td>'
        disp += '<td>' + 'username' + '</td>'
        disp += '<td>' + 'email' + '</td>'
        // disp += '<td>' + '' + '</td>'

        disp += '</tr>'
        disp += '</thead>'
       
        users.forEach(({id,username,email})=>{
        disp += '<tr>'
        disp += '<td>' + id + '</td>'
        disp += '<td>' + username + '</td>'
        disp += '<td>' + email + '</td>'
        // disp += '<td>' + project_timeline + '</td>'

        disp += '</tr>'
        })

        
        let userdisplay= document.querySelector('.userdisplay') as HTMLDivElement
        userdisplay.innerHTML=disp
      }else{
        let userdisplay= document.querySelector('.userdisplay') as HTMLDivElement
        userdisplay.innerHTML=`no available users`
      }
  
      
     

    }
  )

})
const deleteproject = document.querySelector(".deleteProject") as HTMLButtonElement
deleteproject.addEventListener('click',(e)=>{
    e.preventDefault()
const taskid = (pending_projects.value)
console.log(taskid);

if (taskid){
    
    deleteProject.getProject().deletetask(taskid)
    console.log(pending_projects.innerText);
 
}
})



class deleteProject{
  static getProject(){
      return new deleteProject
  }
  constructor(){}
  deletetask(id:string){
      const promise = new Promise<{error?:string, message?:string}>((resolve, reject)=>{
          fetch("http://localhost:5000/projects/delete",{
              headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json'
              },
              method:"POST",
              body:JSON.stringify({
                  "projectId": id
              })
          }).then(res=>{
              resolve(res.json())
          }).catch(err=>{
              reject(err)
          })
      })
      promise.then((data=>console.log(data))).catch(err=>console.log(err)
      )
  }
}




add_project.addEventListener('click', () => {
  const nullemails = document.getElementById("nullemails") as HTMLSelectElement
  const projectnameInput = project_name.value;
  const projectdescInput = project_desc.value;
  const projecttimelineInput = project_timeline.value;
  const email = nullemails.value
  

 
 

  if (projectnameInput == '' || projectdescInput == '' || projecttimelineInput == '' || email == '') {

    const error_message = document.getElementById("error_message") as HTMLParagraphElement
    error_message.textContent = "please fill all the fields";
    error_message.style.color = "red";

    setTimeout(() => {
        // window.location.href='userDashboard.html'
        window.location.reload()
      }, 2000);
    console.log('Please fill out all the fields...');

  } else {
    Projects.getProject().addProject(projectnameInput, projectdescInput, projecttimelineInput, email)
    const error_message = document.getElementById("error_message") as HTMLParagraphElement
    error_message.textContent = "registered successfully";
    error_message.style.color = "red";
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
})








