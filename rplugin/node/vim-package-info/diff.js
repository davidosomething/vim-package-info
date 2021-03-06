var semverUtils = require("semver-utils");

function colorizeDiff(current, latest, hl) {
  if (current[0] === "^" || current[0] === "~") current = current.substr(1);

  let c = semverUtils.parse(current);
  const l = semverUtils.parse(latest);

  if (!l) return false;
  if (!c) c = l;

  let cd = [[l.major, hl], [l.minor, hl], [l.patch, hl]];
  if (parseInt(l.major) > parseInt(c.major)) {
    cd = [
      [l.major, "VimPackageJsonMajor"],
      [l.minor, "VimPackageJsonMajor"],
      [l.patch, "VimPackageJsonMajor"]
    ];
  } else if (parseInt(l.minor) > parseInt(c.minor)) {
    cd = [
      [l.major, hl],
      [l.minor, "VimPackageJsonMinor"],
      [l.patch, "VimPackageJsonMinor"]
    ];
  } else if (parseInt(l.patch) > parseInt(c.patch)) {
    cd = [[l.major, hl], [l.minor, hl], [l.patch, "VimPackageJsonPatch"]];
  }
  return cd;
}

module.exports = { colorizeDiff };
