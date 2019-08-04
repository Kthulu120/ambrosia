// @flow
import slash from './slash'

const fs = require('fs')
const sha1 = require('./sha1');

export default class FileSystem {

  static getFileExtension(filename: string)
  {
    const ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
  }

  static getFilesizeInBytes(filename: string) {
    const stats = fs.statSync(filename);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes;
  }

  static removeFileExtension(fileName: string){
    return fileName.replace(/\.[^/.]+$/, "")
  }

  static isDirectory(pathname: string){
    return fs.lstatSync(pathname).isDirectory()
  }

  static isFile(pathname: string){
    return fs.lstatSync(pathname).isFile()
  }

  // Reads file from folder non-recursively
  static readFilesFromFolder(pathname: string, file_extensions: Array<string> = ["exe"]){
    const files = []
    if(!fs.lstatSync(pathname).isDirectory()){
      return null
    }
    fs.readdirSync(pathname).forEach(filename => {
      const fileExt = FileSystem.getFileExtension(filename)
      const full_path = `${folder.replace(/\\/g, '/')  }/${  filename}`
      const isFile = fs.lstatSync(filename).isFile()
      if (file_extensions instanceof string){
        file_extensions = [file_extensions]
      }
      if(file_extensions && file_extensions.includes(fileExt)){
        files.push(full_path)
      }
      if(file_extensions === undefined){
        files.push(full_path)
      }
    })
    return files
  }

  /**
   * Gets all files recursively in folder and returns them
   * @param path: String
   * @param file_extensions: array<string>
   * @param options: Object
   *  - folderFilter: string - filter for name of internal folder
   */
  static getAllFilesSync(path: string, options: Object = {folderFilter: '', fileExtensions: ["exe", "dmg"], withSha: false}) {
    const files = []
    const fileExtensions = options.fileExtensions || ["exe", "dmg"]
    if(!fs.lstatSync(path).isDirectory()){
      return null
    }
    const isDirectory = source => fs.lstatSync(source).isDirectory() && (!source.includes(options.folderFilter))
    const getDirectories = source => fs.readdirSync(source).map(name => slash([source,name].join('/'))).filter(isDirectory)

    const directories = getDirectories(path)
    directories.push(path)
    directories.forEach((folder) => {
      fs.readdirSync(folder).forEach(filename => {
        const fileExt = FileSystem.getFileExtension(filename)
        const fullPath = `${folder.replace(/\\/g, '/')}/${filename}`
        if( fileExtensions.includes(fileExt) || !fileExtensions && fs.lstatSync(fullPath).isFile()) {
          const fSize = FileSystem.getFilesizeInBytes(fullPath)
          const file = {
            size: fSize,
            path: fullPath,
            folder,
            fileName: filename,
            name: FileSystem.removeFileExtension(filename),
            sha256: null
          }
          if(options.withSha){
            file.sha256 = sha1(fs.readFileSync(fullPath))
          }
          files.push(file)
        }
      });
    })

    return files
  }

  static async getFiles(dir) {
    const { promisify } = require('util');
    const { resolve } = require('path');
    const readdir = promisify(fs.readdir);
    const stat = promisify(fs.stat);
    const subdirs = await readdir(dir);
    const files = await Promise.all(subdirs.map(async (subdir) => {
      const res = resolve(dir, subdir);
      return (await stat(res)).isDirectory() ? this.getFiles(res) : slash(res);
    }));
    return files.reduce((a, f) => a.concat(f), []);
  }
}
