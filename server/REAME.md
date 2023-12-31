docker run `
    --name post `
    -e POSTGRES_USER=kevinsilva `
    -e POSTGRES_PASSWORD=senhasecreta34 `
    -e POSTGRES_DB=Ecommerce `
    -p 5432:5432 `
    -d `
    postgres

docker ps

docker exec -it post /bin/bash

docker run `
    --name admin `
    -p 8080:8080 `
    --link post:postgres `
    -d `
    adminer