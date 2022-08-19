const register_username= document.getElementById('register_username') as HTMLInputElement
const register_email= document.getElementById('register_email') as HTMLInputElement
const register_password= document.getElementById('register_password') as HTMLInputElement
const register =document.getElementById('register') as HTMLButtonElement

const email= document.getElementById('login_email') as HTMLInputElement
const password= document.getElementById('login_password') as HTMLInputElement
const signin =document.getElementById('login') as HTMLButtonElement
const login_display = document.getElementById("login_element");
const register_display = document.getElementById("register_element");

function showLogin() {
    
      if (login_display!.style.display === "none") {
        login_display!.style.display = "block";
        register_display!.style.display = "none";

      } else {
        login_display!.style.display = "none";
        register_display!.style.display = "none";

      }
 }

 function showSignin() {
    
      if (register_display!.style.display === "none") {
        register_display!.style.display = "block";
        login_display!.style.display = "none";

      } else {
        register_display!.style.display = "none";
        login_display!.style.display = "none";

      }
 }


class Users{
    static getUser(){
        return new Users()
    }

    constructor(){}

    loginUser(email:string,password:string){

        const promise = new Promise<{error?:string,token?:string,message?:string}>((resolve, reject) => {
            fetch('http://localhost:5000/users/login',{
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method:"POST",
                body:JSON.stringify({
                   "email":email,
                   "password":password 
                })

            }).then(res=>{
                resolve(res.json())
            }).catch(err =>{
                reject(err)
            })
            
        })
        promise.then(data=>{
            data.token?localStorage.setItem('token',data.token):''
            this.redirect()
        }).catch(err=>console.log(err))

        // promise.then(data=>console.log(data)).catch(err=>console.log(err));
        


    }
    registerUser(username:string ,email:string, password:string){

        const promise = new Promise<{error?:string,message?:string}>((resolve, reject)=>{
            fetch('http://localhost:5000/users/registeruser', {
                headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method:"POST",
                body:JSON.stringify({
                "username":username,
                "email":email,
                "password":password
                }                             
                 )
            }).then(res=>{
                resolve(res.json())
            }).catch(err=>{
                reject(err)
            })
        })

        promise.then(data=>console.log(data)).catch(err=>console.log(err))

    }

    redirect(){
        const token = localStorage.getItem('token') as string
        new Promise<{name:string, role:string, email:string}>((resolve,reject)=>{
            fetch('http://localhost:5000/users/check',{
                 headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':token
                },
                method:"GET",
            }).then(res=> resolve(res.json()))
            .catch(err=>reject(err))
        }).then(data=>{
            console.log(data);
            localStorage.setItem('name',data.name)
            localStorage.setItem('email',data.email)
            
            if(data.role==='admin'){
                location.href='adminDashboard.html'
            }else if(data.role==='user'){
                   location.href='userdashboard.html'
            }
        }
        )
    }
}

signin.addEventListener('click',()=>{

    const emailInput = email.value;
    const passwordInput = password.value;

    if(emailInput == '' || passwordInput==''){
        const emptyFields = document.getElementById("emptyloginfield") as HTMLParagraphElement
        emptyFields.textContent = "Please fill in all fields";
        emptyFields.style.color = "red";
        setTimeout(()=>{
            emptyFields.textContent = ""
      
          },2000)
        console.log('Please fill in all fields...');
        
    }else{
        Users.getUser().loginUser(emailInput,passwordInput)



        // setTimeout(() => {
        //     window.location.reload()
        //   }, 2000);
      
    }

})

// const emptyfields = document.getElementById('#emptyfield') as HTMLParagraphElement
register.addEventListener('click',()=>{
    const nameInput = register_username.value;
    const emailInput = register_email.value;
    const passwordInput = register_password.value;
    

    if(nameInput=='' || emailInput==''|| passwordInput==''){
        const emptyFields = document.getElementById("emptyfield") as HTMLParagraphElement
        emptyFields.textContent = "Please fill in all fields";
        emptyFields.style.color = "red";
        setTimeout(()=>{
            emptyFields.textContent = ""
      
          },2000)
      
        
        
    }else{
        Users.getUser().registerUser(nameInput,emailInput,passwordInput)
        const success = document.getElementById("emptyfield") as HTMLParagraphElement
        success.textContent = "registered successfully";
        success.style.color = "red";

        setTimeout(() => {
            // window.location.href='userDashboard.html'
            window.location.reload()
          }, 2000);

    }
})