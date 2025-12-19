import * as crypto from "crypto";
import { BaseResponse } from "../schemas/baseResponse";

export function createEmptyResponse<T>(): BaseResponse<T> {
  return {
    request_id: crypto.randomBytes(16).toString("hex"),
    as_of: new Date().toISOString(),
    data: null,
    evidence: [],
    warnings: [],
    errors: []
  };
}
