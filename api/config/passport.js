var LocalStrategy = require('passport-local').Strategy;
// load up the user model
const passport = require("passport");
const bcrypte = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
let admin;
// expose this function to our app using module.exports
module.exports = function (passport) {
    passport.use(
        'local_login',
        new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
            function (req, username, password, done) { // callback with email and password from our form
                (async () => {
                 admin = await getUser();

                    if (!admin) {
                        //console.log(error);
                        return done(null, false, req.flash('error_msg', 'Please try again :null admin'))
                    
                    } else if (admin.id && !(await bcrypte.compare(password, admin.password))) {
                        return done(null, false, req.flash('error_msg', 'User name or pasword not correct'));
                    } else {
                        //console.log(results[0])
                        return done(null, admin);
                    }


                })();
            

            })
    );


};

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(async (id, done)=> {
    let adminDes= await prisma.tbl_admin.findUnique({
        where: {
            id: 1,
        },
    })
    done(null,adminDes);
});


async function getUser() {
    // By ID
    return await prisma.tbl_admin.findUnique({
        where: {
            id: 1,
        },
    })

}