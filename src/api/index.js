/*
 * @Description: 
 * @Date: 2021-07-30 15:52:41
 * @page: 
 */
/* eslint-disable */
import request from "./axios"
import url from "./url"

const OrgList = {
// 根据pid获取筛选地区
    getOrgListByPid: (pid) => {
        return request.get(url.getOrgListByPid + `${pid}`)
    }
}

export default OrgList

