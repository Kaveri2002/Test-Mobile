
// Input - “num)er(ol)ogy)”
// Output - “numer(ol)ogy”
// Input - “))((“
// Output - “”
const express = require("express");
const app = express();


function middleware(req, res, next) {
    console.log(req.body)
    next();
}

function middleware1(req, res, next) {
    console.log("middleware for post api")
    next();
}

app.use(express.json());
app.use(express.urlencoded());
app.use(middleware);

app.get('/', (req, res) => {
    console.log("Helllo World")
})

function transformString(str) {
    let result = ''
    let paranthesCount = 0;

    for (let i = 0; i < str.length; i++) {
        const element = str[i];
        if(element === '(') {
            paranthesCount++;
            result += element;
        } else if(element === ')'){
            if(paranthesCount > 0){
                paranthesCount--;
                result += element;
            }
           
        } else {
            result += element;
        }
        
    }

    return result
}

app.post('/add', middleware1, (req, res) => {
    let data = req.body
    console.log(data)
    let result = transformString(data.str);
    if(!data){
        return res.status(403).json({message: "data not found", data: {}})
    }
    res.status(200).json({message: "data not found", data: result})
})


app.listen(3000, () => {
    console.log("server is running at 3000")
})