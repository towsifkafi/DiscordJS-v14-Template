import { gray } from "ansis";
import { table, TableUserConfig } from 'table';

const baseConfig = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

const coloredBorder = Object.fromEntries(
    Object.entries(baseConfig.border)
        .map(([key, value]) => [key, gray(value)])
) as typeof baseConfig.border;

const config = {
    ...baseConfig,
    border: coloredBorder
};

const newtable = (data: Array<string[]>, options?: TableUserConfig) => {
    return table(data, { ...config, ...options });
}

export default newtable;