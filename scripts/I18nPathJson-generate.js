import { dirname, join } from "path";

import * as fs from "fs";

const transferLangs = ["en", "zh-CN"];

const getDirFiles = (path = "") => {
  const basePath = "/pages";
  const readDirFiles = fs.readdirSync(process.cwd() + basePath + path);
  return {
    dirs: readDirFiles.filter((dirName) => !dirName.includes(".")),
    files: readDirFiles
      .filter((dirName) => dirName.includes("."))
      .map((dirName) => path + "/" + dirName),
  };
};

const allPathFilter = (path = "", langPathObj) => {
  let { dirs, files } = getDirFiles(path);

  dirs?.length > 0 &&
    dirs.forEach((dirName) => allPathFilter(`${path}/${dirName}`, langPathObj));

  files?.length > 0 &&
    transferLangs.forEach((lang) => {
      if (!Array.isArray(langPathObj[lang])) langPathObj[lang] = [];
      const filterFiles = files.filter((fileName) =>
        fileName.includes(`.${lang}.`)
      );
      if (filterFiles?.length > 0) langPathObj[lang].push(...filterFiles);
    });
};

(async () => {
  const langPathObj = {};
  allPathFilter("", langPathObj);

  fs.writeFileSync("LangPath.json", JSON.stringify(langPathObj));
})();
