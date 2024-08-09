docker build -t nginx certbot .

docker run -v $(pwd)/letsencrypt:/etc/letsencrypt --name nginx -ti -p 8080:80 nginx-certbot sh

certbot --nginx -d connect4.matthew.graduate-program.journeyone.com.au