import { Logger, ILogObjMeta, ISettingsParam, ILogObj } from "tslog";

export class CustomLogger<LogObj> extends Logger<LogObj> {
    constructor(settings?: ISettingsParam<LogObj>, logObj?: LogObj) {
        super(settings, logObj);
    }

    /**
     * Logs a success message.
     * @param args  - Multiple log attributes that should be logged.
     * @return LogObject with meta property, when log level is >= minLevel
     */
    public success(...args: unknown[]): LogObj & ILogObjMeta | undefined {
        return super.log(0, "SUCCESS", ...args);
    }
}

const logger = new CustomLogger<ILogObj>({
    type: 'pretty',
    prettyLogTemplate: "{{logLevelName}}\t{{fileNameWithLine}}\t",
    prettyLogStyles: {
        logLevelName: {
            "*": ["bold", "black", "bgWhiteBright", "dim"],
            SILLY: ["bold", "white"],
            TRACE: ["bold", "whiteBright"],
            DEBUG: ["bold", "green"],
            SUCCESS: ["bold", "greenBright"],
            INFO: ["bold", "blue"],
            WARN: ["bold", "yellow"],
            ERROR: ["bold", "red"],
            FATAL: ["bold", "redBright"],
        },
        filePathWithLine: "dim",
        fileNameWithLine: "dim",
    }
} as ISettingsParam<ILogObj>);

export default logger;
