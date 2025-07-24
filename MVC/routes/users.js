const express = require("express")

const router = express.Router();

const {handleGetAllUser,
    handleGetUserById,
    handleUpadteUser, 
    handleDeleteById,
    handleCreateNewUser
} = require("../controllers/users")

//Routes
router.get("/", handleGetAllUser)
router.post("/", handleCreateNewUser)

router.get("/:id",handleGetUserById )


router.patch("/:id", handleUpadteUser)

router.delete("/:id", handleDeleteById)

// also do this
// router.route("/")
// .get(handleGetAllUser)
// .post(handleCreateNewUser);

// router.route("/:id")
// .get(handleGetAllUser)
// .patch(handleUpadteUser)
// .delete(handleDeleteById)


module.exports = router;