import { getThisCodebaseRootDirPath } from "../tools/getThisCodebaseRootDirPath.overridable";
import { join as pathJoin } from "path";

export const cacheDirPath = pathJoin(getThisCodebaseRootDirPath(), "node_modules", ".cache", "scripts");
