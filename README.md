# ELECTRONICS E-COMMERCE API⚡⚡
<hr />

⚠ User registration through "/api/users" :-
{
    "userName":"test user",
    "email":"testuser@example.com",
    "phone":9999999999,
    "password": "test123",
    "cpassword":"test123",
    "status":"active"
}
on post request.

⚠ User login through "/api/users/signIn" :-
{
    "email":"testuser@example.com",
    "password": "test123"
}
on post request.

⚠ User profile display data through "/api/users/{'userId'}" on get request.

⚠ User details update trough "/api/users" :-
{
    "_id": "65b557f0a59b982b35c1981a",
    "userName": "test user",
    "email": "testuser@example.com",
    "phone": 9999999999,
    "password": "$2b$10$vSVaPloS1xChw/oSAFf0luTzEIlji0yyTyReCRloTCEFs2vJHenqO",
    "status": "active",
    "__v": 0
}
on put request.

⚠ User Logout is done but its need frontend . its on "/api/users/logout/" on get request.

⚠ User password update on "/api/users/changePassword/" :-
{
    "userId": "65b566fe34bf114a59cb0b6d",
    "currentPassword":"test123",
    "newPassword":"test456",
    "confirmPassword":"test456"
}
on put request

⚠ User account deleting on "/api/users/" :-
{
    "uesrId":"65b575118f553a2a32f4bb9d"
}
on delete request.
