const path = require("path");
const debug = require("debug")("build:backpack");

const dir = process.env.DIR;

if (!dir) throw new Error("Define directory to build with the -d option.");
debug(
  `> Building ${dir}, entry: ${dir}/index.ts, output: build-${dir}/main.js`
);

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = [`./${dir}/index.ts`];

    config.resolve.extensions.push(".ts");

    config.module.rules.push({
      test: /\.ts$/,
      loader: "ts-loader"
    });

    config.output.path = path.join(process.cwd(), `lib`);

    if (process.env.NODE_ENV !== "production") {
      config.plugins.push(
        new webpack.WatchIgnorePlugin([
          path.resolve(__dirname, "./src"),
          path.resolve(__dirname, "./build")
        ])
      );
    }

    // config.resolve.modules.push(nodePath);
    return config;
  }
};
