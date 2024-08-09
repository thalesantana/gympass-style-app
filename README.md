# GymPass-style application.

## Functional requirements

- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of a logged-in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [ ] It must be possible for the user to obtain his/her check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to check-in to a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## Business rules 

- [ ] The user must not be able to register with a duplicate email;
- [ ] The user cannot check-in twice on the same day; 
- [ ] The user cannot check in if he/she is not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## Non-functional requirements

- [ ] The user's password must be encrypted;
- [ ] The application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);