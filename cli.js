import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage"
import { readFile } from "fs/promises";
import prompts from 'prompts';
import gitClone from './util/gitClone.js'

//命令行 -v
const pkg = JSON.parse(
    await readFile(new URL('./package.json', import.meta.url))
);
//配置命令参数
const optionDefinitions = [
    { name: 'version', alias: 'v', type: Boolean },
    { name: 'help', alias: 'h', type: Boolean }
];

//命令行
const helpSections = [
    {
        header: 'create-fs-cli',
        content: '一个快速生成模版项目的脚手架',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'version',
                alias: 'v',
                typeLabel: '{underline boolean}',
                description: '版本号',
            },
            {
                name: 'help',
                alias: 'h',
                typeLabel: '{underline boolean}',
                description: '帮助',
            }
        ],
    },
];
const promptsOptions = [
    {
        type: 'text',
        name: 'name',
        message: '请输入项目名称'
    },
    {
        type: 'select', //单选
        name: 'template',
        message: '请选择一个模板',
        choices: [
            { title: 'react+ts', value: 1 },
            { title: 'vue3+ts', value: 2 }
        ]
    }
];
//远程项目地址
const remoteList = {
    1: 'https://github.com/lijie90/fs-react.git',
    2: 'https://github.com/eternalltruth/fs-vue.git'
};
const getUserInfo = async () => {
    const res = await prompts(promptsOptions);
    if (!res.name || !res.template) return;
    gitClone(`direct:${remoteList[res.template]}`, res.name, { clone: true });
  };
const options = commandLineArgs(optionDefinitions);
const runOptions = () => {
    if (options.version) {
        console.log(`v${pkg.version}`);
        return;
    }
    if (options.help) {
        console.log(commandLineUsage(helpSections));
        return;
    }
    getUserInfo();
};

runOptions();





