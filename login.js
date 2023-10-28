
// app.use(bodyParser.urlencoded({ extended: false }));

// عرض نموذج التسجيل
// app.get("/register", (req, res) => {
//   res.sendFile(__dirname + '/register.html'); // تأكد من وجود ملف HTML لنموذج التسجيل
// });

// معالجة النموذج المقدم من صفحة التسجيل
// app.post("/register", async (req, res) => {
//   const { username, password, email } = req.body;

//   try {
//     const client = await pool.connect();
//     const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)";
//     const result = await client.query(query, [username, password, email]);
//     client.release();

//     res.send("تم التسجيل بنجاح!");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("خطأ في الخادم");
//   }
// });


// app.post("/login", async (req, res) => {
//     const { username, password } = req.body;
  
//     try {
//       const client = await pool.connect();
//       const query = "SELECT * FROM users WHERE username = $1 AND password = $2 AND email = $3";
//       const result = await client.query(query, [username, password]);
//       client.release();
  
//       if (result.rowCount > 0) {
//         res.send("تم تسجيل الدخول بنجاح!");
//       } else {
//         res.send("فشل تسجيل الدخول. تحقق من معلومات تسجيل الدخول.");
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("خطأ في الخادم");
//     }
//   });