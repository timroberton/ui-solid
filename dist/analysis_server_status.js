import { __awaiter, __generator } from "tslib";
import { createSignal } from "solid-js";
// const _HOST_CONTROL_PLANE = "https://control-plane.timroberton.com";
var _HOST_CONTROL_PLANE = "http://localhost:3002";
var _KEY_FOR_SERVER_STATUS = "SERVER_STATUS";
function getUrlForServerIP(path, ip) {
    var _BASE_URL = ip.trim() === "a"
        ? "http://0.0.0.0:9001/api"
        : "https://timroberton-aws-proxy.deno.dev/api";
    var _SUFFIX = ip.trim() === "a" ? "" : "?IP=".concat(ip.trim());
    return "".concat(_BASE_URL).concat(path).concat(_SUFFIX);
}
var _a = createSignal({
    status: "not_yet_started",
}), analysisServerStatus = _a[0], setAnalysisServerStatus = _a[1];
function initAnalysisServer(serverType) {
    return __awaiter(this, void 0, void 0, function () {
        var localStorageData, lsAss, isAlive;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("RUNNING initialization script");
                    localStorageData = window.localStorage.getItem(_KEY_FOR_SERVER_STATUS);
                    if (localStorageData === null) {
                        changeServerStatus({ status: "not_yet_started" });
                        launchServer(serverType);
                        return [2 /*return*/];
                    }
                    lsAss = JSON.parse(localStorageData);
                    setAnalysisServerStatus(lsAss);
                    if (lsAss.status === "not_yet_started" ||
                        lsAss.status === "trying_to_start") {
                        launchServer(serverType);
                        return [2 /*return*/];
                    }
                    if (lsAss.status === "pending") {
                        waitForServerToStartRunning(lsAss.taskArn);
                        return [2 /*return*/];
                    }
                    if (!(lsAss.status === "running" || lsAss.status === "checking_if_alive")) return [3 /*break*/, 2];
                    changeServerStatus({
                        status: "checking_if_alive",
                        taskArn: lsAss.taskArn,
                        ip: lsAss.ip,
                    });
                    return [4 /*yield*/, checkIfServerIsAlive(lsAss.ip)];
                case 1:
                    isAlive = _a.sent();
                    if (isAlive) {
                        changeServerStatus({
                            status: "running",
                            taskArn: lsAss.taskArn,
                            ip: lsAss.ip,
                        });
                        return [2 /*return*/];
                    }
                    else {
                        launchServer(serverType);
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    if (lsAss.status === "error") {
                        launchServer(serverType);
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function changeServerStatus(ass) {
    setAnalysisServerStatus(ass);
    window.localStorage.setItem(_KEY_FOR_SERVER_STATUS, JSON.stringify(ass));
}
function checkIfServerIsAlive(ip) {
    return __awaiter(this, void 0, void 0, function () {
        var controller_1, _timeoutId, url, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("RUNNING checkIfServerIsAlive");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    controller_1 = new AbortController();
                    _timeoutId = setTimeout(function () { return controller_1.abort(); }, 2000);
                    url = getUrlForServerIP("/is_alive", ip);
                    return [4 /*yield*/, fetch(url, { signal: controller_1.signal })];
                case 2:
                    res = _b.sent();
                    return [2 /*return*/, res.status === 200];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function launchServer(serverType) {
    return __awaiter(this, void 0, void 0, function () {
        var res, resBody, taskArn, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("RUNNING launchServer");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    changeServerStatus({ status: "trying_to_start" });
                    return [4 /*yield*/, fetch("".concat(_HOST_CONTROL_PLANE, "/api/run-task?RUN_ACTION=").concat(serverType, "&SERVER_ID=xyz"))];
                case 2:
                    res = _b.sent();
                    if (res.status !== 200) {
                        changeServerStatus({
                            status: "error",
                            msg: "Could not connect to control plane",
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 3:
                    resBody = (_b.sent());
                    taskArn = resBody.data.taskArns[0];
                    if (!taskArn) {
                        changeServerStatus({
                            status: "error",
                            msg: "No task arn",
                        });
                        return [2 /*return*/];
                    }
                    changeServerStatus({ status: "pending", taskArn: taskArn });
                    waitForServerToStartRunning(taskArn);
                    return [3 /*break*/, 5];
                case 4:
                    _a = _b.sent();
                    changeServerStatus({
                        status: "error",
                        msg: "Error trying to launch",
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function waitForServerToStartRunning(taskArn) {
    return __awaiter(this, void 0, void 0, function () {
        var status_1, ip, hasAlreadyRunOnce, res, resBody, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("RUNNING waitForServerToStartRunning");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    status_1 = "";
                    ip = "";
                    hasAlreadyRunOnce = false;
                    _a.label = 2;
                case 2:
                    if (!hasAlreadyRunOnce) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 3000); })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    hasAlreadyRunOnce = true;
                    return [4 /*yield*/, fetch("".concat(_HOST_CONTROL_PLANE, "/api/get-task?TASK_ARN=").concat(taskArn))];
                case 5:
                    res = _a.sent();
                    if (res.status !== 200) {
                        changeServerStatus({
                            status: "error",
                            msg: "Could not connect to control plane",
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, res.json()];
                case 6:
                    resBody = (_a.sent());
                    status_1 = resBody.data[0].lastStatus;
                    ip = resBody.data[0].publicIp;
                    _a.label = 7;
                case 7:
                    if (status_1 == "PROVISIONING" || status_1 === "PENDING") return [3 /*break*/, 2];
                    _a.label = 8;
                case 8:
                    if (status_1 === "RUNNING") {
                        changeServerStatus({ status: "running", taskArn: taskArn, ip: ip });
                    }
                    else {
                        changeServerStatus({
                            status: "error",
                            msg: "Weird status from get-task",
                        });
                    }
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    changeServerStatus({
                        status: "error",
                        msg: "Error trying to wait for server to start running",
                    });
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
export { initAnalysisServer, analysisServerStatus, getUrlForServerIP };
//# sourceMappingURL=analysis_server_status.js.map