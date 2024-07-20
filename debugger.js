require('dotenv').config;
const os = require('os');
const path = require('path');
const { Connection, PublicKey } = require('@_koii/web3.js');

class Debugger {
  /*
  Create .env file with following variables or direclty input values to be used in live-debugging mode.
  */
  static taskID =
    process.env.TASK_ID || 'AK2P1L8NWGwWarbHeM7tX2mr4hJA7ZVXGSSSz5PWHBHv';
  static webpackedFilePath = process.env.WEBPACKED_FILE_PATH || 'dist/main.js';
  static keywords = process.env.TEST_KEYWORDS || [''];
  static nodeDir = process.env.NODE_DIR || '';

  static async getConfig() {
    Debugger.nodeDir = await this.getNodeDirectory();

    let destinationPath =
      'executables/' + (await this.gettask_audit_program()) + '.js';
    let logPath = 'namespace/' + Debugger.taskID + '/task.log';

    console.log('Debugger.nodeDir', Debugger.nodeDir);

    return {
      webpackedFilePath: Debugger.webpackedFilePath,
      destinationPath: destinationPath,
      keywords: Debugger.keywords,
      logPath: logPath,
      nodeDir: Debugger.nodeDir,
      taskID: Debugger.taskID,
    };
  }

  static async getNodeDirectory() {
    if (Debugger.nodeDir) {
      return Debugger.nodeDir;
    }
    const homeDirectory = os.homedir();
    let nodeDirectory;

    switch (os.platform()) {
      case 'linux':
        nodeDirectory = path.join(
          homeDirectory,
          '.config',
          'KOII-Desktop-Node',
        );
        break;
      case 'darwin':
        nodeDirectory = path.join(
          homeDirectory,
          'Library',
          'Application Support',
          'KOII-Desktop-Node',
        );
        break;
      case 'win32':
        // For Windows, construct the path explicitly as specified
        nodeDirectory = path.join(
          homeDirectory,
          'AppData',
          'Roaming',
          'KOII-Desktop-Node',
        );
        break;
      default:
        nodeDirectory = path.join(
          homeDirectory,
          'AppData',
          'Roaming',
          'KOII-Desktop-Node',
        );
    }

    return nodeDirectory;
  }

  static async gettask_audit_program() {
    try {
      const connection = new Connection('https://testnet.koii.network');
      const taskId = Debugger.taskID;
      const accountInfo = await connection.getAccountInfo(new PublicKey(taskId));
      
      if (!accountInfo) {
        console.log(`${taskId} doesn't contain any distribution list data`);
        return null;
      }
      
      let dataString = accountInfo.data.toString('utf8');
      console.log('Raw data:', dataString);
  
      // Remove any non-JSON characters from the beginning of the string
      dataString = dataString.replace(/^[^{]*/, '');
  
      // Remove any non-JSON characters from the end of the string
      dataString = dataString.replace(/[^}]*$/, '');
  
      console.log('Cleaned data:', dataString);
  
      try {
        const data = JSON.parse(dataString);
        console.log('Parsed data:', data);
        if (data && data.task_audit_program) {
          console.log('task_audit_program:', data.task_audit_program);
          return data.task_audit_program;
        } else {
          console.log('task_audit_program not found in parsed data');
          return null;
        }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        // If JSON parsing fails, try to extract the task_audit_program directly
        const match = dataString.match(/"task_audit_program"\s*:\s*"([^"]+)"/);
        if (match && match[1]) {
          console.log('Extracted task_audit_program:', match[1]);
          return match[1];
        }
        console.log('Failed to extract task_audit_program');
        return null;
      }
    } catch (error) {
      console.error('Error fetching task audit program:', error);
      return null;
    }
  }
}

module.exports = Debugger;
