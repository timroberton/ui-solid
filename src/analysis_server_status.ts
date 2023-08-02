import { createSignal } from "solid-js";

// const _HOST_CONTROL_PLANE = "https://control-plane.timroberton.com";
const _HOST_CONTROL_PLANE = "http://localhost:3002";
const _KEY_FOR_SERVER_STATUS = "SERVER_STATUS";

function getUrlForServerIP(path: string, ip: string): string {
  const _BASE_URL =
    ip.trim() === "a"
      ? "http://0.0.0.0:9001/api"
      : "https://timroberton-aws-proxy.deno.dev/api";
  const _SUFFIX = ip.trim() === "a" ? "" : `?IP=${ip.trim()}`;
  return `${_BASE_URL}${path}${_SUFFIX}`;
}

type ServerType = "hsmodel" | "readiness";

type AnalysisServerStatus =
  | AnalysisServerStatusNotYetStarted
  | AnalysisServerStatusTryingToStart
  | AnalysisServerStatusPending
  | AnalysisServerStatusRunning
  | AnalysisServerStatusCheckingIfAlive
  | AnalysisServerStatusError;

type AnalysisServerStatusNotYetStarted = {
  status: "not_yet_started";
};
type AnalysisServerStatusTryingToStart = {
  status: "trying_to_start";
};
type AnalysisServerStatusPending = {
  status: "pending";
  taskArn: string;
};
type AnalysisServerStatusRunning = {
  status: "running";
  taskArn: string;
  ip: string;
};
type AnalysisServerStatusCheckingIfAlive = {
  status: "checking_if_alive";
  taskArn: string;
  ip: string;
};
type AnalysisServerStatusError = {
  status: "error";
  msg: string;
};

const [analysisServerStatus, setAnalysisServerStatus] =
  createSignal<AnalysisServerStatus>({
    status: "not_yet_started",
  });

async function initAnalysisServer(serverType: ServerType) {
  console.log("RUNNING initialization script");
  const localStorageData = window.localStorage.getItem(_KEY_FOR_SERVER_STATUS);
  if (localStorageData === null) {
    changeServerStatus({ status: "not_yet_started" });
    launchServer(serverType);
    return;
  }
  const lsAss = JSON.parse(localStorageData) as AnalysisServerStatus;
  setAnalysisServerStatus(lsAss);
  if (
    lsAss.status === "not_yet_started" ||
    lsAss.status === "trying_to_start"
  ) {
    launchServer(serverType);
    return;
  }
  if (lsAss.status === "pending") {
    waitForServerToStartRunning(lsAss.taskArn);
    return;
  }
  if (lsAss.status === "running" || lsAss.status === "checking_if_alive") {
    changeServerStatus({
      status: "checking_if_alive",
      taskArn: lsAss.taskArn,
      ip: lsAss.ip,
    });
    const isAlive = await checkIfServerIsAlive(lsAss.ip);
    if (isAlive) {
      changeServerStatus({
        status: "running",
        taskArn: lsAss.taskArn,
        ip: lsAss.ip,
      });
      return;
    } else {
      launchServer(serverType);
      return;
    }
  }
  if (lsAss.status === "error") {
    launchServer(serverType);
    return;
  }
}

function changeServerStatus(ass: AnalysisServerStatus) {
  setAnalysisServerStatus(ass);
  window.localStorage.setItem(_KEY_FOR_SERVER_STATUS, JSON.stringify(ass));
}

async function checkIfServerIsAlive(ip: string): Promise<boolean> {
  console.log("RUNNING checkIfServerIsAlive");
  try {
    const controller = new AbortController();
    const _timeoutId = setTimeout(() => controller.abort(), 2000);
    const url = getUrlForServerIP("/is_alive", ip);
    const res = await fetch(url, { signal: controller.signal });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function launchServer(serverType: ServerType) {
  console.log("RUNNING launchServer");
  try {
    changeServerStatus({ status: "trying_to_start" });
    const res = await fetch(
      `${_HOST_CONTROL_PLANE}/api/run-task?RUN_ACTION=${serverType}&SERVER_ID=xyz`
    );
    if (res.status !== 200) {
      changeServerStatus({
        status: "error",
        msg: "Could not connect to control plane",
      });
      return;
    }
    const resBody = (await res.json()) as { data: { taskArns: string[] } };
    const taskArn = resBody.data.taskArns[0];
    if (!taskArn) {
      changeServerStatus({
        status: "error",
        msg: "No task arn",
      });
      return;
    }
    changeServerStatus({ status: "pending", taskArn });
    waitForServerToStartRunning(taskArn);
  } catch {
    changeServerStatus({
      status: "error",
      msg: "Error trying to launch",
    });
  }
}

async function waitForServerToStartRunning(taskArn: string) {
  console.log("RUNNING waitForServerToStartRunning");
  try {
    let status = "";
    let ip = "";
    let hasAlreadyRunOnce = false;
    do {
      if (hasAlreadyRunOnce) {
        await new Promise((r) => setTimeout(r, 3000));
      }
      hasAlreadyRunOnce = true;
      const res = await fetch(
        `${_HOST_CONTROL_PLANE}/api/get-task?TASK_ARN=${taskArn}`
      );
      if (res.status !== 200) {
        changeServerStatus({
          status: "error",
          msg: "Could not connect to control plane",
        });
        return;
      }
      const resBody = (await res.json()) as {
        data: { lastStatus: string; publicIp: string }[];
      };
      status = resBody.data[0].lastStatus;
      ip = resBody.data[0].publicIp;
    } while (status == "PROVISIONING" || status === "PENDING");
    if (status === "RUNNING") {
      changeServerStatus({ status: "running", taskArn, ip });
    } else {
      changeServerStatus({
        status: "error",
        msg: "Weird status from get-task",
      });
    }
  } catch (err) {
    changeServerStatus({
      status: "error",
      msg: "Error trying to wait for server to start running",
    });
  }
}

export { initAnalysisServer, analysisServerStatus, getUrlForServerIP };
