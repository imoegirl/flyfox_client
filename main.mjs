import "../flyfox/foxcore/foxcore.mjs";
import PackageHandler from "../flyfox/foxlogic/packages/packages_handler.mjs";
import HandleMap from "./src/handle_map.mjs";
import TCPClient from "./src/tcpclient.mjs";

const packageHandler = new PackageHandler();

global.foxLogic = {
  handleMap: HandleMap,
  packageHandler: packageHandler,
};
