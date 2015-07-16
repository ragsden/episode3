FROM shipimg/appbase:latest

ADD . /home/shippable/api
RUN mkdir -p /home/shippable/api/logs

RUN cd /home/shippable/api && npm install

ENTRYPOINT ["/home/shippable/api/boot_api.sh"]
EXPOSE 5000
