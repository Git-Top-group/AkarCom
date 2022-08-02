***signup***
{

    "username":"admin",
    "password":"123",
    "role":"admin"

}
***update user***
{
    "username": "admin",
    "role": "admin",
    "firstName": "mmmm",
    "lastName": "bbbb",
    "phoneNumber": "07",
    "email": "hotmail",
    "city": "Irbid"
}
***Houses***
{

    "process":"Rent",
    "price": 250 ,
    "surfaceArea": 212,
    "landArea": 455,
    "floors":2,
        "availability"  :true,
        "furnished":true,
    "address":"somewhere",
    "moreInfo":"anything"

}

***for testing houses filtration ***
{

    "process": "Rent",
    "owner": "Owner",
    "price": 250,
    "surfaceArea": 212,
    "landArea": 455,
    "floors": 2,
    "buildingAge": "0-11 months",
    "rooms": "Studio",
    "bathRooms": "1-Bedroom",
    "availability": true,
    "furnished": true,
    "rentDuration": "Weekly",
    "city": "Amman",
    "address": "somewhere",
    "moreInfo": "anything",

  }

***Apartment***
{

    "process":"Rent",
    "price": 250 ,
    "area": 212.5,
    "floors":2,
        "availability"  :true,
        "elevator":true,
        "furnished":true,
    "address":"somewhere",
    "moreInfo":"anything"

}

***Chalets***
{

    "process":"Rent",
    "price": 250 ,
    "surfaceArea": 212.5,
    "landArea": 212.5,
    "floors":2,
        "availability"  :true,
        "furnished":true,
    "address":"somewhere",
    "moreInfo":"anything"

}

***Lands***
{
    "process":"Rent",
    "price": 250 ,
    "area": 212.5,
    "availability"  :true,
    "address":"somewhere",
    "moreInfo":"anything"
}

***Villas***
{

    "process":"Rent",
    "price": 250 ,
    "surfaceArea": 212.5,
        "landArea": 212.5,
        "floors":2,
        "availability"  :true,
        "furnished":true,
    "address":"somewhere",
    "moreInfo":"anything"

}

***Warehouses***
{

    "process":"Rent",
    "price": 250 ,
    "area": 212.5,
        "floors":2,
        "availability"  :true,
    "address":"somewhere",
    "moreInfo":"anything"

}

http://localhost:3000/userId/houses     method `GET` :  done 

http://localhost:3000/userId/newpost/category   method `POST` : done

http://localhost:3000/userId/dashboard  method `PUT` : todo

http://localhost:3000/userId/dashboard   method `DELETE` : todo

to get all data
http://localhost:3000/allData  method `GET` : todo

to get all data for specific user (dashboard)

http://localhost:3000/userId/dashboard/ method `GET` : todo

http://localhost:3000/:model/:process/:city/:owner/:availability/:buildingAge/:furnished/:rooms/:bathRooms/:rentDuration/:floors  
http://localhost:4000/lands/Rent/Amman/all/all/all/all/all/all/all/all/all/all 
method `GET` : done except price and area


 http://localhost:4000/user/messages/send/2/okay to accept a message from admin by owner




/newpost/:userId/:model

/:model/:postId/neworder

/allorders/:postId/:orderId/:action