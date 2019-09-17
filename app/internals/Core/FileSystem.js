// @flow
import slash from './slash'

const fs = require('fs')
const sha1 = require('./sha1');
const path = require('path')
const os = require('os')


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

  static getHomeDir(): string{
    return os.homedir()
  }

  static getOperatingSys(): string {
    return os.platform()
  }

  static isWindowsOS(): string {
    return os.platform() === 'win32'
  }

  static getFilename(fullPath){
    return fullPath.replace(/^.*[\\\/]/, '')
  }

  static getDirname(fullPath){
   return  path.dirname(slash(fullPath))
  }

  static removeFileExtension(fileName: string){
    return slash(fileName).replace(/\.[^/.]+$/, "")
  }

  static isDirectory(pathname: string){
    return fs.lstatSync(pathname).isDirectory()
  }

  static pathExists(pathname: String){
    return fs.existsSync(slash(pathname))
  }

  static isFile(pathname: string){
    return fs.lstatSync(slash(pathname)).isFile()
  }

  // Reads file from folder non-recursively
  static readFilesFromFolder(pathname: string, file_extensions: Array<string> = ["exe"]){
    const files = []
    if(!fs.lstatSync(slash(pathname)).isDirectory()){
      return null
    }
    fs.readdirSync(slash(pathname)).forEach(filename => {
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

  static checkFileInfo (file_path: string, file_extensions: Array<string> = ["dmg", "exe", "iso"], withSha: boolean = false){
    const fileExt = FileSystem.getFileExtension(file_path)
    //console.log(file_path)
    if( file_extensions.includes(fileExt) && fs.lstatSync(file_path).isFile()) {
      console.log(file_path)
      const filename = FileSystem.getFilename(file_path)
      const fSize = FileSystem.getFilesizeInBytes(file_path)
      const file = {
        size: fSize,
        path: file_path,
        folder: FileSystem.getDirname(file_path),
        fileName: filename,
        name: FileSystem.removeFileExtension(filename),
        sha256:  null
      }
      if(withSha){
        file.sha256 = sha1(fs.readFileSync(file_path))
      }
      return file
    }
    return null
  }

  static walkDir(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
      let dirPath = path.join(dir, f);
      let isDirectory = fs.statSync(dirPath).isDirectory();
      isDirectory ?
        this.walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
  };

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
        console.log(fullPath)
        if( fileExtensions.includes(fileExt) && fs.lstatSync(fullPath).isFile()) {
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
