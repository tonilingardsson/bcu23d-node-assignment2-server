This is the final indivicual assignment for the Node JS course of the program Blockchain Development 2023 I study remotely at Medie Institutet (Sweden).

🎯 OBJECTIVE: create a complete Blockchain for my own cryptocurrency with transaction management and validation.
A reward system must be created for the transactions when a block is created and tracked in the transaction pool.
The transaction must be validated so that they follow the rules followed during the Node JS course.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

📝 Requirements for Passed (G):

🌐 NETWORK

1. [x] It should be possible to **start up several nodes** with the blockchain.
       **Synchronization** of the blockchain takes place **when**:
2. [x] **Starting a new node**,
3. [x] **Adding transactions**,
4. [x] A **block is created**.
5. [x] The technology for network communication must be either Redis, **Pubnub** or Websockets.
6. [] The block chain, blocks and transactions must be saved in a **mongodb** database.

🛡 SECURITY 7. [x] To be able to use a blockchain as a consumer, you must be registered and logged in. Here you must use **Json Web Token (JWT)** as technology to validate that a user is logged in and belongs to the correct role to be able to create a new transaction and to be able to list their own transactions and blocks. 8. [] Users should be stored in a **mongodb document**.

📱 CLIENT 9. [x] A **client** must be developed in either **React with Vite** or a purely JavaScript application with HTML and CSS.
The client application must be able to: 10. [] **Create new transactions**, 11. [] **List transactions**, and 12. [] **List blocks**. 13. [] In addition, it must be possible to **create a block of transactions**, i.e. "**mine**" of blocks.

🎖 Requirements for Passed with Distinction (VG) 14. [] TDD must be used for transaction management. 15. [] All "Best practices" that we went through during the course must be used. That is, Clean Code, SOC, MVC. 16. [] In addition, the server must be secure against various types of attacks, for example NoSql injections, DDOS and XSS attempts.
