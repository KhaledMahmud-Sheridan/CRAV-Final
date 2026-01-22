exports.kmtest_get = (req, res, next) => {
    const obj={
        age: 30,
        name: "FName"
    }
    const alist=[];
    for (let i=0; i<3; i++){
        alist[i]=obj;
    }
    //res.send(obj);
    res.send(alist);
};

exports.kmtest_post = (req, res, next) => {
    const data=req.body;
    console.log(data);
    res.send("Recieved POST for kmtest");
};