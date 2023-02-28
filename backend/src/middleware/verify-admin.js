/**
 * Validate if the user has administrator control.
 */

function verifyAdmin(request, response, next){
    if(request.user && request.user.role== 1)
        next();
    else{
        return response.status(401).send("Unauthorized for admin Action! Please Login again.");
    }
}

module.exports = verifyAdmin;