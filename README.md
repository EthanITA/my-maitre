# My Maitre

The application is a web application that allows you to manage your restaurant. It allows you to manage your reservations, your customers, your tables and your waiters.

## Technologies

The project employs the following technologies:
### FE
- [Vue.js](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite](https://flowbite.com/)
### BE
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [Gunicorn](https://gunicorn.org/)
- [PostgreSQL](https://www.postgresql.org/)
### CI/CD and Hosting
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx](https://www.nginx.com/)
- [Buddy](https://buddy.works/)
- [Digital Ocean](https://www.digitalocean.com/)

## Installation

### Requirements
Configure the my-maitre/.env file:
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_DB

Configure my-maitre/fe/.env file:
- VITE_API_URL (ie. http://localhost:5000/api)

Configure my-maitre/be/.env file:
- DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}

### Run
```bash
# start the project
docker-compose up --build -d
# stop the project
docker-compose down
```