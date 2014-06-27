authorized_sockets
==================

authorized_sockets

In file public/main.js you can see how you have to configure socket.io on UI. I have used client parameter "token". If you want you can add more parameters in query.
For example 

var socket = io('http://localhost', {
  query:      "token=321321321321321321&sessionId=123456&name=maksym",
  transports: ['websocket']
});

As I have heard you are supporting only new browsers such like Chrome, FireFox, etc. So I have set transport parameter in "socket" and it would be only socket.



A few words abous server side.

I`ve created two socket servers. First will be only for connect between php and node.
Second will be for UI clients and it has authorization. If user is not logined he will not be able to connect. 
In another case he will get name of organization which he has to listen.

Also I recomend use socket event on('disconnect') because as usually socket is trying to reconect and if we have some 
logic which add listeners in connect socket event we will have to be worry about unbind these events on "disconnect".
