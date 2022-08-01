# sooqcom routs 


**POST** /signup

to signup as new user or admain 

*body*
``` 
  {    
     "username":"string",   
    "password":"string",   
    "role":"admin/user"   
   } 
   ```
    

**POST**/signin   
to signinas user or admain    

*body*
```
  {    
     "username":"string",   
    "password":"string",   
     
   }
```
 **GET**  /signout   
   to signout

------

**delete** /delete/:username
enable admin to delete users    

**PUT**  /user/profile/:id/update    

to update user profile 

*body*    
```
{
   "username": "string",
      "password": "string",
      "firstName":"string ",
      lastName:"string ",
      phoneNumber: "string ",
      email: "string ",
      city: enum("Amman..."),
      dataOfBirth: date,
}
```   

------
## visitor routes   
**GET**/:model  
retriev specific model posts   


**GET** /:model/:postId    

retriev specific post      


**GET**  /:model/:postId/:modelImages

retriev specific post images (visitor)



**GET**  /:model/:process/:city/:owner/:availability/:buildingAge/:furnished/:rooms/:bathRooms/:rentDuration/:floors/:priceFrom/:priceTo   

Filter one or more at the same time (visitor)   

**POST** /hi/search/:model/:term'  


search about specific thing 

------- 


**GET** /dashboard/:userId/main    

to open user dashboard     

**GET**  /dashboard/:userId/:model     
this will allows user to see all his posts in dashboard for specific model 


**GET**/dashboard/:userId/:model/:postId

this will allows user to open a specific. post in dashboard in specific model      



**GET**/dashboard/:userId/:model/:postId/:modelImages     
  Get specific post images   

  **POST**/newpost/:userId/:model"

  to  Create posts    
*body* 
  
  ```
{
    "process":"Rent",    
    "model":"lands",    
    "price": 250 ,    
    "area": 212.5,   
    "availability"  :true,    
    "address":"somewhere",    
    "moreInfo":"anything"    
}
```
 **POST**/newpost/:userId/:model/:postId/:modelImages     
 
  to create post images   
  *body* 
```
   {
   url1: "string url",   
   url2: "string url" ,  
   url3: "string url" ,
   url4: "string url",
   url5: "string url".
   }    
```
---------------------
**GET**/dashboard/:userId/:model/:postId      

to open specific post in user dashboard



 **PUT**/dashboard/:userId/:model/:postId   

  how to Update posts images from dashboard    



  **DELETE**  /dashboard/:userId/:model/:postId   
  to delete post images from dsashboard    


 **GET**  /user/profile/:userId  
  to open users personal profile    

 --------

  **POST**  admin/signin"
  sign in for admin (strech goal)
*body* 
```
{
"username":"string",   
    "password":"****",   
    "role":"admin"   

}
```

**DELETE**  /:model/:userId/:postId"

enable admin to access any post for any user and delete it   

**GET** /users"   
 admin can check all users(all data from users table 


 

----------------

**POST**   /:model/:postId/neworder"  
make an order   
*body*    
```
{
    "clientId": "num",
    "ownerId":"num",
    postId:"num",
    model:"string"
  }
```  

**GET**  /allorders  

to get all user ordars    

**GET**  /allorders/:postId"     

to get specific post  orders  


**GET**/allorders/:postId/:orderId     
 to get specific order on specific post   

**POST** /allorders/:postId/:orderId/:action    
send a message to owner     



**GET**/myorders/:userId"

enable user to see all  his/her orders


**GET**/myorders/:userId/:orderId   
 
 
enable user to see specific order     

**GET**/myorders/:userId/:orderId/status       

 enable user to check the ordar status    

 
 **GET**  /checkmeet       

 enabele admin to check  if the owner accept the order or not     

 **GET** /myorders/:userId/:orderId/status/date"     



 enable the client to check meeting date 



