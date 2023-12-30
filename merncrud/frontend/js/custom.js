
function getUser(){
    fetch("http://localhost:8080").then((res)=>{
        return res.json();
    }).then((users)=>{
        console.log(users)
        let outPut = "";
        users.data.map((user,index)=>{
            outPut+=`<tr>
                <td>${++index}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><button>Edit</button>
                <button onclick="deleteData('${user._id}')">Delete</button></td>
            </tr>`;
        });
        document.getElementById("userList").innerHTML=outPut;
    }).catch((e)=>{
        console.log(e);
    })
}
getUser();

function deleteData(id){
    //alert(id);
    let question = confirm("Are you sure you want to delete?");
    if(question){
        fetch(`http://localhost:8080/${id}`,{
        method:"DELETE"
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        getUser();
    }).catch((e)=>{
        console.log(e);
    })
    }else{
            alert("data not deleted");
    }
}

function updateData(id){
document.getElementById('criteria').value = id;
document.getElementById('addRecord').innerHTML="updated data"
fetch(`http://localhost:8080/${id}`).then((res)=>{
    return res.json();

}).then((user)=>{
    document.getElementById('name').value = user.data.name;
    document.getElementById('email').value = user.data.email;
    document.getElementById('phone').value = user.data.phone;
}).catch((e)=>{
    console.log(e);
})
}
document.querySelector("#addRecord").addEventListener('click',function(e){
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let sendData = {name,email,phone}
    
    fetch("http://localhost:8080",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(sendData)
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        getUser();
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";

    }).catch((e)=>{
        console.log(e);
    })
})
