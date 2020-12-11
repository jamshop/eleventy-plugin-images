const sharp = require("sharp");
const path = require("path");
const fs = require("fs-extra");
const memoize = require("fast-memoize");

const imageFormats = [".jpeg", ".jpg", ".png", ".webp", ".gif", ".tiff"];

const getImageFilename = memoize((output, { filepath, w, h, gravity }) => {
  const ext = path.extname(filepath);
  const filename = path.basename(filepath, ext);
  let filenameString = filename;
  if (w) filenameString += `-${w}`;
  if (h) filenameString += `-${h}`;
  if (gravity && gravity !== "center") filenameString += `-${gravity}`;
  filenameString += ext;
  return path.join(output, filenameString);
});

const resizeImage = (inputPath, outputPath, { w, h, gravity = "center" }) => {
  return sharp(inputPath)
    .resize(w, h, {
      position: sharp.gravity[gravity],
    })
    .toFile(outputPath, (err, info) => {
      console.log({ err, info });
    });
};

const getImageURL = (options, shortcodeOptions) => {
  // Throw if not correct extension
  if (!imageFormats.includes(path.extname(shortcodeOptions.filepath)))
    throw new Error("Incorrect file type for image shortcode");

  fs.ensureDir(options.output);
  const outputPath = getImageFilename(options.output, shortcodeOptions);
  resizeImage(
    path.join(options.input, shortcodeOptions.filepath),
    outputPath,
    shortcodeOptions
  );
  return `/${path.relative(options.siteRoot, outputPath)}`;
};

module.exports = (eleventyConfig, options) => {
  eleventyConfig.addShortcode("image", (filepath, alt, w, h, gravity) => {
    const imageURL = getImageURL(options, { filepath, w, h, gravity });
    return `<img src="${imageURL}" alt="${alt}" />`;
  });

  eleventyConfig.addShortcode("imageURL", (filepath, w, h, gravity) => {
    return getImageURL(options, { filepath, w, h, gravity });
  });
};
