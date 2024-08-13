# GymPass-style application.

## Functional requirements

- [x] It must be possible to register;
- [x] It must be possible to authenticate;
- [x] It must be possible to obtain the profile of a logged-in user;
- [x] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [x] It must be possible for the user to obtain his/her check-in history;
- [x] It must be possible for the user to search for nearby gyms (10km);
- [x] It must be possible for the user to search for gyms by name;
- [x] It must be possible for the user to check-in to a gym;
- [x] It must be possible to validate a user's check-in;
- [x] It must be possible to register a gym;

## Business rules 

- [x] The user must not be able to register with a duplicate email;
- [x] The user cannot check-in twice on the same day; 
- [x] The user cannot check in if he/she is not close (100m) to the gym;
- [x] Check-in can only be validated up to 20 minutes after being created;
- [x] Check-in can only be validated by administrators;
- [x] The gym can only be registered by administrators;

## Non-functional requirements

- [x] The user's password must be encrypted;
- [x] The application data must be persisted in a PostgreSQL database;
- [x] All data lists must be paginated with 20 items per page;
- [x] The user must be identified by a JWT (JSON Web Token);