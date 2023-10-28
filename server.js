const express = require('express');
const app =express();
const db=require("./db")
const PORT = process.env.PORT || 4000;
app.set('view engine','ejs')
app.use(express.urlencoded({ extended:false}));
app.use(express.json())


app.post('/register', async(req, res) => {
    const {user_name,user_email, user_password,user_id} = req.body;
    try{
        const query = `INSERT INTO users (user_name,user_email, user_password,user_id)
                            VALUES ($1, $2, $3,$4)
                           `;
        const values = [user_name, user_email, user_password,user_id];
        let pattern = /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
        if (user_name.length < 3){
            res.json("very short name, add more then 8 characters");
        } else if (!pattern.test(user_email)){
            res.json("your email is not valid!");
        } else if (user_password.length < 8){
            res.json("very short password, add more then 8 characters");
        } else {
            const result = await db.query(query, values);
            // const newUserId = result.rows[0].user_id;
            res.status(201).json({ message: 'User added successfully'});
        }
    } catch (error){
        console.error('Failed to register : ', error);
        res.status(500).json({ error: 'Failed to register'});
    };
});
  app.get("/login", async (req, res) => {
    const { user_name, user_password } = req.body;
  
    try {
    //   const rs = await db.connect();
      const query = "SELECT * FROM users WHERE user_name = $1 AND user_password = $2 ";
      const result = await db.query(query, [user_name, user_password]);
    //   db.release();
    let user = (result.rows[0]);
      if (user.user_name==user_name) {
        res.send("تم تسجيل الدخول بنجاح!");
      } else {
        res.send("فشل تسجيل الدخول. تحقق من معلومات تسجيل الدخول.");
      }

    } catch (error) {
      console.error(error);
      res.status(500).send("خطأ في الخادم");
    }
  });

app.get('/amer', async (req, res) => {
    try {
      let result = await db.query( `select * from users`);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send('error in get the home');
    }
});
app.get('/home', async (req, res) => {
    try {
      let result = await db.query(`SELECT users.user_name, blogs.blog_id, blogs.blog_title, blogs.image, blogs.place_name, blogs.place_location 
      FROM users INNER JOIN blogs ON users.user_id = blogs.the_user;`);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send('error in get the home');
    }
});
app.post('/addBlog', async (req, res) => {
    const { blog_title, blog_description, the_user, image, place_name, place_location } = req.body;
    try {
        const query = `
            INSERT INTO blogs (blog_title, blog_description, the_user, image, place_name, place_location)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING blog_id`;
        const values = [blog_title, blog_description, the_user, image, place_name, place_location];

        const result = await db.query(query, values);
        const newBlogId = result.rows[0].blog_id;
        res.status(201).json({ message: 'Blog added successfully', blog_id : newBlogId });
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ error: 'Failed to add the blog' });
    }
});
app.get('/getblog/:id', async(req, res) => {
    try{
        const query = 'select * from blogs where blog_id = $1';
        const blogId = req.params.id;
        const result = await db.query(query, [blogId]); 
        res.json(result.rows);
    } catch (error){
        console.error('Failed to get one blog: ', error);
        res.status(500).json({ error: 'Failed to get one blog'});
    }
});
app.listen(PORT,()=>{
    console.log(`server running in ${PORT}`)
    
    });