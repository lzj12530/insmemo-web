import { TAG_REG, DATE_REG } from './consts'
import XLSX from 'xlsx';

const CODE_BLOCK_REG = /```([\s\S]*?)```/g;
const CONTENT_REG = /(?<=---\n)([\s\S]*)/g

export const exportFile = (data: Array<any>, filename = '') => {
    if (filename === '') {
        filename = `${new Date().getTime()}_sheetjs.xlsx`
    }
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb,filename)
};
export function parseDaily(content: string) {
    const result = {
        product: '',
        requirements: '',
        type: '',
        date: '',
        content: ''
    }
    let tags = []
    let date = ''
    // 解析标签
    let lastreg = new RegExp(TAG_REG).exec(content)
    if (lastreg && lastreg.length > 0) {
        tags = lastreg[1].split('/')
        result.product = tags[tags.length - 3]
        result.requirements = tags[tags.length - 2]
        result.type = tags[tags.length - 1]
    }
    // 解析日期
    let datematch = new RegExp(DATE_REG).exec(content)
    if (datematch && datematch.length > 0) {
        result.date = datematch[0]
    }
    // 解析内容
    let contentmatch = new RegExp(CONTENT_REG).exec(content)
    if (contentmatch && contentmatch.length > 0) {
        result.content = contentmatch[0]
    }
    return result
}