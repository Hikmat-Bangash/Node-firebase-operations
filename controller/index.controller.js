const admin = require("firebase-admin");

const credentials = require("../key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

// -------- creating data in the fireabase firestore ---------

exports.CreateData = async (req, res) => {
  console.log(req.body);
  const { email, name, qualification } = req.body;
  const id = email;
  const userData = {
    email: email,
    name: name,
    qualification: qualification,
  };
  try {
    // const response = await db.collection("users").add(userData); //when you want to generate firebase default id

    //--- Note:  ------
    const response = await db.collection("users").doc(id).set(userData); // when you want to use ur own id instead of firebase default id
    return res.json({
      Data: response,
      message: "Data is saved, check out firebase store",
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({
      status: 500,
      err: error.message,
      message: "something went wrong!",
    });
  }
};

// ------------ retrieve all user data --------
exports.GetAllUsers = async (req, res) => {

   try {
     const usersRef = db.collection("users");
     const response = await usersRef.get();

     const datalist = [];
     response.forEach((doc) => {
       datalist.push(doc.data());
     });

     console.log(datalist);
     return res.json({ data: datalist, status: 200, success: true });
   } catch (error) {
     return res.json({
       message: "something went wrong!",
       status: 500,
       err: error.message,
     });
   }
  
}

// ---------------- retrieve specific user data ----------
exports.UserData = async (req, res) => {
  const { id } = req.params;

  try {
    const userRef = db.collection("users").doc(id);
    const response = await userRef.get();
    return res.json({
      data: response.data(),
      message: "data retreived successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({ message: "something went wrong!", err: error.message });
  }
  
}

//------------- update specific user data ---------
exports.UpdateUserdata = async (req, res) => {
  
  const id = req.params.id;
  const { name } = req.body;
  try {
    const updateRef = await db.collection("users").doc(id).update({
      name: name,
    });

    return res.json({
      respone: updateRef,
      message: "the data is updated successfully",
      status: 200,
    });
  } catch (error) {
    return res.json({
      message: "something went wrong!",
      success: false,
      status: 500,
    });
  }
}

//-------------- Delete specific user data ----------
exports.DeleteUserdata = async (req, res) => {
const id = req.params.id;
try {
  const response = await db.collection("users").doc(id).delete();
  return res.json({
    response: response,
    message: "Record deleted successfully",
    status: 200,
  });
} catch (error) {
  return res.json({ err: error.message, status: 500, success: false });
}
}

