# KMS

A simple key management system to store user encrypted key.

### Tech Stack
- Node JS
- React JS
- MongoDb (Mongo Atlas)

### Quick Start
- open two terminals
- First Terminal:
    
        cd server
        npm install
        npm run server
      
- Second terminal
    
        cd client
        npm install
        npm run start
        
### API

Note: Hit **login** API to get **jwt-token** and change **x-access-token** with
it in before making other requests. 

1. registerUser: 

        curl --location --request POST 'http://localhost:5000/api/register' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "email": "admin@gmail.com",
            "pass": "pass"
        }'
        
2. login: It returns jwt token

        curl --location --request POST 'http://localhost:5000/api/login' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "email": "admin@gmail.com",
            "pass": "pass"
        }'
        
3. createWallet: 

        curl --location --request POST 'http://localhost:5000/api/create' \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmRlZGE0MjNkM2JmMWE5YmE0ODBjYiIsImlhdCI6MTYxMzcyMzg4NiwiZXhwIjoxNjEzODEwMjg2fQ.0ZTR4uy3ZS3effPJOPBZbA5EW3RSl4mOKMA3alDqR6o' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "userEmail": "admin@gmail.com",
            "secret": "passwermekdenfeokferbeijdwokd",
            "walletPass":"qwertyuiop"
        }'
        
4. getAccounts:

        curl --location --request POST 'http://localhost:5000/api/accounts' \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmY3OTU3YzJjOGNmNDJkMjFjMzllZCIsImlhdCI6MTYxMzcyNDAwNSwiZXhwIjoxNjEzODEwNDA1fQ.jtPH12UHBWTbTPgR8sKYGotUcKBs8qhh92EX0IDkWeQ' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "email":"admin@gmail.com",
            "walletPass":"qwertyuiop"
        }'
        
5. sign:

        curl --location --request POST 'http://localhost:5000/api/sign' \
        --header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmY3OTU3YzJjOGNmNDJkMjFjMzllZCIsImlhdCI6MTYxMzcyNDAwNSwiZXhwIjoxNjEzODEwNDA1fQ.jtPH12UHBWTbTPgR8sKYGotUcKBs8qhh92EX0IDkWeQ' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "account":"c2dc59ecf9ad06122d7e53b9e5ef27af29dd0bc4a0a97a955534508ffe6767eb",
            "paramsHash":"hjkhdbkjdkllbhknvjljhvknkjbl"
        }'

        