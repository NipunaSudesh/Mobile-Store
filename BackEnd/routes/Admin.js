const express =require("express");
const router =express.Router();
const User =require("../model/admin");
const auth = require("../middleware/auth");



router.post("/register", async (req,res)=>{
    const { email, name, password } = req.body;

    try{
        const dbUser = await User.findOne({ email });
        if(dbUser){
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ email, name, password });
        await user.save()
        //const token = await user.generateAuthToken();
        res.status(201).send(user)
    }catch(error){
        console.error('Error during registration:', error);
        res.status(500).send({error:error.massage || 'Server error' })
    }
});

router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken()
        res.send({ user, token });

    } catch (error) {
        res.status(500).json({error:error.massage|| 'Server error' });
    }
});

router.get("/users",async (req,res)=>{

    try{
        const users=await User.find({});
        res.status(200).send(users)
    }catch(error){
        res.status(500).send({ error: 'Server error' })
    }
});

router.get("/me",auth, async (req, res) => {
    // const _id = req.params._id;
     const _id =req.user._id;
     try {
         const user = await User.findById(_id);
 
         if (!user) {
             return res.status(404).send({ message: 'Invalid credentials' }); 
         }
         console.log(user);
         res.status(200).send(user); 
 
     } catch (error) {
         console.error('Error fetching user:', error);
         res.status(500).send({ error: 'Server error' })
     }
 });
 router.patch("/update/me",auth,async (req,res) =>{
    const _id =req.user._id;
      //const _id=req.params.id.trim()
     try {
         const udpateUser =await User.findByIdAndUpdate(_id,req.body,{
             new:true
         });
         if(!udpateUser){
             return res.status(404).send({ message: 'Invalid credentials' });
         }
         return res.status(200).send({ message: 'updated successful' });
     } catch (error) {
         return res.status(500).send({ error: 'Server error' });
     }
 });

 

 
 // logout eka hdnn oni antim video eke 1.30 idn tiye
 module.exports =router;