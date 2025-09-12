import { get, post } from "@/core/services/httpBaseService";
import type { PaginatedResponse } from "@/core/types/pagination.type";
import type { DirectoryType } from "../types/template-library.type";
import { API_CONFIG } from "@/core/constants/api-config";

export const getAllDirectories: () => Promise<PaginatedResponse<DirectoryType>> = () => {
    return get<PaginatedResponse<DirectoryType>>(API_CONFIG.templateLibrary.getAllDirectories);
}