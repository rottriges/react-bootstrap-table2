/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */
import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

const path = require("path");

const sourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2/index.js"
);
const paginationSourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-paginator/index.js"
);
const overlaySourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-overlay/index.js"
);
const filterSourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-filter/index.js"
);
const editorSourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-editor/index.js"
);
const sourceStylePath = path.join(
  __dirname,
  "../../react-bootstrap-table2/style"
);
const paginationStylePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-paginator/style"
);
const filterStylePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-filter/style"
);
const toolkitSourcePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-toolkit/index.js"
);
const toolkitStylePath = path.join(
  __dirname,
  "../../react-bootstrap-table2-toolkit/style"
);
const storyPath = path.join(__dirname, "../stories");
const examplesPath = path.join(__dirname, "../examples");
const srcPath = path.join(__dirname, "../src");
const aliasPath = {
  examples: examplesPath,
  stories: storyPath,
  src: srcPath,
  components: path.join(srcPath, "components"),
  utils: path.join(srcPath, "utils"),

  "react-bootstrap-table-next": sourcePath,
  "react-bootstrap-table2-editor": editorSourcePath,
  "react-bootstrap-table2-filter": filterSourcePath,
  "react-bootstrap-table2-overlay": overlaySourcePath,
  "react-bootstrap-table2-paginator": paginationSourcePath,
  "react-bootstrap-table2-toolkit": toolkitSourcePath,
};

const loaders = [
  {
    enforce: "pre",
    test: /\.js?$/,
    exclude: /node_modules/,
    include: [examplesPath, storyPath],
    loader: "eslint-loader",
  },
  {
    test: /\.js?$/,
    use: ["babel-loader"],
    exclude: /node_modules/,
  },
  {
    test: /\.css$/,
    use: ["style-loader", "css-loader"],
  },
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
    include: [
      storyPath,
      sourceStylePath,
      paginationStylePath,
      filterStylePath,
      toolkitStylePath,
    ],
  },
  {
    test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
    loader: "url-loader?limit=100000",
  },
];
function loadStories() {
  require('stories');
}

const styles = {
  margin: '15px',
};

const componentDecorator = (story) => (
  <div style={styles}>
    { story() }
  </div>
);


// prepend the story name to log messages
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addDecorator(componentDecorator);

configure(loadStories, module);

module.exports = {
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-console",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // loaders
    loaders.forEach((value) => {
      config.module.rules.push(value);
    });
    // alias
    config.resolve.alias = aliasPath;

    // Return the altered config
    return config;
  },
};
