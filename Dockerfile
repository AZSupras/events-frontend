FROM nginx
MAINTAINER Mike DeVita <mike@relative.media>

COPY dist/ /usr/share/nginx/html

CMD 'nginx'

# Expose ports.
EXPOSE 80
EXPOSE 443
