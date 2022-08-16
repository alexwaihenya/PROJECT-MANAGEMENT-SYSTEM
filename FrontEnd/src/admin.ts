const admin = document.getElementById('admin') as HTMLParagraphElement
const adminName = localStorage.getItem('name')

if (adminName) {
  admin.textContent = ` Welcome Admin : ${adminName}`
}


interface projectInterface {

  id: number;
  project_name: string;
  project_desc: string;
  project_timeline: string;
  project_status: string;
  user_id: number;

}

interface user{
    id: number
    username:string
    email: string
    password: string
}




function showAddProject() {
  const x = document.getElementById("my_div");
  if (x!.style.display === "none") {
    x!.style.display = "block";
  } else {
    x!.style.display = "none";
  }
}
function viewProjects() {
  const x = document.getElementById("project_display");
  if (x!.style.display === "none") {
    x!.style.display = "block";
  } else {
    x!.style.display = "none";
  }
}

function showUsers() {
  const x = document.getElementById("users");
  if (x!.style.display === "none") {
    x!.style.display = "block";
  } else {
    x!.style.display = "none";
  }
}

function assignProject() {
  const x = document.getElementById("my_div");
  if (x!.style.display === "none") {
    x!.style.display = "block";
  } else {
    x!.style.display = "none";
  }
}

const projectTable = document.getElementById("project_display")! as HTMLDivElement;
const projectsTableBody = document.getElementById("projects_table_body")! as HTMLTableElement;




const project_name = document.getElementById('projectname') as HTMLInputElement
const project_desc = document.getElementById('projectdesc') as HTMLInputElement
const project_timeline = document.getElementById('projecttimeline') as HTMLInputElement
const add_project = document.getElementById('add_project') as HTMLButtonElement


const project_id = document.getElementById('projectid') as HTMLInputElement
const user_idp = document.getElementById('user_idp') as HTMLInputElement

const assign_project = document.getElementById('assign_project1') as HTMLButtonElement


class Projects {
  static getProject() {
    return new Projects
  }
  constructor() { }

  projects: projectInterface[] | [] = []

  addProject(project_name: string, project_description: string, project_timeline: string) {

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
          "project_timeline": project_timeline
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


fetch('http://localhost:5000/projects/getallprojects', {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST",

})
.then(res =>{
  res.json().then(
    data => {
      console.log(data);
      
      let projects : projectInterface[] = data

      if(projects.length>0){
        let disp ="<table border>"

        disp += '<thead>'
        disp += '<tr>'
        disp += '<td>' + 'project_id' + '</td>'
        disp += '<td>' + 'project_name' + '</td>'
        disp += '<td>' + 'project_desc' + '</td>'
        disp += '<td>' + 'project_timeline' + '</td>'
        disp += '<td>' + 'user_id' + '</td>'

        disp += '</tr>'
        disp += '</thead>'
       
        projects.forEach(({id,project_desc,project_name,project_timeline,user_id})=>{
        disp += '<tr>'
        disp += '<td>' + id + '</td>'
        disp += '<td>' + project_desc + '</td>'
        disp += '<td>' + project_name + '</td>'
        disp += '<td>' + project_timeline + '</td>'
        disp += '<td>' + user_id + '</td>'

        disp += '</tr>'
        })

        
        let projectdisplay= document.querySelector('.projectdisplay') as HTMLDivElement
        projectdisplay.innerHTML=disp
      }else{
        
      }
  
      

    }
  )

})



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
      console.log(data);
      
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
        
      }
  
      
     

    }
  )

})





add_project.addEventListener('click', () => {
  const projectnameInput = project_name.value;
  const projectdescInput = project_desc.value;
  const projecttimelineInput = project_timeline.value;

  if (projectnameInput == '' || projectdescInput == '' || projecttimelineInput == '') {
    console.log('Please fill out all the fields...');

  } else {
    Projects.getProject().addProject(projectnameInput, projectdescInput, projecttimelineInput)
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
})




assign_project.addEventListener('click', () => {
  const projectidInput = project_id.value ;
  const useridInput = user_idp.value;
  


  if (!projectidInput || !useridInput  ) {
    console.log('Please fill out all the fields...');

  } else {
    Projects.getProject().assignProject(parseInt(useridInput),parseInt(projectidInput))
    setTimeout(() => {
      window.location.reload()
    }, 2000);
  }
})



