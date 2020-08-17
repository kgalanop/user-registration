# UserRegistration

This is a project that implments a user registration flow with dynamic form fields along with setting up routing and adding proper input validation.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:proxy:mock` for a dev server that will also call mocked backend services. A backend server with mocked data will run concurrently in the background.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

Run `npm run e2e:proxy:mock` to execute the end-to-end tests with mocked backend services.

## Docker

A Dockerfile has been created that builds Angular application for production and uses nginx configuration provided on nginx.conf. No mock data is used.

Run `docker build -t user-registration-image .` to build the image.

Run `docker run --name user-registration-container -d -p 8080:80 user-registration-image` to run the application.
Enter http://localhost:8080/ to see the application running.
