declare function getUrlForServerIP(path: string, ip: string): string;
type AnalysisServerStatus = AnalysisServerStatusNotYetStarted | AnalysisServerStatusTryingToStart | AnalysisServerStatusPending | AnalysisServerStatusRunning | AnalysisServerStatusCheckingIfAlive | AnalysisServerStatusError;
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
declare const analysisServerStatus: import("solid-js").Accessor<AnalysisServerStatus>;
declare function initAnalysisServer(): Promise<void>;
export { initAnalysisServer, analysisServerStatus, getUrlForServerIP };
//# sourceMappingURL=analysis_server_status.d.ts.map