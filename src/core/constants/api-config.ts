const baseURL = "http://192.168.16.9:9090/api"

export const API_CONFIG = {
    templateLibrary : {
        getAllDirectories : `${baseURL}/tag-library/all`,
        getTemplateByTagId : `${baseURL}/tag-library/templates/{tagId}`,
        getReportByReportType: `${baseURL}/tag-library/templates/{tagId}`,
    }
}