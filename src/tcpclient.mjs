import net from "net";

class TCPClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;
  }

  connectToServer(connectedCallback, dataCallback) {
    this.socket = net.createConnection(this.port, this.host);
    this.socket.on("connect", () => {
      global.netLogger.info("连接服务器成功");
      connectedCallback();
    });

    this.socket.on("data", (data) => {
      global.netLogger.info("收到数据: ", data);
      dataCallback(data);
    });

    this.socket.on("close", (data) => {
      global.netLogger.info("链接断开: ", data);
    });

    this.socket.on("error", () => {
      global.netLogger.error("连接出错");
    });
  }

  Send(data) {
    global.netLogger.info("发送数据: ", data);
    this.socket.write(data);
  }
}

export default TCPClient;
