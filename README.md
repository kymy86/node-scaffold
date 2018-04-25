# NodeJS backend scaffolding

This project is a scaffold for a NodeJS back-end.

## Docker environment

To run the dockerized version of the environment, you need to set-up the environment variables defined in the **.env-example** file. 
Then, use the command `docker-compose up`.

## Test environment

To run the test-suite use the following command inthe dockerized environment:

`docker exec -it {image-name} npm run test`

## NPM command

- `npm start`: run the compiled version of the backend
- `npm dev`: run the development version of the backend
- `npm build`: build the production version of the backend in the **dist** folder
- `npm test`: run the test-suite.