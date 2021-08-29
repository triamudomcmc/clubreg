import {establishAPIContext} from "@lib/api/registry";
import {deleteFileContext, fetchChecksContext, fetchFilesContext, getFileContext, sendDataContext, uploadFileContext} from "@handlers/init/attendance";
import {deleteFileBlock} from "@actionBlocks/attendance/files/delete";
import {conditionBlocks} from "@lib/blocks/conditionBlocks";
import {fetchFilesBlock} from "@actionBlocks/attendance/files/fetch";
import {getFileBlock} from "@actionBlocks/attendance/files/get";
import {uploadFileBlock} from "@actionBlocks/attendance/files/upload";
import {sendDataBlock} from "@actionBlocks/attendance/sendData";
import {fetchChecksBlock} from "@actionBlocks/attendance/fetchChecks";

const apiContext = establishAPIContext("POST", [
  deleteFileContext.init(deleteFileBlock, conditionBlocks.checkPanel),
  fetchFilesContext.init(fetchFilesBlock, conditionBlocks.checkPanel),
  getFileContext.init(getFileBlock, conditionBlocks.checkPanel),
  uploadFileContext.init(uploadFileBlock, conditionBlocks.checkPanel),
  sendDataContext.init(sendDataBlock, conditionBlocks.checkPanel),
  fetchChecksContext.init(fetchChecksBlock, conditionBlocks.checkPanel)
])

export default apiContext