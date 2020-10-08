import "../flyfox/foxcore/foxcore.mjs";
import PackageHandler from "../flyfox/foxlogic/packages/packages_handler.mjs";
import HandleMap from "./src/handle_map.mjs";
import TCPClient from "./src/tcpclient.mjs";
import Packages from "../flyfox/foxlogic/packages/packages.mjs";

const host = "127.0.0.1";
const port = 9999;

const packageHandler = new PackageHandler();
const tcpClient = new TCPClient(host, port);

global.foxLogic = {
  handleMap: HandleMap,
  packageHandler: packageHandler,
  tcpClient: tcpClient,
};

const strAddr4G = "000000000012";

tcpClient.connectToServer(
  () => {
    global.logger.info("连接成功回调");
    let onlineMsg = new Packages.SCOnline(strAddr4G);
    let bytes = onlineMsg.FinishPackage();
    // global.logger.info(bytes);
    tcpClient.Send(bytes);

    setInterval(() => {
      let heartbeat = new Packages.SCHeartBeat(strAddr4G);
      let bytes = heartbeat.FinishPackage();
      tcpClient.Send(bytes);
    }, 2000);
  },
  (data) => {
    global.logger.info("收到数据回调: ", data);
  }
);
