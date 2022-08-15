const admin = document.getElementById('admin') as HTMLParagraphElement
const adminName = localStorage.getItem('name')

if (adminName) {
  admin.textContent = ` Welcome Admin : ${adminName}`
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

function assignProject() {
const x = document.getElementById("assign_project");
  if (x!.style.display === "none") {
    x!.style.display = "block";
  } else {
    x!.style.display = "none";
  }
}

  




const project_name = document.getElementById('projectname') as HTMLInputElement
const project_desc = document.getElementById('projectdesc') as HTMLInputElement
const project_timeline = document.getElementById('projecttimeline') as HTMLInputElement
const add_project = document.getElementById('add_project') as HTMLButtonElement


class Projects {
  static getProject() {
    return new Projects
  }
  constructor() { }

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


}


add_project.addEventListener('click', () => {
  const projectnameInput = project_name.value;
  const projectdescInput = project_desc.value;
  const projecttimelineInput = project_timeline.value;

  if (projectnameInput == '' || projectdescInput == '' || projecttimelineInput == '') {
    console.log('Please fill out all the fields...');

  } else {
    Projects.getProject().addProject(projectnameInput, projectdescInput, projecttimelineInput)
    
  }
})

