function getUser(){
    fetch("http://localhost:8080").then((res)=>{
        return res.json();
    }).then((users)=>{
        console.log(users)
        let outPut = "";
        users.data.map((user,index)=>{
            outPut+=`<tr>
                <td>${index++}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td><button>Edit</button><button>Delete</button></td>
            </tr>`;
        });
        document.getElementById("userList").innerHTML=outPut;
    }).catch((e)=>{
        console.log(e);
    })
}
getUser();