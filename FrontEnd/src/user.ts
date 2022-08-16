const users= document.getElementById('user') as HTMLParagraphElement
 const names=localStorage.getItem('name')


 if(names){
   users.textContent= `Welcome User: ${names}`
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
        disp += '<td>' + 'project_timeline' + '</td>'
        // disp += '<td>' + 'project_timeline' + '</td>'
        // disp += '<td>' + 'user_id' + '</td>'

        disp += '</tr>'
        disp += '</thead>'
       
        projects.forEach(({id,project_name,project_timeline})=>{
        disp += '<tr>'
        disp += '<td>' + id + '</td>'
        disp += '<td>' + project_desc + '</td>'
        disp += '<td>' + project_name + '</td>'
        // disp += '<td>' + project_timeline + '</td>'
        // disp += '<td>' + user_id + '</td>'

        disp += '</tr>'
        })

        
        let projectdisplay= document.querySelector('.projectdisplay') as HTMLDivElement
        projectdisplay.innerHTML=disp
      }else{
        
      }
  
      
     

    }
  )

})
